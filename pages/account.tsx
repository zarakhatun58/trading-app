import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import { WithdrawalTab } from '../components/account/WithdrawalTab';
import { TransactionsTab } from '../components/account/TransactionsTab';
import { TradesTab } from '../components/account/TradesTab';
import AccountSettingsTab from '../components/account/AccountSettingsTab';
import { AnalyticsTab } from '../components/account/AnalyticsTab';
import AccountTabs, { AccountTab } from '../components/account/AccountTabs';
import MarketTab from '../components/account/MarketTab';
import { TournamentsTab } from '../components/account/TournamentsTab';
import AccountLayout from '../components/Layouts/AccountLayout';

const AccountPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabFromUrl = searchParams.get('tab') as AccountTab | null;

  const [activeTab, setActiveTab] = useState<AccountTab>(
    tabFromUrl || 'withdrawal'
  );

  useEffect(() => {
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl, activeTab]);

  const handleTabChange = (tab: AccountTab) => {
    setActiveTab(tab);
    router.push(`/account?tab=${tab}`, { scroll: false });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'withdrawal':
        return <WithdrawalTab />;
      case 'transactions':
        return <TransactionsTab />;
      case 'trades':
        return <TradesTab />;
      case 'account':
        return <AccountSettingsTab />;
      case 'market':
        return <MarketTab />;
      case 'tournaments':
        return <TournamentsTab />;
      case 'analytics':
        return <AnalyticsTab />;
      default:
        return <WithdrawalTab />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#1b2230] p-2">
      <AccountTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <div data-scroll className="flex-1 overflow-auto">
        {renderTabContent()}
      </div>
    </div>
  );
};

/* ✅ Attach layout HERE */
AccountPage.getLayout = function getLayout(page: React.ReactNode) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default AccountPage;
