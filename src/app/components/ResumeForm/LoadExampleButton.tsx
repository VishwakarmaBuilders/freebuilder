import { SparklesIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "lib/redux/hooks";
import { setResume, initialResumeState } from "lib/redux/resumeSlice";
import { exampleResumeData } from "lib/redux/example-data";

export const LoadExampleButton = () => {
  const dispatch = useAppDispatch();

  const handleLoadExample = () => {
    dispatch(setResume(exampleResumeData));
  };

  const handleClearData = () => {
    if (confirm("This will clear all your resume data. This action cannot be undone. Continue?")) {
      dispatch(setResume(initialResumeState));
    }
  };

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={handleLoadExample}
        className="flex items-center gap-2 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:from-purple-700 hover:to-blue-700 hover:shadow-md"
      >
        <SparklesIcon className="h-4 w-4" aria-hidden="true" />
        Load Example
      </button>
      <button
        type="button"
        onClick={handleClearData}
        className="flex items-center gap-2 rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-600 shadow-sm transition-all hover:bg-red-50 hover:border-red-400"
      >
        <TrashIcon className="h-4 w-4" aria-hidden="true" />
        Clear All
      </button>
    </div>
  );
};
