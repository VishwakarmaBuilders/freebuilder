import { CheckCircleIcon, BoltIcon, DocumentTextIcon, SwatchIcon, DevicePhoneMobileIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const FEATURES = [
  {
    icon: CheckCircleIcon,
    title: "No Sign-Up Required",
    description: "Get started instantly without creating an account or sharing personal information",
  },
  {
    icon: BoltIcon,
    title: "Build in Minutes",
    description: "Create a professional resume quickly with our intuitive builder",
  },
  {
    icon: DocumentTextIcon,
    title: "Multiple Free Templates",
    description: "Choose from modern, ATS-friendly resume templates",
  },
  {
    icon: SwatchIcon,
    title: "Custom Colors & Fonts",
    description: "Personalize your resume to match your personal brand",
  },
  {
    icon: DevicePhoneMobileIcon,
    title: "Mobile-Friendly",
    description: "Edit and preview your resume on any device, anywhere",
  },
  {
    icon: ArrowDownTrayIcon,
    title: "Download in Multiple Formats",
    description: "Export your resume as PDF, Word, or plain text",
  },
];

export const KeyFeatures = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Why Choose Our Resume Builder
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Everything you need to create a professional resume that stands out
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 p-2 rounded-lg text-blue-600">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                    <p className="mt-1 text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
