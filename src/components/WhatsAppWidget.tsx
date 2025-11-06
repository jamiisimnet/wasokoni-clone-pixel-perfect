import { MessageCircle, X, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface WhatsAppWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const WHATSAPP_NUMBER = "254700273841";

export const WhatsAppWidget = ({ isOpen, onClose }: WhatsAppWidgetProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; fromUser: boolean; time: string }[]>([
    {
      text: "Hi there! 👋\n\nHow can we help you today?",
      fromUser: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage = {
      text: message,
      fromUser: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    
    // Open actual WhatsApp with the message
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    
    setMessage("");

    // Auto-response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "Thanks for your message! We're redirecting you to WhatsApp to continue the conversation.",
        fromUser: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 w-[350px] sm:w-[400px]">
      <Card className="overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-[#25D366] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-white text-[#25D366]">JM</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-white">JamiiMarket</h3>
              <p className="text-xs text-white/90">Online</p>
            </div>
          </div>
          <Button
            onClick={onClose}
            size="icon"
            variant="ghost"
            className="text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Chat Messages */}
        <div className="h-[400px] bg-[#ECE5DD] p-4 overflow-y-auto space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.fromUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.fromUser
                    ? 'bg-[#DCF8C6] text-gray-800'
                    : 'bg-white text-gray-800'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                <p className="text-xs text-gray-500 mt-1 text-right">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white p-3 flex gap-2 border-t">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="bg-[#25D366] hover:bg-[#20BA5A] text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
