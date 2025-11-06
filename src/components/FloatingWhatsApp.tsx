import { MessageCircle, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "254700273841";
const WHATSAPP_MESSAGE = "Hi! I'd like to know more about your services.";

export const FloatingWhatsApp = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);

  useEffect(() => {
    // Auto-open WhatsApp after 10 seconds
    const timer = setTimeout(() => {
      if (!hasAutoOpened) {
        openWhatsApp();
        setHasAutoOpened(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [hasAutoOpened]);

  const openWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, "_blank");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <Button
        onClick={openWhatsApp}
        size="lg"
        className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all bg-[#25D366] hover:bg-[#20BA5A] text-white"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      <Button
        onClick={() => setIsVisible(false)}
        size="sm"
        variant="ghost"
        className="h-6 w-6 p-0 rounded-full"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export const openWhatsAppChat = (number: string = WHATSAPP_NUMBER, message: string = WHATSAPP_MESSAGE) => {
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};
