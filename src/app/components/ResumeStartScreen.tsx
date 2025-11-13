"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  PencilSquareIcon, 
  ArrowUpTrayIcon,
  SparklesIcon,
  DocumentTextIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { saveStateToLocalStorage } from "lib/redux/local-storage";
import { deepClone } from "lib/deep-clone";
import { initialSettings, ShowForm } from "lib/redux/settingsSlice";
import { Resume } from "lib/redux/types";
import { cx } from "lib/cx";

export const ResumeStartScreen = () => {
  const router = useRouter();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);

  const handleStartFromScratch = () => {
    // Navigate to resume builder with empty/default data
    router.push("/resume-builder");
  };

  const handleImportClick = () => {
    setShowUploadModal(true);
    setError("");
  };

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith(".pdf") && !file.name.endsWith(".docx")) {
      setError("Please upload a PDF or DOCX file");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      let resume: Resume;
      
      if (file.name.endsWith(".pdf")) {
        // Dynamic import PDF parser (client-side only)
        const { parseResumeFromPdf } = await import("lib/parse-resume-from-pdf");
        const fileUrl = URL.createObjectURL(file);
        resume = await parseResumeFromPdf(fileUrl);
        URL.revokeObjectURL(fileUrl);
      } else {
        // Dynamic import DOCX parser (client-side only)
        const { parseResumeFromDocx } = await import("lib/parse-resume-from-docx");
        resume = await parseResumeFromDocx(file);
      }

      // Configure settings based on extracted data
      const settings = deepClone(initialSettings);
      const sections = Object.keys(settings.formToShow) as ShowForm[];
      const sectionToFormToShow: Record<ShowForm, boolean> = {
        workExperiences: resume.workExperiences.length > 0,
        educations: resume.educations.length > 0,
        projects: resume.projects.length > 0,
        skills: resume.skills.descriptions.length > 0,
        custom: resume.custom.descriptions.length > 0,
      };
      
      for (const section of sections) {
        settings.formToShow[section] = sectionToFormToShow[section];
      }

      // Save to localStorage
      saveStateToLocalStorage({ resume, settings });

      // Navigate to resume builder
      router.push("/resume-builder");
    } catch (err) {
      setError(
        err instanceof Error 
          ? err.message 
          : "Failed to extract resume data. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  return (
    <>
      {/* Main Start Screen */}
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
        <div className="w-full max-w-5xl animate-fade-in">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-3 text-4xl font-bold text-gray-900 md:text-5xl">
              How would you like to build your resume?
            </h1>
            <p className="text-lg text-gray-600">
              Choose an option to get started
            </p>
          </div>

          {/* Options Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Option 1: Start from Scratch */}
            <button
              onClick={handleStartFromScratch}
              className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-8 text-left shadow-lg transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-2xl"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="relative">
                {/* Icon */}
                <div className="mb-4 inline-flex rounded-full bg-blue-100 p-4 group-hover:bg-blue-200">
                  <PencilSquareIcon className="h-8 w-8 text-blue-600" />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-2xl font-bold text-gray-900">
                  ✨ Start from Scratch
                </h3>
                <p className="mb-4 text-gray-600">
                  Create a brand new resume using our step-by-step builder.
                </p>

                {/* Features */}
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-center">
                    <SparklesIcon className="mr-2 h-4 w-4 text-blue-500" />
                    Step-by-step guided process
                  </li>
                  <li className="flex items-center">
                    <SparklesIcon className="mr-2 h-4 w-4 text-blue-500" />
                    Professional templates
                  </li>
                  <li className="flex items-center">
                    <SparklesIcon className="mr-2 h-4 w-4 text-blue-500" />
                    Real-time preview
                  </li>
                </ul>

                {/* Arrow indicator */}
                <div className="mt-6 flex items-center text-blue-600 font-semibold">
                  Get Started
                  <svg
                    className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </div>
            </button>

            {/* Option 2: Import Resume */}
            <button
              onClick={handleImportClick}
              className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-8 text-left shadow-lg transition-all duration-300 hover:scale-105 hover:border-teal-400 hover:shadow-2xl"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-green-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="relative">
                {/* Icon */}
                <div className="mb-4 inline-flex rounded-full bg-teal-100 p-4 group-hover:bg-teal-200">
                  <ArrowUpTrayIcon className="h-8 w-8 text-teal-600" />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-2xl font-bold text-gray-900">
                  📄 Import Resume
                </h3>
                <p className="mb-4 text-gray-600">
                  Upload your old resume, and we'll automatically extract and fill all fields for you.
                </p>

                {/* Features */}
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-center">
                    <DocumentTextIcon className="mr-2 h-4 w-4 text-teal-500" />
                    Supports PDF & DOCX
                  </li>
                  <li className="flex items-center">
                    <DocumentTextIcon className="mr-2 h-4 w-4 text-teal-500" />
                    Auto-fill all sections
                  </li>
                  <li className="flex items-center">
                    <DocumentTextIcon className="mr-2 h-4 w-4 text-teal-500" />
                    100% private & secure
                  </li>
                </ul>

                {/* Arrow indicator */}
                <div className="mt-6 flex items-center text-teal-600 font-semibold">
                  Upload Resume
                  <svg
                    className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </div>
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              💡 <strong>What's the difference?</strong> Start from scratch if you're creating your first resume. 
              Import if you already have one and want to redesign it.
            </p>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowUploadModal(false);
                setError("");
              }}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Upload Your Resume
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                We'll extract all information automatically
              </p>
            </div>

            {/* Upload Area */}
            <div
              className={cx(
                "rounded-xl border-2 border-dashed p-8 text-center transition-colors",
                isDragging
                  ? "border-teal-400 bg-teal-50"
                  : "border-gray-300 bg-gray-50"
              )}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
            >
              {!isProcessing ? (
                <>
                  <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-4 text-lg font-semibold text-gray-700">
                    Drop your resume here
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    or click to browse
                  </p>
                  <label className="mt-4 inline-block cursor-pointer rounded-full bg-teal-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-teal-700">
                    Browse Files
                    <input
                      type="file"
                      className="sr-only"
                      accept=".pdf,.docx,.doc"
                      onChange={onFileInputChange}
                    />
                  </label>
                  <p className="mt-4 text-xs text-gray-500">
                    Supports PDF, DOC, and DOCX files
                  </p>
                </>
              ) : (
                <div className="py-4">
                  <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-teal-600" />
                  <p className="mt-4 text-lg font-semibold text-gray-700">
                    Extracting your resume...
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    This may take a few seconds
                  </p>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 rounded-lg bg-red-50 p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Privacy Notice */}
            <div className="mt-6 rounded-lg bg-blue-50 p-4">
              <p className="text-xs text-blue-800">
                🔒 <strong>Your privacy matters:</strong> All processing happens locally in your browser. 
                Your resume never leaves your device.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Global CSS for animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </>
  );
};
