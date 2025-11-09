import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Payout {
  id: string;
  amount: number;
  status: string;
  week_ending: string;
  paid_at: string | null;
  created_at: string;
}

const PartnerPayouts = () => {
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/partner/auth");
        return;
      }
      await loadPayouts(session.user.id);
    };

    checkAuth();
  }, [navigate]);

  const loadPayouts = async (userId: string) => {
    setLoading(true);
    try {
      const { data: partnerData } = await supabase
        .from('partners')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (!partnerData) throw new Error("Partner profile not found");

      const { data, error } = await supabase
        .from('payouts')
        .select('*')
        .eq('partner_id', partnerData.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPayouts(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8 flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/partner/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">Payout History</h1>
          </div>

          {loading ? (
            <p>Loading payouts...</p>
          ) : payouts.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No payouts yet. Keep referring customers to earn!</p>
                <p className="text-sm text-muted-foreground mt-2">Payouts are processed every Thursday.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {payouts.map((payout) => (
                <Card key={payout.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">KES {payout.amount}</CardTitle>
                      <Badge variant={payout.status === 'paid' ? 'default' : 'secondary'}>
                        {payout.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-muted-foreground">Week Ending:</span>{' '}
                        {formatDate(payout.week_ending)}
                      </p>
                      {payout.paid_at && (
                        <p>
                          <span className="text-muted-foreground">Paid On:</span>{' '}
                          {formatDate(payout.paid_at)}
                        </p>
                      )}
                      <p>
                        <span className="text-muted-foreground">Created:</span>{' '}
                        {formatDate(payout.created_at)}
                      </p>
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

export default PartnerPayouts;