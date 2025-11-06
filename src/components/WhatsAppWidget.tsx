import { MessageCircle, X, Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface WhatsAppWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  text: string;
  fromUser: boolean;
  time: string;
  quickReplies?: string[];
}

type ConversationStep = 'greeting' | 'service-selection' | 'phone-number' | 'package-selection' | 'payment-number' | 'complete';

const WHATSAPP_NUMBER = "254700273841";

const SERVICES = [
  "📱 Data Bundles",
  "📞 Call Packages", 
  "💬 SMS Packages",
  "🎁 Special Offers"
];

const DATA_PACKAGES = [
  "1GB - KSh 50",
  "5GB - KSh 200",
  "10GB - KSh 350",
  "20GB - KSh 600"
];

export const WhatsAppWidget = ({ isOpen, onClose }: WhatsAppWidgetProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi there! 👋\n\nHow can we help you today?",
      fromUser: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickReplies: ["Check Bundles", "Talk to Support", "Report Issue"]
    }
  ]);
  const [conversationStep, setConversationStep] = useState<ConversationStep>('greeting');
  const [customerData, setCustomerData] = useState({
    phoneNumber: '',
    selectedService: '',
    selectedPackage: '',
    paymentNumber: ''
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (text: string, fromUser: boolean, quickReplies?: string[]) => {
    const newMessage: Message = {
      text,
      fromUser,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickReplies
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleQuickReply = (reply: string) => {
    addMessage(reply, true);
    handleResponse(reply);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    addMessage(message, true);
    handleResponse(message);
    setMessage("");
  };

  const handleResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();

    setTimeout(() => {
      switch (conversationStep) {
        case 'greeting':
          if (lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('hello') || 
              lowerMessage.includes('check bundles') || lowerMessage.includes('talk to support') || lowerMessage.includes('report issue')) {
            
            if (lowerMessage.includes('check bundles')) {
              addMessage(
                "Great! 🎉 Let me help you find the perfect bundle.\n\nFirst, may I have your phone number? (Format: 07XXXXXXXX or 2547XXXXXXXX)",
                false
              );
              setConversationStep('phone-number');
            } else if (lowerMessage.includes('talk to support')) {
              addMessage(
                "I'll connect you with our support team right away! 👨‍💼\n\nPlease provide your phone number so we can assist you better:",
                false
              );
              setConversationStep('phone-number');
            } else if (lowerMessage.includes('report issue')) {
              addMessage(
                "I'm sorry to hear you're having issues. 😔\n\nPlease share your phone number and we'll help resolve it:",
                false
              );
              setConversationStep('phone-number');
            } else {
              addMessage(
                "Welcome to JamiiMarket! 🌟\n\nWe offer:\n• Affordable data bundles\n• Call packages\n• SMS packages\n• Special offers\n\nWhat service are you interested in today?",
                false,
                SERVICES
              );
              setConversationStep('service-selection');
            }
          } else {
            addMessage(
              "Hello! 👋 How can I assist you today?",
              false,
              ["Check Bundles", "Talk to Support", "Report Issue"]
            );
          }
          break;

        case 'service-selection':
          setCustomerData(prev => ({ ...prev, selectedService: userMessage }));
          addMessage(
            "Perfect choice! 👍\n\nTo proceed, please provide your phone number:\n(Format: 07XXXXXXXX or 2547XXXXXXXX)",
            false
          );
          setConversationStep('phone-number');
          break;

        case 'phone-number':
          const phoneRegex = /^(07\d{8}|2547\d{8})$/;
          if (phoneRegex.test(userMessage.replace(/\s/g, ''))) {
            setCustomerData(prev => ({ ...prev, phoneNumber: userMessage }));
            
            if (customerData.selectedService.includes('Data')) {
              addMessage(
                "Great! 📱 Here are our available data packages:\n\nPlease select one:",
                false,
                DATA_PACKAGES
              );
            } else {
              addMessage(
                "Thank you! 📦\n\nWhat package would you like to purchase?",
                false,
                ["Basic Package", "Standard Package", "Premium Package"]
              );
            }
            setConversationStep('package-selection');
          } else {
            addMessage(
              "Please provide a valid phone number in the format: 07XXXXXXXX or 2547XXXXXXXX",
              false
            );
          }
          break;

        case 'package-selection':
          setCustomerData(prev => ({ ...prev, selectedPackage: userMessage }));
          addMessage(
            "Excellent choice! 💳\n\nWhich M-PESA number will you use for payment?\n(Format: 07XXXXXXXX or 2547XXXXXXXX)",
            false
          );
          setConversationStep('payment-number');
          break;

        case 'payment-number':
          const paymentRegex = /^(07\d{8}|2547\d{8})$/;
          if (paymentRegex.test(userMessage.replace(/\s/g, ''))) {
            setCustomerData(prev => ({ ...prev, paymentNumber: userMessage }));
            
            const summary = `Perfect! ✅ Here's your order summary:\n\n📱 Phone: ${customerData.phoneNumber}\n📦 Package: ${customerData.selectedPackage}\n💳 Payment: ${userMessage}\n\nI'll now connect you to complete the payment on WhatsApp...`;
            
            addMessage(summary, false);
            
            // Open WhatsApp with order details
            setTimeout(() => {
              const whatsappMessage = `Hi! I'd like to purchase:\n\nPhone: ${customerData.phoneNumber}\nPackage: ${customerData.selectedPackage}\nPayment Number: ${userMessage}`;
              const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
              window.open(url, "_blank");
              
              addMessage(
                "Thank you for choosing JamiiMarket! 🎉\n\nNeed anything else?",
                false,
                ["Yes, New Order", "No, I'm Done"]
              );
              setConversationStep('complete');
            }, 2000);
          } else {
            addMessage(
              "Please provide a valid M-PESA number in the format: 07XXXXXXXX or 2547XXXXXXXX",
              false
            );
          }
          break;

        case 'complete':
          if (lowerMessage.includes('yes') || lowerMessage.includes('new order')) {
            // Reset conversation
            setCustomerData({
              phoneNumber: '',
              selectedService: '',
              selectedPackage: '',
              paymentNumber: ''
            });
            addMessage(
              "Great! Let's start fresh. 🌟\n\nWhat service are you interested in?",
              false,
              SERVICES
            );
            setConversationStep('service-selection');
          } else {
            addMessage(
              "Thank you for using JamiiMarket! Have a great day! 😊",
              false
            );
          }
          break;
      }
    }, 500);
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
            <div key={index}>
              <div
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
              
              {/* Quick Reply Buttons */}
              {!msg.fromUser && msg.quickReplies && index === messages.length - 1 && (
                <div className="flex flex-wrap gap-2 mt-2 justify-start">
                  {msg.quickReplies.map((reply, idx) => (
                    <Button
                      key={idx}
                      onClick={() => handleQuickReply(reply)}
                      size="sm"
                      variant="outline"
                      className="bg-white hover:bg-gray-50 text-gray-800 border-gray-300 text-xs"
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
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
