
"use client";
import { X, Instagram, Facebook, Send } from 'lucide-react';

interface SocialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

 const SocialModal = ({ isOpen, onClose }: SocialModalProps) => {
  if (!isOpen) return null;

  const socialLinks = [
    { icon: <Instagram size={20} />, label: 'Follow us on Instagram', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { icon: <Facebook size={20} />, label: 'Follow us on Facebook', color: 'bg-blue-600' },
    { icon: <Send size={20} />, label: 'Follow us on Telegram', color: 'bg-sky-500' },
  ];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row">
  
          <div className="flex-1 p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Connect with Us Across Social Networks!</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors md:hidden"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Don't miss out on the latest news, offers, and insights! Join our social networks today to stay informed and connected with us. Get exclusive updates directly in your feed and be the first to know about exciting developments in our company.
            </p>

            <div className="space-y-3">
              {socialLinks.map((link, index) => (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary/50 hover:bg-secondary border border-border transition-colors text-foreground"
                >
                  <div className={`p-2 rounded-lg ${link.color} text-white`}>
                    {link.icon}
                  </div>
                  <span className="text-sm font-medium">{link.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center p-8 bg-gradient-to-br from-secondary/50 to-background relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="w-48 h-80 bg-foreground rounded-3xl p-2 shadow-2xl">
              <div className="w-full h-full bg-background rounded-2xl flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-white">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default SocialModal;