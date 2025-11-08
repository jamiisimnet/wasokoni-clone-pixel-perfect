import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Referral {
  id: string;
  status: string;
  created_at: string;
  converted_at: string | null;
  customer: {
    email: string;
    full_name: string;
  };
}

const PartnerLeads = () => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
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
      await loadReferrals(session.user.id);
    };

    checkAuth();
  }, [navigate]);

  const loadReferrals = async (userId: string) => {
    setLoading(true);
    try {
      const { data: partnerData } = await supabase
        .from('partners')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (!partnerData) throw new Error("Partner profile not found");

      const { data, error } = await supabase
        .from('referrals')
        .select(`
          id,
          status,
          created_at,
          converted_at,
          customer:profiles!referrals_customer_id_fkey(email, full_name)
        `)
        .eq('partner_id', partnerData.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReferrals(data as any);
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
          <h1 className="text-3xl font-bold mb-8">My Leads</h1>

          {loading ? (
            <p>Loading leads...</p>
          ) : referrals.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No leads yet. Share your referral link to start earning!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {referrals.map((referral) => (
                <Card key={referral.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {referral.customer?.full_name || 'Unknown'}
                      </CardTitle>
                      <Badge variant={referral.status === 'converted' ? 'default' : 'secondary'}>
                        {referral.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-muted-foreground">Email:</span>{' '}
                        {referral.customer?.email || 'N/A'}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Registered:</span>{' '}
                        {formatDate(referral.created_at)}
                      </p>
                      {referral.converted_at && (
                        <p>
                          <span className="text-muted-foreground">Converted:</span>{' '}
                          {formatDate(referral.converted_at)}
                        </p>
                      )}
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

export default PartnerLeads;