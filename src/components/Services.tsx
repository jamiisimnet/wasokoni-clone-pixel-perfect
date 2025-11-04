import { Smartphone, RefreshCw, Wifi, Briefcase, GraduationCap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Smartphone,
    title: "Data Bundles",
    description: "Browse our exclusive bundle offers",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: RefreshCw,
    title: "Convert Airtime",
    description: "Swap airtime to cash instantly",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Wifi,
    title: "5G/4G Pocket WiFi",
    description: "Bundles & Smart Connect",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Briefcase,
    title: "Corporate Bundles",
    description: "Business solutions and packages",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: GraduationCap,
    title: "Education Resources",
    description: "Learning materials and guides",
    color: "from-amber-500 to-yellow-500",
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Services</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50"
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{service.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
