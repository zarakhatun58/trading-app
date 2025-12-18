'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ReusableUI/accordion';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

const FAQAccordion = ({ items }: FAQAccordionProps) => {
  // Split items into two columns
  const midPoint = Math.ceil(items.length / 2);
  const leftColumn = items.slice(0, midPoint);
  const rightColumn = items.slice(midPoint);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 mx-2">
      <div>
        <Accordion type="single" collapsible className="space-y-2">
          {leftColumn.map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`left-${index}`}
              className="border-none"
            >
              <AccordionTrigger className="text-sm text-left hover:no-underline py-3 px-0 text-muted-foreground hover:text-foreground">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground bg-card/50 p-4 rounded-lg">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className=''>
        <Accordion type="single" collapsible className="space-y-2 ">
          {rightColumn.map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`right-${index}`}
              className="border-none"
            >
              <AccordionTrigger className="text-sm text-left hover:no-underline py-3 px-0 text-muted-foreground hover:text-foreground">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground bg-card/50 p-4 rounded-lg">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQAccordion;
