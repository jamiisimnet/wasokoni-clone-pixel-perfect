import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PartnerPayout {
  id: string;
  referral_code: string;
  pending_amount: number;
  total_earnings: number;
  user_id: string;
}

const AdminProcessPayouts = () => {
  const [partners, setPartners] = useState<PartnerPayout[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdminAndLoadData();
  }, []);

  const checkAdminAndLoadData = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .single();

      if (!roles) {
        navigate("/");
        return;
      }

      await loadPendingPayouts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const loadPendingPayouts = async () => {
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('id, referral_code, pending_amount, total_earnings, user_id')
        .gt('pending_amount', 0)
        .order('pending_amount', { ascending: false });

      if (error) throw error;
      setPartners(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const processAllPayouts = async () => {
    if (partners.length === 0) {
      toast({
        title: "No Payouts",
        description: "No pending payouts to process",
      });
      return;
    }

    setProcessing(true);
    try {
      const today = new Date();
      const weekEnding = today.toISOString().split('T')[0];

      // Create payout records for each partner
      const payoutPromises = partners.map(async (partner) => {
        // Insert payout record
        await supabase.from('payouts').insert({
          partner_id: partner.id,
          amount: partner.pending_amount,
          week_ending: weekEnding,
          status: 'paid',
          paid_at: new Date().toISOString()
        });

        // Update partner: move pending to earnings and reset pending
        await supabase
          .from('partners')
          .update({
            total_earnings: Number(partner.total_earnings) + Number(partner.pending_amount),
            pending_amount: 0
          })
          .eq('id', partner.id);
      });

      await Promise.all(payoutPromises);

      toast({
        title: "Success",
        description: `Processed ${partners.length} payout(s) successfully`,
      });

      await loadPendingPayouts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const processSinglePayout = async (partner: PartnerPayout) => {
    setProcessing(true);
    try {
      const today = new Date();
      const weekEnding = today.toISOString().split('T')[0];

      await supabase.from('payouts').insert({
        partner_id: partner.id,
        amount: partner.pending_amount,
        week_ending: weekEnding,
        status: 'paid',
        paid_at: new Date().toISOString()
      });

      await supabase
        .from('partners')
        .update({
          total_earnings: Number(partner.total_earnings) + Number(partner.pending_amount),
          pending_amount: 0
        })
        .eq('id', partner.id);

      toast({
        title: "Success",
        description: `Payout processed for partner ${partner.referral_code}`,
      });

      await loadPendingPayouts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate("/admin/dashboard")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Process Payouts</h1>
                <p className="text-muted-foreground">Weekly payout processing</p>
              </div>
            </div>
            {partners.length > 0 && (
              <Button onClick={processAllPayouts} disabled={processing}>
                {processing ? "Processing..." : `Process All (${partners.length})`}
              </Button>
            )}
          </div>

          {loading ? (
            <p className="text-center py-8">Loading...</p>
          ) : partners.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No pending payouts to process</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {partners.map((partner) => (
                <Card key={partner.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          Partner {partner.referral_code}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Total Earnings: KES {partner.total_earnings}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-lg">
                        KES {partner.pending_amount}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => processSinglePayout(partner)}
                      disabled={processing}
                      className="w-full sm:w-auto"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      {processing ? "Processing..." : "Process Payout"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminProcessPayouts;
