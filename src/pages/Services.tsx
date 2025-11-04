import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, RefreshCw, Wifi, Briefcase, GraduationCap, Zap, Shield, HeadphonesIcon } from "lucide-react";

const services = [
  {
    icon: Smartphone,
    title: "Mobile Data Bundles",
    description: "Affordable data packages for all networks with instant activation and competitive prices.",
    features: ["Daily bundles", "Weekly bundles", "Monthly bundles", "Custom packages"],
  },
  {
    icon: RefreshCw,
    title: "Airtime Top-Up",
    description: "Quick and easy airtime recharge for all mobile networks in Kenya.",
    features: ["Instant delivery", "All networks", "Bulk purchases", "Auto top-up"],
  },
  {
    icon: Wifi,
    title: "Internet Services",
    description: "High-speed internet packages for home and office with reliable connectivity.",
    features: ["Fiber optic", "Wireless internet", "Business plans", "24/7 support"],
  },
  {
    icon: Briefcase,
    title: "Business Solutions",
    description: "Tailored telecommunications solutions for businesses of all sizes.",
    features: ["Corporate packages", "Bulk discounts", "Dedicated support", "Custom solutions"],
  },
  {
    icon: GraduationCap,
    title: "Educational Packages",
    description: "Special data bundles for students and educational institutions.",
    features: ["Student discounts", "Learning platforms", "E-library access", "Affordable rates"],
  },
  {
    icon: Zap,
    title: "Pay-As-You-Go",
    description: "Flexible payment options with no contracts or commitments required.",
    features: ["No contracts", "Flexible plans", "Easy payments", "Quick activation"],
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "Safe and secure payment processing with multiple payment methods.",
    features: ["M-PESA", "Card payments", "Bank transfer", "Encrypted"],
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Customer Support",
    description: "Round-the-clock customer service to assist with any queries or issues.",
    features: ["Live chat", "Phone support", "Email support", "Social media"],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Services</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Comprehensive telecommunications solutions designed to keep you connected
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Card className="max-w-3xl mx-auto bg-muted/30">
              <CardHeader>
                <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
                <CardDescription className="text-base">
                  Choose a service and experience seamless connectivity today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg">Browse Bundles</Button>
                  <Button size="lg" variant="outline">Contact Us</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
