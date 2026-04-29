"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

interface EventFAQsProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

const EventFAQs = ({ faqs }: EventFAQsProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-[#c9a55b] flex-shrink-0" />
              <span className="font-semibold text-gray-900 pr-8">{faq.question}</span>
            </div>
            <span className="flex-shrink-0">
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </span>
          </button>
          
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="px-6 pb-4">
              <p className="text-gray-600 leading-relaxed pl-8">{faq.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventFAQs;
