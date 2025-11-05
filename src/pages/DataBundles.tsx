import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const regularDataBundles = [
  {
    data: "250MB",
    price: 20,
    validity: "24 Hours",
    features: ["24 Hours Validity", "Quick Browsing", "Affordable"],
    popular: false,
  },
  {
    data: "1.2GB",
    price: 55,
    validity: "Till Midnight",
    features: ["Valid Till Midnight", "High Speed", "Great Value"],
    popular: true,
  },
  {
    data: "1.25GB",
    price: 55,
    validity: "Till Midnight",
    features: ["Valid Till Midnight", "Fast Speeds", "Popular Choice"],
    popular: false,
  },
  {
    data: "350MB",
    price: 49,
    validity: "7 Days",
    features: ["7 Days Validity", "Extended Use", "Budget Friendly"],
    popular: false,
  },
  {
    data: "1GB",
    price: 19,
    validity: "1 Hour",
    features: ["1 Hour Validity", "Ultra Fast", "Quick Tasks"],
    popular: false,
  },
  {
    data: "1.5GB",
    price: 50,
    validity: "3 Hours",
    features: ["3 Hours Validity", "Premium Speed", "Short Term"],
    popular: false,
  },
  {
    data: "1GB",
    price: 99,
    validity: "24 Hours",
    features: ["24 Hours Validity", "Reliable", "Daily Use"],
    popular: false,
  },
  {
    data: "6GB",
    price: 700,
    validity: "7 Days",
    features: ["7 Days Validity", "High Volume", "Best for Streaming"],
    popular: false,
  },
];

const bulkDataBundles = [
  {
    data: "10GB",
    price: 950,
    validity: "30 Days",
    features: ["30 Days Validity", "Long Term", "Great Value"],
    popular: true,
  },
  {
    data: "35GB",
    price: 1485,
    validity: "28 Days",
    features: ["28 Days Validity", "1.25GB Daily", "Premium Package"],
    popular: false,
  },
  {
    data: "25GB",
    price: 1065,
    validity: "20 Days",
    features: ["20 Days Validity", "Medium Term", "Popular"],
    popular: false,
  },
  {
    data: "40GB",
    price: 1698,
    validity: "30 Days",
    features: ["30 Days Validity", "Maximum Data", "Best Deal"],
    popular: false,
  },
  {
    data: "10GB",
    price: 427,
    validity: "8 Days",
    features: ["8 Days Validity", "Short Term Bulk", "Affordable"],
    popular: false,
  },
  {
    data: "7.5GB",
    price: 322,
    validity: "6 Days",
    features: ["6 Days Validity", "Weekly Use", "Budget Bulk"],
    popular: false,
  },
  {
    data: "5GB",
    price: 215,
    validity: "4 Days",
    features: ["4 Days Validity", "Mini Bulk", "Good Value"],
    popular: false,
  },
];

const smsPackages = [
  {
    data: "200 SMS",
    price: 10,
    validity: "24 Hours",
    features: ["24 Hours Validity", "Quick Messaging", "Super Affordable"],
    popular: false,
  },
  {
    data: "100 SMS",
    price: 20,
    validity: "1 Week",
    features: ["1 Week Validity", "Extended Use", "Budget Friendly"],
    popular: false,
  },
  {
    data: "1000 SMS",
    price: 30,
    validity: "1 Week",
    features: ["1 Week Validity", "High Volume", "Best Value"],
    popular: true,
  },
  {
    data: "1500 SMS",
    price: 100,
    validity: "1 Month",
    features: ["1 Month Validity", "Maximum Volume", "Long Term"],
    popular: false,
  },
];

const minutesOffers = [
  {
    data: "50 Minutes",
    price: 52,
    validity: "Till Midnight",
    features: ["Valid Till Midnight", "Evening Calls", "Quick Connect"],
    popular: false,
  },
  {
    data: "100 Minutes",
    price: 95,
    validity: "2 Days",
    features: ["2 Days Validity", "Extended Calling", "Popular"],
    popular: true,
  },
  {
    data: "250 Minutes",
    price: 250,
    validity: "7 Days",
    features: ["7 Days Validity", "Weekly Calls", "Great Value"],
    popular: false,
  },
  {
    data: "500 Minutes",
    price: 500,
    validity: "7 Days",
    features: ["7 Days Validity", "High Volume", "Best for Business"],
    popular: false,
  },
  {
    data: "300 Minutes + 500 SMS",
    price: 500,
    validity: "30 Days",
    features: ["30 Days Validity", "Combo Package", "Complete Solution"],
    popular: false,
  },
];

const DataBundles = () => {
  const navigate = useNavigate();

  const handleBuyNow = (bundle: any) => {
    navigate("/payment", { state: { bundle } });
  };

  const handleShare = (bundle: any) => {
    const message = `🔥 Check out this amazing package!\n\n📦 ${bundle.data} for only KSh ${bundle.price}\n⏰ ${bundle.validity}\n✅ ${bundle.features.join("\n✅ ")}\n\nGet yours now at MS MarketPlace!`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    toast({
      title: "Opening WhatsApp",
      description: "Share this package with your friends!",
    });
  };

  const renderBundleCard = (bundle: any, index: number) => (
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
        <div className="text-3xl font-bold text-foreground mb-2">{bundle.data}</div>
        <div className="flex items-baseline justify-center">
          <span className="text-3xl font-bold text-primary">KSh {bundle.price}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{bundle.validity}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {bundle.features.map((feature: string, idx: number) => (
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
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">All Packages</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Browse our complete collection of packages designed for every need and budget
            </p>
          </div>

          {/* Regular Data Bundles */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">Data Bundles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularDataBundles.map((bundle, index) => renderBundleCard(bundle, index))}
            </div>
          </section>

          {/* Bulk Data Bundles */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">Bulk Data Packages</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bulkDataBundles.map((bundle, index) => renderBundleCard(bundle, index))}
            </div>
          </section>

          {/* SMS Packages */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">SMS Packages</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {smsPackages.map((bundle, index) => renderBundleCard(bundle, index))}
            </div>
          </section>

          {/* Minutes Offers */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">Minutes Offers</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {minutesOffers.map((bundle, index) => renderBundleCard(bundle, index))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DataBundles;
