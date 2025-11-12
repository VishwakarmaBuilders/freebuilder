"use client";

import { PencilSquareIcon, SwatchIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

const STEPS = [
  {
    icon: PencilSquareIcon,
    title: "Enter Your Details",
    description: "Fill personal, education, skills, and experience.",
  },
  {
    icon: SwatchIcon,
    title: "Choose Template",
    description: "Pick from modern, classic, or creative layouts.",
  },
  {
    icon: ArrowDownTrayIcon,
    title: "Download Instantly",
    description: "Export as PDF or Word in one click.",
  },
];

export const Steps = () => {
  return (
    <section className="bg-gray-50 pt-12 pb-10 sm:pt-16 sm:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-500 sm:mt-4 sm:text-lg">
            Create a professional resume in just 3 simple steps
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative group">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 opacity-20 blur transition duration-200 group-hover:opacity-40"></div>
                  <div className="relative flex h-full flex-col rounded-2xl bg-white p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                    <p className="mt-2 text-sm text-gray-600 sm:text-base">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
