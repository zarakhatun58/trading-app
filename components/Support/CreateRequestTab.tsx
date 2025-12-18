'use client';
import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { Button } from '../ReusableUI/button';
import { Input } from '../ReusableUI/input';
import { Textarea } from '../ReusableUI/textarea';

const subjects = ['Verification', 'Deposit / Withdrawal', 'Other issue'];

const CreateRequestTab = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  return (
    <div className="mx-auto py-8 max-w-[1100px]">
      <div className="text-center mb-8">
        <HelpCircle size={48} className="mx-auto text-primary mb-4" />
        <p className="text-sm text-muted-foreground">Didn't find an answer to your question?</p>
        <button className="text-sm text-primary hover:underline">Contact customer support</button>
      </div>

      <div className="mb-6">
        <h3 className="text-center text-sm font-medium mb-4">Select subject</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {subjects.map((subject) => (
            <Button
              key={subject}
              variant={selectedSubject === subject ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedSubject(subject)}
              className="text-xs"
            >
              {subject}
            </Button>
          ))}
        </div>
      </div>

      {selectedSubject && (
        <div className="space-y-4 animate-fade-in">
          <div>
            <label className="text-sm text-muted-foreground block mb-2">Subject</label>
            <Input value={selectedSubject} readOnly className="bg-card" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-2">Your message</label>
            <Textarea
              placeholder="Describe your issue in detail..." 
              className="bg-card min-h-[150px]" 
            />
          </div>
          <Button className="w-full">Submit Request</Button>
        </div>
      )}
    </div>
  );
};

export default CreateRequestTab;
