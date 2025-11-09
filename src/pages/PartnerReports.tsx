import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface WeeklyReport {
  week_ending: string;
  leads: number;
  conversions: number;
  earnings: number;
}

const PartnerReports = () => {
  const [reports, setReports] = useState<WeeklyReport[]>([]);
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
      await loadReports(session.user.id);
    };

    checkAuth();
  }, [navigate]);

  const loadReports = async (userId: string) => {
    setLoading(true);
    try {
      const { data: partnerData } = await supabase
        .from('partners')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (!partnerData) throw new Error("Partner profile not found");

      // Get all referrals
      const { data: referrals } = await supabase
        .from('referrals')
        .select('created_at, converted_at, status')
        .eq('partner_id', partnerData.id);

      // Group by week
      const weeklyData: { [key: string]: WeeklyReport } = {};
      
      referrals?.forEach(ref => {
        const date = new Date(ref.created_at);
        const weekEnd = getNextThursday(date);
        const weekKey = weekEnd.toISOString().split('T')[0];

        if (!weeklyData[weekKey]) {
          weeklyData[weekKey] = {
            week_ending: weekKey,
            leads: 0,
            conversions: 0,
            earnings: 0
          };
        }

        weeklyData[weekKey].leads++;
        if (ref.status === 'converted') {
          weeklyData[weekKey].conversions++;
          weeklyData[weekKey].earnings += 1; // KES 1 per conversion
        }
      });

      setReports(Object.values(weeklyData).sort((a, b) => 
        new Date(b.week_ending).getTime() - new Date(a.week_ending).getTime()
      ));
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

  const getNextThursday = (date: Date) => {
    const dayOfWeek = date.getDay();
    const daysUntilThursday = (4 - dayOfWeek + 7) % 7 || 7;
    const thursday = new Date(date);
    thursday.setDate(date.getDate() + daysUntilThursday);
    return thursday;
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
            <h1 className="text-3xl font-bold">Weekly Reports</h1>
          </div>

          {loading ? (
            <p>Loading reports...</p>
          ) : reports.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No reports available yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {reports.map((report, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>Week Ending: {formatDate(report.week_ending)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Leads</p>
                        <p className="text-2xl font-bold">{report.leads}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Conversions</p>
                        <p className="text-2xl font-bold">{report.conversions}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Earnings</p>
                        <p className="text-2xl font-bold">KES {report.earnings}</p>
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

export default PartnerReports;