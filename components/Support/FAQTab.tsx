import { useState } from 'react';
import FAQCategoryTabs from './FAQCategoryTabs';
import FAQAccordion from './FAQAccordion';
import { HelpCircle } from 'lucide-react';

const faqData: Record<string, { question: string; answer: string }[]> = {
  general: [
    { question: 'What are digital options?', answer: 'Digital options are financial instruments that allow you to trade on price movements of various assets. You predict whether the price will go up or down within a specific time frame.' },
    { question: 'What is the expiration period of a trade?', answer: 'The expiration period is the time after which the trade will be automatically closed. You can choose from various expiration times ranging from 1 minute to several hours.' },
    { question: 'What is the gist of digital options trading?', answer: 'The essence is to predict the price movement direction of an asset. If your prediction is correct, you earn a profit based on the payout percentage.' },
    { question: 'What are the possible results of the placed trades?', answer: 'You can either profit or lose the invested amount based on your prediction. The profit is determined by the payout percentage shown before placing the trade.' },
    { question: 'Does your trading platform have a demo account in order to understand the process of working with digital options without spending your own money?', answer: 'Yes, we provide a free demo account with $10,000 virtual funds. You can practice trading without any risk to your real money.' },
    { question: 'What determines profit size?', answer: 'Profit depends on the asset, market conditions, trade parameters, and the payout percentage which is displayed before you place your trade.' },
    { question: 'What are the varieties of digital options?', answer: 'We offer various types including High/Low options, Turbo options with short expiration times, and other specialized trading instruments.' },
    { question: 'What is a trading platform and why is it needed?', answer: 'A trading platform is software for executing trades and analyzing markets. It provides charts, indicators, and tools to help you make informed trading decisions.' },
    { question: 'How to learn quickly how to make money in the digital options market?', answer: 'Start with our tutorials, use the demo account to practice, learn technical analysis basics, and develop a trading strategy before using real funds.' },
    { question: 'Is the download of the program to a computer or smartphone required?', answer: 'No, our platform works directly in your web browser. You can also use our mobile apps for iOS and Android for trading on the go.' },
    { question: 'At what expense does the Company pay profit to the Client in case of successful trade?', answer: 'Profits come from the trading pool. When some traders lose, others win. The company facilitates this process and takes a small commission.' },
  ],
  account: [
    { question: 'How to register on the platform?', answer: 'Click the registration button, enter your email and create a password. You can also register using your Google or Facebook account.' },
    { question: 'How to verify my account?', answer: 'Go to Account settings, click on Verification, and upload your ID documents. Verification is required for withdrawals.' },
    { question: 'How to change account settings?', answer: 'Navigate to Account settings where you can update your personal information, change password, and manage notification preferences.' },
    { question: 'How to delete my account?', answer: 'Contact our support team to request account deletion. Please note that any remaining balance should be withdrawn first.' },
  ],
  verification: [
    { question: 'What is account verification?', answer: 'Verification confirms your identity for security purposes and regulatory compliance. It protects both you and the platform from fraud.' },
    { question: 'How to understand that I need to go through account verification?', answer: 'You will see a notification in your account dashboard. Verification is typically required before making your first withdrawal.' },
    { question: 'How do I know that I successfully passed verification?', answer: 'Your account status will change to "Verified" and you will receive a confirmation email. The verification badge will appear in your profile.' },
    { question: 'Is it possible to indicate other people\'s (fake) data when registering on the website?', answer: 'No, providing false information violates our terms of service and may result in immediate account suspension and forfeiture of funds.' },
    { question: 'How long does the verification process take?', answer: 'Usually 1-3 business days. During high volume periods, it may take up to 5 business days. You will be notified once completed.' },
  ],
  payment: [
    { question: 'How to deposit funds?', answer: 'Go to the Deposit section, choose your preferred payment method, enter the amount, and follow the instructions to complete the transaction.' },
    { question: 'What payment methods are available?', answer: 'We accept credit/debit cards (Visa, Mastercard), e-wallets (Skrill, Neteller), bank transfers, and various cryptocurrencies.' },
    { question: 'What is the minimum deposit?', answer: 'The minimum deposit is $10. Some payment methods may have different minimums, which are displayed during the deposit process.' },
    { question: 'Are there any deposit fees?', answer: 'We do not charge deposit fees. However, your payment provider may charge their own fees for the transaction.' },
  ],
  payouts: [
    { question: 'How to withdraw money from the account?', answer: 'Go to the Withdrawal section, select your withdrawal method, enter the amount, and submit your request. Funds are sent to the same method used for deposit.' },
    { question: 'What is the minimum withdrawal amount?', answer: 'The minimum withdrawal is $10. This may vary slightly depending on your withdrawal method.' },
    { question: 'Do I need to provide any documents to make a withdrawal?', answer: 'Yes, you need to complete account verification before your first withdrawal. This includes providing ID and proof of address.' },
    { question: 'How long does it take to withdraw funds?', answer: 'Processing takes 1-5 business days depending on the payment method. E-wallets are usually fastest, bank transfers may take longer.' },
    { question: 'Is there any fee for depositing or withdrawing funds from the account?', answer: 'Deposits are free. Withdrawal fees may apply depending on your chosen method and are clearly displayed before you confirm.' },
  ],
  tournaments: [
    { question: 'What are trading tournaments?', answer: 'Trading tournaments are competitions where traders compete against each other for prizes. Rankings are based on profit percentage during the tournament period.' },
    { question: 'How to participate in tournaments?', answer: 'Go to the Tournaments section, find an active tournament, and click Join. Some tournaments require an entry fee while others are free.' },
    { question: 'What are the prizes?', answer: 'Prizes vary by tournament and can include cash prizes, bonus funds, and other rewards. Prize pools are displayed on each tournament page.' },
    { question: 'Are there entry fees?', answer: 'Some tournaments are free to join, while others have entry fees. The fee and prize structure is clearly shown before you join.' },
    { question: 'How are winners determined?', answer: 'Winners are ranked by profit percentage achieved during the tournament period. The traders with highest returns win the prizes.' },
    { question: 'Can I participate in multiple tournaments?', answer: 'Yes, you can join multiple tournaments simultaneously. Each tournament has its own separate balance and rankings.' },
  ],
};

const FAQTab = () => {
  const [activeCategory, setActiveCategory] = useState('general');

  return (
    <div className="py-6">
      <h2 className="text-xl font-semibold text-center mb-6">Frequently Asked Questions</h2>
      
      <FAQCategoryTabs 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />

      <div className="mt-8">
        <FAQAccordion items={faqData[activeCategory] || []} />
      </div>

      {/* Contact Support */}
      <div className="mt-12 bg-card rounded-lg p-6 flex items-center justify-center gap-4">
        <HelpCircle size={24} className="text-primary" />
        <div>
          <p className="text-sm text-muted-foreground">Didn't find an answer to your question?</p>
          <button className="text-sm text-primary hover:underline">Contact customer support</button>
        </div>
      </div>
    </div>
  );
};

export default FAQTab;
