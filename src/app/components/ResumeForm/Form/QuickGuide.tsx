import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface QuickGuideProps {
  text: string;
}

export const QuickGuide = ({ text }: QuickGuideProps) => {
  return (
    <div className="mb-4 flex gap-2 rounded-md bg-blue-50 p-3 border border-blue-200">
      <InformationCircleIcon className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
      <div>
        <p className="text-sm font-medium text-blue-900 mb-1">Quick Guide</p>
        <p className="text-sm text-blue-800">{text}</p>
      </div>
    </div>
  );
};
