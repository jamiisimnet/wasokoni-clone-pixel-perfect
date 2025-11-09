import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

interface Partner {
  id: string;
  referral_code: string;
  pending_amount: number;
  total_earnings: number;
  created_at: string;
  leads: number;
  conversions: number;
}

const AdminPartners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
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

      await loadPartners();
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

  const loadPartners = async () => {
    try {
      const { data: partnersData, error } = await supabase
        .from('partners')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get referral stats for each partner
      const partnersWithStats = await Promise.all(
        (partnersData || []).map(async (partner) => {
          const { data: referrals } = await supabase
            .from('referrals')
            .select('status')
            .eq('partner_id', partner.id);

          return {
            ...partner,
            leads: referrals?.length || 0,
            conversions: referrals?.filter(r => r.status === 'converted').length || 0
          };
        })
      );

      setPartners(partnersWithStats);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/admin/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold">All Partners</h1>
              <p className="text-muted-foreground">View and manage all partners</p>
            </div>
          </div>

          {loading ? (
            <p className="text-center py-8">Loading...</p>
          ) : partners.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No partners yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {partners.map((partner) => (
                <Card key={partner.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Partner {partner.referral_code}</span>
                      <span className="text-sm text-muted-foreground font-normal">
                        Joined {formatDate(partner.created_at)}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Earnings</p>
                        <p className="text-xl font-bold">KES {partner.total_earnings}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Pending</p>
                        <p className="text-xl font-bold">KES {partner.pending_amount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Leads</p>
                        <p className="text-xl font-bold">{partner.leads}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Conversions</p>
                        <p className="text-xl font-bold">{partner.conversions}</p>
                      </div>
                    </div>
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

export default AdminPartners;
