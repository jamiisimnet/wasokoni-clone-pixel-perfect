import { Button } from "@/components/ui/button";
import { Smartphone, Download } from "lucide-react";

export const AppDownload = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 text-secondary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6">
            <Smartphone className="h-10 w-10 text-primary-foreground" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get the MarketPlace App</h2>
          <p className="text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
            Download now for exclusive offers, instant bundles, and seamless shopping experience on the go!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="default" className="bg-primary hover:bg-primary/90">
              <Download className="mr-2 h-5 w-5" />
              Download App
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
