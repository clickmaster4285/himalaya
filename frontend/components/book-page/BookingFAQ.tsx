"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function BookingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I book a hotel in Murree at Himalaya Villas?",
      answer: "You can book directly through our website by selecting your dates and villa type in the availability form, or by contacting our reservations team via WhatsApp for instant assistance and personalized booking."
    },
    {
      question: "What are check-in and check-out times?",
      answer: "Check-in begins at 2:00 PM. We offer early check-in from 12:00 PM upon request. Check-out is at 12:00 PM. Guests booking directly with us are eligible for late check-out up to 3:00 PM, subject to availability."
    },
    {
      question: "What is the cancellation policy?",
      answer: "Cancellations made 7 days or more before your scheduled arrival will receive a full refund of any advance payment. We also offer flexible date changes for direct bookings when needed."
    },
    {
      question: "Is halal food available?",
      answer: "Yes, our property is 100% Halal-certified. Every food item served at Himalaya Villas is prepared under strict halal standards. Please note that no alcohol is permitted on the premises to maintain a family-safe environment."
    },
    {
      question: "How far is Himalaya Villas from Islamabad?",
      answer: "We are located approximately 60 kilometers from Islamabad, which is about a 1.5-hour drive via the Murree Expressway."
    },
    {
      question: "When is the best time to book?",
      answer: "While we operate year-round, our villas are in extremely high demand during Eid holidays, summer months, and peak weekends. We recommend booking at least 2-4 weeks in advance for these periods."
    },
    {
      question: "Do you offer corporate retreat packages?",
      answer: "Yes, we offer bespoke corporate retreat packages that include exclusive use of villa wings (accommodating 10-50 guests), private boardrooms with AV equipment, team-building activities, and corporate billing."
    },
    {
      question: "Are heating and air conditioning available?",
      answer: "Yes, all our villas feature central heating for the winter months and air conditioning for the summer, ensuring your comfort regardless of the season."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#f6f1ea] px-6 py-20 md:py-28 border-b border-[#eae3d5]">
      <div className="max-w-[1000px] mx-auto">
        
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
            <span className="h-[1px] w-8 bg-[#c9a55b]"></span>
            <span>FREQUENTLY ASKED QUESTIONS</span>
            <span className="h-[1px] w-8 bg-[#c9a55b]"></span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-[#1b261b] leading-[1.1] tracking-tight mb-6">
            Everything About
            <span className="block italic text-[#c9a55b] font-light mt-1">Booking Murree Hotels</span>
          </h2>
          <p className="text-[14px] md:text-[15px] text-neutral-600 leading-relaxed font-light max-w-2xl mx-auto">
            Common questions from guests planning hotel bookings in Murree and Bhurban at Himalaya Villas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-[#eae3d5]">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="text-[14px] font-bold text-[#1b261b] pr-8">
                  {faq.question}
                </span>
                <span className="shrink-0 w-6 h-6 border border-[#eae3d5] bg-white flex items-center justify-center text-neutral-400">
                  {openIndex === index ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                </span>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-[13px] text-neutral-600 leading-relaxed font-light">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
