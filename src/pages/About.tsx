import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Award, TrendingUp } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">About MS MarketPlace</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Your Trusted Digital Services Partner
            </h1>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              Since 2024, we've been providing affordable and reliable telecommunications solutions to thousands of customers across Kenya.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">Our Mission</h2>
                <p className="text-muted-foreground">
                  To provide accessible, affordable, and reliable digital services that empower individuals and businesses to stay connected in an increasingly digital world.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-secondary/5 to-accent/5">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-secondary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">Our Vision</h2>
                <p className="text-muted-foreground">
                  To become Kenya's leading digital services marketplace, known for innovation, reliability, and exceptional customer service.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { number: "10K+", label: "Happy Customers" },
              { number: "50K+", label: "Bundles Sold" },
              { number: "24/7", label: "Customer Support" },
              { number: "99.9%", label: "Uptime" },
            ].map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Why Choose Us */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-8">Why Choose Us?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Users,
                  title: "Customer First",
                  description: "Our customers are at the heart of everything we do. We prioritize your needs and satisfaction.",
                },
                {
                  icon: Award,
                  title: "Quality Service",
                  description: "We deliver high-quality services with instant activation and reliable connectivity.",
                },
                {
                  icon: TrendingUp,
                  title: "Competitive Pricing",
                  description: "Get the best value for your money with our affordable and transparent pricing.",
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-all">
                    <CardContent className="pt-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Story Section */}
          <Card className="max-w-4xl mx-auto bg-muted/30">
            <CardContent className="pt-6">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  MS MarketPlace was founded in 2024 with a simple yet powerful vision: to make digital services accessible and affordable to everyone in Kenya. We recognized the growing need for reliable telecommunications solutions and set out to bridge the gap between service providers and consumers.
                </p>
                <p>
                  What started as a small venture has grown into a trusted platform serving thousands of customers daily. Our success is built on three pillars: reliability, affordability, and exceptional customer service.
                </p>
                <p>
                  Today, we continue to innovate and expand our services, always keeping our customers' needs at the forefront. Whether you're a student, professional, or business owner, MS MarketPlace is here to keep you connected.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
