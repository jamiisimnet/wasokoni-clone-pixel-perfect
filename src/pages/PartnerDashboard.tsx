import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";
import { DollarSign, Users, Clock, TrendingUp, Trophy } from "lucide-react";

interface PartnerData {
  id: string;
  referral_code: string;
  total_earnings: number;
  pending_amount: number;
}

interface ReferralStats {
  total_leads: number;
  converted_leads: number;
}

const PartnerDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [partner, setPartner] = useState<PartnerData | null>(null);
  const [stats, setStats] = useState<ReferralStats>({ total_leads: 0, converted_leads: 0 });
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
      setUser(session.user);
      await loadPartnerData(session.user.id);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/partner/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadPartnerData = async (userId: string) => {
    setLoading(true);
    try {
      // Get partner data
      const { data: partnerData, error: partnerError } = await supabase
        .from('partners')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (partnerError) throw partnerError;
      setPartner(partnerData);

      // Get referral stats
      const { data: referrals, error: referralsError } = await supabase
        .from('referrals')
        .select('status')
        .eq('partner_id', partnerData.id);

      if (referralsError) throw referralsError;

      setStats({
        total_leads: referrals?.length || 0,
        converted_leads: referrals?.filter(r => r.status === 'converted').length || 0
      });

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

  const copyReferralLink = () => {
    const link = `${window.location.origin}/?ref=${partner?.referral_code}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Partner Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.user_metadata?.full_name}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">KES {partner?.total_earnings || 0}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">KES {partner?.pending_amount || 0}</div>
                <p className="text-xs text-muted-foreground">Payout every Thursday</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total_leads}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversions</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.converted_leads}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.total_leads > 0 
                    ? `${((stats.converted_leads / stats.total_leads) * 100).toFixed(1)}% rate`
                    : '0% rate'}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Your Referral Link</CardTitle>
                <CardDescription>Share this link to earn commissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input 
                    readOnly 
                    value={`${window.location.origin}/?ref=${partner?.referral_code}`}
                    className="flex-1"
                  />
                  <Button onClick={copyReferralLink}>Copy</Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Code: <span className="font-mono font-bold">{partner?.referral_code}</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => navigate("/partner/leads")}
                >
                  View Leads
                </Button>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => navigate("/partner/payouts")}
                >
                  View Payouts
                </Button>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => navigate("/partner/reports")}
                >
                  View Reports
                </Button>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => navigate("/partner/leaderboard")}
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  Leaderboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PartnerDashboard;