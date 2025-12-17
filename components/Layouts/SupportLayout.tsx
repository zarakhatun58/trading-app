import { ReactNode } from 'react';

interface SupportLayoutProps {
  children: ReactNode;
}

const SupportLayout = ({ children }: SupportLayoutProps) => {
  return (
    <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-6">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {children}
      </div>

      {/* Right Sidebar - Account Info */}
      <div className="w-full lg:w-[200px] space-y-4">
        <div className="bg-card rounded-lg p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">Available for withdrawal</p>
          <p className="text-xl font-bold text-foreground">0.00 $</p>
        </div>
        <div className="bg-card rounded-lg p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">In the account</p>
          <p className="text-xl font-bold text-foreground">0.00 $</p>
        </div>
      </div>
    </div>
  );
};

export default SupportLayout;
