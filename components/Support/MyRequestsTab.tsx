'use client';
import { Inbox } from 'lucide-react';

const MyRequestsTab = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Inbox size={48} className="text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium text-foreground mb-2">No requests yet</h3>
      <p className="text-sm text-muted-foreground text-center max-w-md">
        You haven't submitted any support requests. If you need help, create a new request or check our FAQ.
      </p>
    </div>
  );
};

export default MyRequestsTab;
