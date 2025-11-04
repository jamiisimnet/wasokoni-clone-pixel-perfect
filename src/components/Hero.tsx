import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  const handleBuyOffer = (offer: { price: string; data: string; validity: string }) => {
    const bundle = {
      data: offer.data,
      price: parseInt(offer.price),
      features: [`Validity: ${offer.validity}`, "High Speed Data", "Instant Activation"],
      popular: false,
    };
    navigate("/payment", { state: { bundle } });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <Badge variant="secondary" className="w-fit">
              Since 2024
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Affordable Digital Services{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                For Everyone
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Stay connected with our reliable and affordable data bundles, packages, and digital services. 
              Perfect for personal use, business, and everything in between.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base" onClick={() => navigate("/bundles")}>
                Shop Bundles
              </Button>
              <Button size="lg" variant="outline" className="text-base">
                Become Partner
              </Button>
            </div>
          </div>

          {/* Right Content - Featured Offers */}
          <div className="relative">
            <div className="bg-card rounded-2xl border shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6 text-center">Today's Special Offers</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { price: "55", data: "1.25GB", validity: "Till Midnight" },
                  { price: "20", data: "250MB", validity: "24 Hours" },
                  { price: "110", data: "2GB", validity: "24 Hours" },
                  { price: "475", data: "300 Mins", validity: "30 Days" },
                ].map((offer, index) => (
                  <div
                    key={index}
                    className="bg-muted/50 rounded-xl p-4 hover:shadow-md transition-all hover:scale-105 cursor-pointer border"
                  >
                    <div className="inline-block bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded mb-2">
                      KSh {offer.price}
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">{offer.data}</div>
                    <div className="text-sm text-muted-foreground mb-3">{offer.validity}</div>
                    <Button size="sm" className="w-full" onClick={() => handleBuyOffer(offer)}>
                      Buy
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
