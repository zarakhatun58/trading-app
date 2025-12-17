import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ReusableUI/tabs';
import SupportLayout from '../components/Layouts/SupportLayout';
import MyRequestsTab from '../components/Support/MyRequestsTab';
import CreateRequestTab from '../components/Support/CreateRequestTab';
import FAQTab from '../components/Support/FAQTab';

const Support = () => {
  const [activeTab, setActiveTab] = useState('faq');

  return (
    <div className="p-4 lg:p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-card mb-6">
          <TabsTrigger value="my-requests" className="text-xs md:text-sm">My requests</TabsTrigger>
          <TabsTrigger value="create-request" className="text-xs md:text-sm">Create request</TabsTrigger>
          <TabsTrigger value="faq" className="text-xs md:text-sm">FAQ</TabsTrigger>
        </TabsList>

        <SupportLayout>
          <TabsContent value="my-requests" className="m-0">
            <MyRequestsTab />
          </TabsContent>
          <TabsContent value="create-request" className="m-0">
            <CreateRequestTab />
          </TabsContent>
          <TabsContent value="faq" className="m-0">
            <FAQTab />
          </TabsContent>
        </SupportLayout>
      </Tabs>
    </div>
  );
};

export default Support;
