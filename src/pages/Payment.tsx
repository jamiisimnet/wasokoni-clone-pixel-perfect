import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { CreditCard, Smartphone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bundle = location.state?.bundle;
  
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "card">("mpesa");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserId(session?.user?.id || null);
    };
    getUser();
  }, []);

  if (!bundle) {
    navigate("/bundles");
    return null;
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Processing Payment",
      description: `Your payment of KSh ${bundle.price} is being processed...`,
    });
    
    // Simulate payment processing
    setTimeout(async () => {
      toast({
        title: "Payment Successful!",
        description: `${bundle.data} bundle activated successfully.`,
      });

      // Track conversion if user was referred
      if (userId) {
        const { data: referralData } = await supabase
          .from('referrals')
          .select('id, partner_id')
          .eq('customer_id', userId)
          .eq('status', 'lead')
          .single();

        if (referralData) {
          // Update referral status to converted
          await supabase
            .from('referrals')
            .update({ 
              status: 'converted',
              converted_at: new Date().toISOString()
            })
            .eq('id', referralData.id);

          // Update partner pending amount
          const { data: partnerData } = await supabase
            .from('partners')
            .select('pending_amount')
            .eq('id', referralData.partner_id)
            .single();

          if (partnerData) {
            await supabase
              .from('partners')
              .update({ 
                pending_amount: Number(partnerData.pending_amount) + 1 
              })
              .eq('id', referralData.partner_id);
          }
        }
      }

      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 text-center">
            Complete Your Purchase
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold text-foreground">{bundle.data}</span>
                    <span className="text-2xl font-bold text-primary">KSh {bundle.price}</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {bundle.features.map((feature: string, idx: number) => (
                      <li key={idx}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-center text-lg font-semibold pt-2">
                  <span>Total Amount</span>
                  <span className="text-primary">KSh {bundle.price}</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePayment} className="space-y-6">
                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      type="button"
                      variant={paymentMethod === "mpesa" ? "default" : "outline"}
                      className="h-20"
                      onClick={() => setPaymentMethod("mpesa")}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Smartphone className="h-6 w-6" />
                        <span>M-PESA</span>
                      </div>
                    </Button>
                    <Button
                      type="button"
                      variant={paymentMethod === "card" ? "default" : "outline"}
                      className="h-20"
                      onClick={() => setPaymentMethod("card")}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <CreditCard className="h-6 w-6" />
                        <span>Card</span>
                      </div>
                    </Button>
                  </div>

                  {paymentMethod === "mpesa" ? (
                    <div className="space-y-2">
                      <Label htmlFor="phone">M-PESA Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="07XXXXXXXX"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        pattern="[0-9]{10}"
                      />
                      <p className="text-xs text-muted-foreground">
                        You'll receive an STK push to complete the payment
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            type="text"
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            type="text"
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <Button type="submit" className="w-full" size="lg">
                    Pay KSh {bundle.price}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;
