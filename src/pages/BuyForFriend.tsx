import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const categories = [
  {
    id: "data",
    name: "Data Bundles",
    packages: [
      { data: "1.2GB", price: 55, validity: "Till Midnight", features: ["Valid Till Midnight", "High Speed"] },
      { data: "1GB", price: 19, validity: "1 Hour", features: ["1 Hour Validity", "Ultra Fast"] },
      { data: "6GB", price: 700, validity: "7 Days", features: ["7 Days Validity", "High Volume"] },
    ],
  },
  {
    id: "sms",
    name: "SMS Packages",
    packages: [
      { data: "200 SMS", price: 10, validity: "24 Hours", features: ["24 Hours Validity", "Quick Messaging"] },
      { data: "1000 SMS", price: 30, validity: "1 Week", features: ["1 Week Validity", "High Volume"] },
    ],
  },
  {
    id: "minutes",
    name: "Minutes Offers",
    packages: [
      { data: "50 Minutes", price: 52, validity: "Till Midnight", features: ["Valid Till Midnight", "Evening Calls"] },
      { data: "100 Minutes", price: 95, validity: "2 Days", features: ["2 Days Validity", "Extended Calling"] },
    ],
  },
];

const BuyForFriend = () => {
  const navigate = useNavigate();
  const [friendNumber, setFriendNumber] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("data");
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [paymentNumber, setPaymentNumber] = useState("");

  const handlePurchase = () => {
    if (!friendNumber || !selectedPackage || !paymentNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    navigate("/payment", {
      state: {
        bundle: selectedPackage,
        recipientNumber: friendNumber,
        paymentNumber: paymentNumber,
      },
    });
  };

  const currentCategory = categories.find((cat) => cat.id === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Buy for a Friend</h1>
            <p className="text-muted-foreground text-lg">Send packages to your friends and family</p>
          </div>

          <div className="space-y-8">
            {/* Step 1: Friend's Number */}
            <Card>
              <CardHeader>
                <CardTitle>Step 1: Friend's Number</CardTitle>
                <CardDescription>Enter the phone number of the recipient</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="friend-number">Phone Number</Label>
                  <Input
                    id="friend-number"
                    type="tel"
                    placeholder="0712345678"
                    value={friendNumber}
                    onChange={(e) => setFriendNumber(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Select Category & Package */}
            <Card>
              <CardHeader>
                <CardTitle>Step 2: Choose Package</CardTitle>
                <CardDescription>Select a category and pick a package</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="data">Data</TabsTrigger>
                    <TabsTrigger value="sms">SMS</TabsTrigger>
                    <TabsTrigger value="minutes">Minutes</TabsTrigger>
                  </TabsList>

                  {categories.map((category) => (
                    <TabsContent key={category.id} value={category.id} className="mt-6">
                      <div className="grid gap-4">
                        {category.packages.map((pkg, index) => (
                          <Card
                            key={index}
                            className={`cursor-pointer transition-all ${
                              selectedPackage === pkg ? "border-primary shadow-lg" : "hover:shadow-md"
                            }`}
                            onClick={() => setSelectedPackage(pkg)}
                          >
                            <CardContent className="pt-6">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-semibold text-xl">{pkg.data}</h3>
                                  <p className="text-sm text-muted-foreground">{pkg.validity}</p>
                                  <ul className="mt-2 space-y-1">
                                    {pkg.features.map((feature, idx) => (
                                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                                        <Check className="h-4 w-4 text-primary mr-2" />
                                        {feature}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="text-right">
                                  <p className="text-2xl font-bold text-primary">KSh {pkg.price}</p>
                                  {selectedPackage === pkg && (
                                    <Badge className="mt-2">Selected</Badge>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            {/* Step 3: Payment Number */}
            <Card>
              <CardHeader>
                <CardTitle>Step 3: Payment Number</CardTitle>
                <CardDescription>Enter the M-PESA number for payment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="payment-number">M-PESA Number</Label>
                  <Input
                    id="payment-number"
                    type="tel"
                    placeholder="0712345678"
                    value={paymentNumber}
                    onChange={(e) => setPaymentNumber(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handlePurchase}
                  disabled={!friendNumber || !selectedPackage || !paymentNumber}
                >
                  Proceed to Payment
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BuyForFriend;
