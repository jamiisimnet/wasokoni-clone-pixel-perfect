import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const bundles = [
  {
    data: "1.25GB",
    price: 50,
    features: ["High Speed Data", "Affordable Package", "Valid Till Midnight"],
    popular: false,
  },
  {
    data: "2GB",
    price: 100,
    features: ["24 Hours Validity", "Fast Speeds", "Best Value"],
    popular: true,
  },
  {
    data: "5GB",
    price: 250,
    features: ["7 Days Validity", "Premium Speed", "Most Popular"],
    popular: false,
  },
  {
    data: "10GB",
    price: 450,
    features: ["30 Days Validity", "Unlimited Speed", "Best for Heavy Users"],
    popular: false,
  },
  {
    data: "20GB",
    price: 850,
    features: ["30 Days Validity", "Ultra-Fast Speeds", "Perfect for Streaming"],
    popular: false,
  },
  {
    data: "50GB",
    price: 2000,
    features: ["60 Days Validity", "Maximum Speed", "Best for Business"],
    popular: false,
  },
];

export const PopularBundles = () => {
  const navigate = useNavigate();

  const handleBuyNow = (bundle: typeof bundles[0]) => {
    navigate("/payment", { state: { bundle } });
  };

  const handleShare = (bundle: typeof bundles[0]) => {
    const message = `🔥 Check out this amazing data bundle!\n\n📦 ${bundle.data} for only KSh ${bundle.price}\n✅ ${bundle.features.join("\n✅ ")}\n\nGet yours now at MS MarketPlace!`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    toast({
      title: "Opening WhatsApp",
      description: "Share this bundle with your friends!",
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
