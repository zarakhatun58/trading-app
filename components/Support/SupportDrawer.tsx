import { X, HelpCircle, BookOpen, ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../libs/utils';


interface FAQCategory {
  id: string;
  name: string;
  count: number;
  icon: React.ReactNode;
  questions: { q: string; a: string }[];
}

const faqCategories: FAQCategory[] = [
  {
    id: 'general',
    name: 'General',
    count: 11,
    icon: <HelpCircle size={18} />,
    questions: [
      { q: 'What are digital options?', a: 'Digital options are financial instruments that allow you to trade on price movements of various assets.' },
      { q: 'What is the expiration period of a trade?', a: 'The expiration period is the time after which the trade will be automatically closed.' },
      { q: 'What is the gist of digital options trading?', a: 'The essence is to predict the price movement direction of an asset.' },
      { q: 'What are the possible results of the placed trades?', a: 'You can either profit or lose the invested amount based on your prediction.' },
      { q: 'Does your trading platform have a demo account?', a: 'Yes, we provide a free demo account with virtual funds.' },
      { q: 'What determines profit size?', a: 'Profit depends on the asset, market conditions, and trade parameters.' },
      { q: 'What are the varieties of digital options?', a: 'We offer various types including high/low, turbo, and more.' },
      { q: 'What is a trading platform and why is it needed?', a: 'A trading platform is software for executing trades and analyzing markets.' },
      { q: 'How to learn quickly how to make money in the digital options market?', a: 'Start with our tutorials, use the demo account, and practice regularly.' },
      { q: 'Is the download of the program to a computer or smartphone required?', a: 'No, our platform works directly in your web browser.' },
      { q: 'At what expense does the Company pay profit to the Client?', a: 'Profits come from the trading pool and company reserves.' },
    ],
  },
  {
    id: 'account',
    name: 'Account',
    count: 4,
    icon: <HelpCircle size={18} />,
    questions: [
      { q: 'How to register on the platform?', a: 'Click the registration button and fill in your details.' },
      { q: 'How to verify my account?', a: 'Upload your ID documents in the verification section.' },
      { q: 'How to change account settings?', a: 'Go to Account settings and modify your preferences.' },
      { q: 'How to delete my account?', a: 'Contact support to request account deletion.' },
    ],
  },
  {
    id: 'verification',
    name: 'Verification',
    count: 5,
    icon: <HelpCircle size={18} />,
    questions: [
      { q: 'What is account verification?', a: 'Verification confirms your identity for security purposes.' },
      { q: 'How to understand that I need to go through account verification?', a: 'You will see a notification in your account dashboard.' },
      { q: 'How do I know that I successfully passed verification?', a: 'Your account status will change to "Verified".' },
      { q: 'Is it possible to indicate other people\'s (fake) data when registering?', a: 'No, this violates our terms and may result in account suspension.' },
      { q: 'How long does the verification process take?', a: 'Usually 1-3 business days.' },
    ],
  },
  {
    id: 'payment',
    name: 'Payment',
    count: 4,
    icon: <HelpCircle size={18} />,
    questions: [
      { q: 'How to deposit funds?', a: 'Go to the Deposit section and choose your payment method.' },
      { q: 'What payment methods are available?', a: 'We accept cards, e-wallets, and cryptocurrencies.' },
      { q: 'What is the minimum deposit?', a: 'The minimum deposit is $10.' },
      { q: 'Are there any deposit fees?', a: 'We do not charge deposit fees.' },
    ],
  },
  {
    id: 'payouts',
    name: 'Payouts',
    count: 5,
    icon: <HelpCircle size={18} />,
    questions: [
      { q: 'How to withdraw money from the account?', a: 'Go to Withdrawal section and submit a request.' },
      { q: 'What is the minimum withdrawal amount?', a: 'The minimum withdrawal is $10.' },
      { q: 'Do I need to provide any documents to make a withdrawal?', a: 'You need to complete verification first.' },
      { q: 'How long does it take to withdraw funds?', a: 'Usually 1-5 business days.' },
      { q: 'Is there any fee for depositing or withdrawing funds?', a: 'Withdrawal fees may apply depending on method.' },
    ],
  },
  {
    id: 'tournaments',
    name: 'Tournaments',
    count: 6,
    icon: <HelpCircle size={18} />,
    questions: [
      { q: 'What are trading tournaments?', a: 'Competitions where traders compete for prizes.' },
      { q: 'How to participate in tournaments?', a: 'Register for available tournaments in the Tournaments section.' },
      { q: 'What are the prizes?', a: 'Prizes vary by tournament and can include cash and bonuses.' },
      { q: 'Are there entry fees?', a: 'Some tournaments are free, others have entry fees.' },
      { q: 'How are winners determined?', a: 'Winners are ranked by profit percentage.' },
      { q: 'Can I participate in multiple tournaments?', a: 'Yes, you can join multiple tournaments simultaneously.' },
    ],
  },
];

interface SupportDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFAQPage: () => void;
}

const SupportDrawer = ({ isOpen, onClose, onOpenFAQPage }: SupportDrawerProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="h-full bg-sidebar border-r border-sidebar-border flex flex-col w-[200px] lg:w-[250px] animate-slide-in-right">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Help</h2>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X size={18} />
        </button>
      </div>

      {/* FAQ & Tutorials */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setExpandedCategory(expandedCategory ? null : 'faq')}
            className="flex flex-col items-center p-3 bg-card rounded-lg hover:bg-muted transition-colors"
          >
            <HelpCircle size={24} className="text-primary mb-2" />
            <span className="text-xs font-medium">FAQ</span>
            <span className="text-[10px] text-muted-foreground">Open the database</span>
          </button>
          <button className="flex flex-col items-center p-3 bg-card rounded-lg hover:bg-muted transition-colors">
            <BookOpen size={24} className="text-primary mb-2" />
            <span className="text-xs font-medium">Tutorials</span>
            <span className="text-[10px] text-muted-foreground">Use the hints</span>
          </button>
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="flex-1 overflow-y-auto p-2">
        {faqCategories.map((category) => (
          <div key={category.id} className="mb-1">
            <button
              onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-lg transition-colors",
                expandedCategory === category.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              )}
            >
              <div className="flex items-center gap-2">
                {category.icon}
                <div className="text-left">
                  <div className="text-sm font-medium">{category.name}</div>
                  <div className="text-[10px] opacity-70">{category.count} questions</div>
                </div>
              </div>
              {expandedCategory === category.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {/* Questions */}
            {expandedCategory === category.id && (
              <div className="ml-2 mt-1 space-y-1">
                {category.questions.map((item, idx) => (
                  <div key={idx}>
                    <button
                      onClick={() => setExpandedQuestion(expandedQuestion === `${category.id}-${idx}` ? null : `${category.id}-${idx}`)}
                      className="w-full text-left p-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded flex items-start gap-1"
                    >
                      <ChevronDown 
                        size={12} 
                        className={cn(
                          "mt-0.5 shrink-0 transition-transform",
                          expandedQuestion === `${category.id}-${idx}` ? "rotate-0" : "-rotate-90"
                        )} 
                      />
                      <span className="line-clamp-2">{item.q}</span>
                    </button>
                    {expandedQuestion === `${category.id}-${idx}` && (
                      <div className="ml-4 p-2 text-xs text-muted-foreground bg-muted/30 rounded">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-sidebar-border space-y-3">
        <div className="text-center">
          <HelpCircle size={24} className="mx-auto text-destructive mb-2" />
          <p className="text-xs text-muted-foreground">Didn't find an answer to your question?</p>
          <button className="text-xs text-primary hover:underline">Contact support</button>
        </div>
        <button
          onClick={onOpenFAQPage}
          className="w-full py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Open FAQ page
        </button>
      </div>
    </div>
  );
};

export default SupportDrawer;