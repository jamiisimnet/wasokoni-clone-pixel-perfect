import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const bundles = [
  {
    data: "1.2GB",
    price: 55,
    validity: "Till Midnight",
    features: ["Valid Till Midnight", "High Speed", "Great Value"],
    popular: true,
  },
  {
    data: "1GB",
    price: 19,
    validity: "1 Hour",
    features: ["1 Hour Validity", "Ultra Fast", "Quick Tasks"],
    popular: false,
  },
  {
    data: "6GB",
    price: 700,
    validity: "7 Days",
    features: ["7 Days Validity", "High Volume", "Best for Streaming"],
    popular: false,
  },
  {
    data: "10GB",
    price: 950,
    validity: "30 Days",
    features: ["30 Days Validity", "Long Term", "Great Value"],
    popular: false,
  },
  {
    data: "35GB",
    price: 1485,
    validity: "28 Days",
    features: ["28 Days Validity", "1.25GB Daily", "Premium Package"],
    popular: false,
  },
  {
    data: "1000 SMS",
    price: 30,
    validity: "1 Week",
    features: ["1 Week Validity", "High Volume", "Best Value"],
    popular: false,
  },
];

export const PopularBundles = () => {
  const navigate = useNavigate();

  const handleBuyNow = (bundle: typeof bundles[0]) => {
    navigate("/payment", { state: { bundle } });
  };

  const handleShare = (bundle: typeof bundles[0]) => {
    const message = `🔥 Check out this amazing package!\n\n📦 ${bundle.data} for only KSh ${bundle.price}\n⏰ ${bundle.validity}\n✅ ${bundle.features.join("\n✅ ")}\n\nGet yours now at MS MarketPlace!`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    toast({
      title: "Opening WhatsApp",
      description: "Share this package with your friends!",
    });
  };

  return (
    <section id="bundles" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Most Popular Bundles</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from our wide range of affordable data bundles designed for every need
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bundles.map((bundle, index) => (
            <Card
              key={index}
              className={`relative hover:shadow-xl transition-all duration-300 ${
                bundle.popular ? "border-primary shadow-lg scale-105" : ""
              }`}
            >
              {bundle.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center pt-8">
                <div className="text-4xl font-bold text-foreground mb-2">{bundle.data}</div>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl font-bold text-primary">KSh {bundle.price}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{bundle.validity}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {bundle.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button
                  className="w-full"
                  variant={bundle.popular ? "default" : "outline"}
                  size="lg"
                  onClick={() => handleBuyNow(bundle)}
                >
                  Buy Now
                </Button>
                <Button
                  className="w-full"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare(bundle)}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share on WhatsApp
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" onClick={() => navigate("/bundles")}>
            View All Bundles
          </Button>
        </div>
      </div>
    </section>
  );
};
