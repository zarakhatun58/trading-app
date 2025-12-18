'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ReusableUI/tabs';
import SupportLayout from '../components/Layouts/SupportLayout';
import MyRequestsTab from '../components/Support/MyRequestsTab';
import CreateRequestTab from '../components/Support/CreateRequestTab';
import FAQTab from '../components/Support/FAQTab';
import { useState } from 'react';
import { cn } from '../libs/utils';
import { ChevronDown } from 'lucide-react';

const TAB_ITEMS = [
  { value: 'my-requests', label: 'My requests' },
  { value: 'create-request', label: 'Create request' },
  { value: 'faq', label: 'FAQ' },
];
const Support = () => {
   const [activeTab, setActiveTab] = useState('faq');
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeLabel =
    TAB_ITEMS.find(t => t.value === activeTab)?.label;
  return (
    <SupportLayout>
      <Tabs defaultValue="faq" value={activeTab} onValueChange={setActiveTab}>

       {/* ================= DESKTOP TABS ================= */}
        <TabsList className="hidden md:flex bg-[#2b3040] mb-8">
          <TabsTrigger value="my-requests">My requests</TabsTrigger>
          <TabsTrigger value="create-request">Create request</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
{/* ================= MOBILE ACCORDION ================= */}
        <div className="md:hidden mb-6 relative">
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="flex items-center justify-between w-full
              bg-[#101729] border border-[rgba(53,58,77,0.1)]
              rounded-lg px-4 py-3 text-white"
          >
            <span className="font-medium">{activeLabel}</span>
            <ChevronDown
              size={18}
              className={cn(
                'transition-transform',
                mobileOpen && 'rotate-180'
              )}
            />
          </button>

          {mobileOpen && (
            <div className="absolute z-50 mt-2 w-full
              bg-[#101729] border border-[rgba(53,58,77,0.1)]
              rounded-lg overflow-hidden"
            >
              {TAB_ITEMS.map(tab => (
                <button
                  key={tab.value}
                  onClick={() => {
                    setActiveTab(tab.value);
                    setMobileOpen(false);
                  }}
                  className={cn(
                    'w-full text-left px-4 py-3 text-sm hover:bg-[#2b3040]',
                    activeTab === tab.value
                      ? 'bg-[#2b3040] text-white'
                      : 'text-muted-foreground'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <TabsContent value="my-requests">
          <MyRequestsTab />
        </TabsContent>

        <TabsContent value="create-request">
          <CreateRequestTab />
        </TabsContent>

        <TabsContent value="faq">
          <FAQTab />
        </TabsContent>

      </Tabs>
    </SupportLayout>
  );
};

export default Support;
