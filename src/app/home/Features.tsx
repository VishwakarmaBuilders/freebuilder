"use client";

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

type FAQItem = {
  question: string;
  answer: string;
};

const FAQS: FAQItem[] = [
  {
    question: "What is this Resume Builder and how does it work?",
    answer: "It's an online tool that helps you create a professional resume quickly. Just enter your details, choose a layout, and download your resume instantly — no sign-up required."
  },
  {
    question: "Do I need to create an account?",
    answer: "No. You can use all features without logging in. Your data stays private on your own device."
  },
  {
    question: "Is the resume compatible with job portals and ATS?",
    answer: "Yes, the generated resumes are recruiter-friendly and compatible with Applicant Tracking Systems (ATS)."
  },
  {
    question: "Can I customize the design and layout?",
    answer: "Yes. You can easily change fonts, colors, and section order to match your personal style."
  },
  {
    question: "Is it free to use?",
    answer: "Yes, it's 100% free. You can build, edit, and download as many resumes as you like."
  },
  {
    question: "How can I share feedback or request new features?",
    answer: "You can email us at support@freeonlinepdftool.com with your suggestions or bug reports."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItem & { isOpen: boolean; onClick: () => void }) => (
  <div className="border-b border-gray-200">
    <button
      className="flex w-full items-center justify-between py-6 text-left focus:outline-none"
      onClick={onClick}
      aria-expanded={isOpen}
    >
      <span className="text-lg font-medium text-gray-900">{question}</span>
      {isOpen ? (
        <ChevronUpIcon className="h-5 w-5 text-gray-500" />
      ) : (
        <ChevronDownIcon className="h-5 w-5 text-gray-500" />
      )}
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ${
        isOpen ? 'max-h-96 pb-6' : 'max-h-0'
      }`}
      aria-hidden={!isOpen}
    >
      <p className="text-gray-600">{answer}</p>
    </div>
  </div>
);

export const Features = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Everything you need to know about our resume builder
          </p>
        </div>

        <div className="mt-12 divide-y divide-gray-200">
          {FAQS.map((faq, index) => (
            <FAQItem
              key={index}
              {...faq}
              isOpen={openIndex === index}
              onClick={() => toggleItem(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
