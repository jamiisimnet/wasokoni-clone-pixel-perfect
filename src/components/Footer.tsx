import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                MS
              </div>
              <span className="text-xl font-bold">MarketPlace</span>
            </div>
            <p className="text-secondary-foreground/80 mb-4">
              Your trusted partner for affordable digital services and data bundles.
            </p>
            <div className="flex space-x-3">
              <Button size="icon" variant="ghost" className="hover:bg-primary/20">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-primary/20">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-primary/20">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-secondary-foreground/80 hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="text-secondary-foreground/80 hover:text-primary transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="/bundles" className="text-secondary-foreground/80 hover:text-primary transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/contact" className="text-secondary-foreground/80 hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="/partner/auth" className="text-secondary-foreground/80 hover:text-primary transition-colors font-semibold">
                  Become a Partner
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-secondary-foreground/80 hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-foreground/80 hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-foreground/80 hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-foreground/80 hover:text-primary transition-colors">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Stay Updated</h3>
            <div className="space-y-3 mb-4">
              <div className="flex items-start space-x-2 text-sm">
                <Mail className="h-4 w-4 mt-0.5 text-primary" />
                <span className="text-secondary-foreground/80">jamiisimnet@gmail.com</span>
              </div>
              <div className="flex items-start space-x-2 text-sm">
                <Phone className="h-4 w-4 mt-0.5 text-primary" />
                <span className="text-secondary-foreground/80">+254 700 273 841</span>
              </div>
              <div className="flex items-start space-x-2 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span className="text-secondary-foreground/80">Karatina, Kenya</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Your email"
                className="bg-secondary-foreground/10 border-secondary-foreground/20"
              />
              <Button variant="default">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8 text-center text-sm text-secondary-foreground/60">
          <p>&copy; 2024 JamiiMarket. All rights reserved. Built By JamiiServices.</p>
        </div>
      </div>
    </footer>
  );
};
