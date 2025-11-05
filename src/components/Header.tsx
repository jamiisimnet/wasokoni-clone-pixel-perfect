import { useState } from "react";
import { Menu, X, ShoppingBag, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4 py-2 text-center text-sm font-medium">
          ✨ Special Offer: Get 10% extra on all bundles this week!
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
              MS
            </div>
            <span className="text-xl font-bold text-foreground">MarketPlace</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => navigate("/bundles")} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Data Bundles
            </button>
            <button onClick={() => navigate("/services")} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Services
            </button>
            <button onClick={() => navigate("/about")} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              About
            </button>
            <button onClick={() => navigate("/contact")} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Contact
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-9 w-[200px]"
              />
            </div>
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-9 w-full" />
            </div>
            <nav className="flex flex-col space-y-3">
              <button onClick={() => { navigate("/bundles"); setMobileMenuOpen(false); }} className="text-sm font-medium text-foreground hover:text-primary transition-colors text-left">
                Data Bundles
              </button>
              <button onClick={() => { navigate("/services"); setMobileMenuOpen(false); }} className="text-sm font-medium text-foreground hover:text-primary transition-colors text-left">
                Services
              </button>
              <button onClick={() => { navigate("/about"); setMobileMenuOpen(false); }} className="text-sm font-medium text-foreground hover:text-primary transition-colors text-left">
                About
              </button>
              <button onClick={() => { navigate("/contact"); setMobileMenuOpen(false); }} className="text-sm font-medium text-foreground hover:text-primary transition-colors text-left">
                Contact
              </button>
            </nav>
            <div className="flex items-center space-x-2 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => { navigate("/auth"); setMobileMenuOpen(false); }}>
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
              <Button className="flex-1" onClick={() => { navigate("/auth"); setMobileMenuOpen(false); }}>Get Started</Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
