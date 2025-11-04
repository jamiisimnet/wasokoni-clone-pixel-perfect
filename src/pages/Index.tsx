import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { PopularBundles } from "@/components/PopularBundles";
import { AppDownload } from "@/components/AppDownload";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <PopularBundles />
        <AppDownload />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
