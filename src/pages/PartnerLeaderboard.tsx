import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Award, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LeaderboardEntry {
  id: string;
  referral_code: string;
  total_earnings: number;
  user_id: string;
  conversions: number;
}

const PartnerLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      // Get all partners with their earnings
      const { data: partners, error: partnersError } = await supabase
        .from('partners')
        .select('id, referral_code, total_earnings, user_id')
        .order('total_earnings', { ascending: false })
        .limit(10);

      if (partnersError) throw partnersError;

      // Get conversion counts for each partner
      const leaderboardData = await Promise.all(
        (partners || []).map(async (partner) => {
          const { data: referrals } = await supabase
            .from('referrals')
            .select('status')
            .eq('partner_id', partner.id)
            .eq('status', 'converted');

          return {
            ...partner,
            conversions: referrals?.length || 0
          };
        })
      );

      setLeaderboard(leaderboardData);
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

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 1:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 2:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>;
    }
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
            <div>
              <h1 className="text-3xl font-bold mb-2">Partner Leaderboard</h1>
              <p className="text-muted-foreground">
                Top performing partners by total earnings
              </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top 10 Partners</CardTitle>
              <CardDescription>Rankings based on total earnings</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center py-8 text-muted-foreground">Loading leaderboard...</p>
              ) : leaderboard.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">No partners yet</p>
              ) : (
                <div className="space-y-3">
                  {leaderboard.map((entry, index) => (
                    <div
                      key={entry.id}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        index < 3 ? 'bg-muted/50' : 'bg-background'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10">
                          {getRankIcon(index)}
                        </div>
                        <div>
                          <p className="font-semibold">Partner {entry.referral_code}</p>
                          <p className="text-sm text-muted-foreground">
                            {entry.conversions} conversion{entry.conversions !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          KES {entry.total_earnings}
                        </p>
                        <p className="text-xs text-muted-foreground">Total Earnings</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PartnerLeaderboard;
