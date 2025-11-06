import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { WhatsAppWidget } from "./WhatsAppWidget";

export const FloatingWhatsApp = () => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);

  useEffect(() => {
    // Auto-open WhatsApp widget after 10 seconds
    const timer = setTimeout(() => {
      if (!hasAutoOpened) {
        setIsWidgetOpen(true);
        setHasAutoOpened(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [hasAutoOpened]);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setIsWidgetOpen(!isWidgetOpen)}
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all bg-[#25D366] hover:bg-[#20BA5A] text-white"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
      <WhatsAppWidget isOpen={isWidgetOpen} onClose={() => setIsWidgetOpen(false)} />
    </>
  );
};

export const useWhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    WhatsAppWidget: () => <WhatsAppWidget isOpen={isOpen} onClose={() => setIsOpen(false)} />
  };
};
