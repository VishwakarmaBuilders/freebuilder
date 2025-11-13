"use client";
import { getHasUsedAppBefore, saveStateToLocalStorage } from "lib/redux/local-storage";
import { useState, useEffect } from "react";
import { ResumePreview } from "components/ResumePreview";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Resume } from "lib/redux/types";
import { deepClone } from "lib/deep-clone";
import { initialSettings, ShowForm } from "lib/redux/settingsSlice";
import { LockClosedIcon, XMarkIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { cx } from "lib/cx";
import Image from "next/image";
import addPdfSrc from "public/assets/add-pdf.svg";

type ImportStep = "upload" | "review";

export default function ImportResume() {
  const router = useRouter();
  const [hasUsedAppBefore, setHasUsedAppBefore] = useState(false);
  const [currentStep, setCurrentStep] = useState<ImportStep>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [extractedResume, setExtractedResume] = useState<Resume | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>("");
  const [isHoveredOnDropzone, setIsHoveredOnDropzone] = useState(false);

  useEffect(() => {
    setHasUsedAppBefore(getHasUsedAppBefore());
  }, []);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setError("");
  };

  const handleRemoveFile = () => {
    setFile(null);
    setError("");
  };

  const handleExtractData = async () => {
    if (!file) return;

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
      } else if (file.name.endsWith(".docx")) {
        // Dynamic import DOCX parser (client-side only)
        const { parseResumeFromDocx } = await import("lib/parse-resume-from-docx");
        resume = await parseResumeFromDocx(file);
      } else {
        throw new Error("Unsupported file format");
      }

      setExtractedResume(resume);
      setCurrentStep("review");
    } catch (err) {
      setError(
        err instanceof Error 
          ? err.message 
          : "Failed to extract resume data. Please try again with a different file."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmImport = () => {
    if (!extractedResume) return;

    const settings = deepClone(initialSettings);

    // Set formToShow settings to always show all sections
    // This allows users to manually add data even if imported resume doesn't have it
    if (getHasUsedAppBefore()) {
      const sections = Object.keys(settings.formToShow) as ShowForm[];
      for (const section of sections) {
        settings.formToShow[section] = true;
      }
    }

    saveStateToLocalStorage({ resume: extractedResume, settings });
    router.push("/resume-builder");
  };

  const handleCancelReview = () => {
    setCurrentStep("upload");
    setFile(null);
    setExtractedResume(null);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    
    if (droppedFile && (droppedFile.name.endsWith(".pdf") || droppedFile.name.endsWith(".docx"))) {
      handleFileSelect(droppedFile);
    } else {
      setError("Please upload a PDF or DOCX file");
    }
    setIsHoveredOnDropzone(false);
  };

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  if (currentStep === "review" && extractedResume) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <ResumePreview
          resume={extractedResume}
          onConfirm={handleConfirmImport}
          onCancel={handleCancelReview}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto mt-14 max-w-3xl rounded-md border border-gray-200 bg-white px-10 py-10 shadow-md">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Import Resume
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Upload your existing resume (PDF or DOCX) and we'll extract the information automatically
          </p>
        </div>

        {/* Upload Area */}
        {!file ? (
          <div
            className={cx(
              "flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 py-12",
              isHoveredOnDropzone && "border-sky-400 bg-sky-50"
            )}
            onDragOver={(e) => {
              e.preventDefault();
              setIsHoveredOnDropzone(true);
            }}
            onDragLeave={() => setIsHoveredOnDropzone(false)}
            onDrop={onDrop}
          >
            <div className="space-y-3 text-center">
              <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div>
                <p className="text-lg font-semibold text-gray-700">
                  Drop your resume here or click to browse
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Supports PDF and DOCX formats
                </p>
              </div>
              <div className="flex items-center justify-center text-sm text-gray-500">
                <LockClosedIcon className="mr-1 h-3 w-3 text-gray-400" />
                All processing happens locally in your browser
              </div>
              <label className="inline-block cursor-pointer rounded-full bg-primary px-6 py-2.5 font-semibold text-white shadow-sm hover:bg-primary/90">
                Browse Files
                <input
                  type="file"
                  className="sr-only"
                  accept=".pdf,.docx"
                  onChange={onFileInputChange}
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* File Info */}
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-2">
                  <ArrowUpTrayIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={handleRemoveFile}
                className="rounded-md p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
                title="Remove file"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Extract Button */}
            <button
              onClick={handleExtractData}
              disabled={isProcessing}
              className="btn-primary w-full"
            >
              {isProcessing ? (
                <>
                  <svg className="mr-2 inline h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Extracting Data...
                </>
              ) : (
                <>
                  Extract Resume Data →
                </>
              )}
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Divider */}
        {!hasUsedAppBefore && !file && (
          <>
            <OrDivider />
            <SectionWithHeadingAndCreateButton
              heading="Don't have a resume yet?"
              buttonText="Create from scratch"
            />
          </>
        )}

        {/* Continue Option for returning users */}
        {hasUsedAppBefore && !file && (
          <>
            <OrDivider />
            <SectionWithHeadingAndCreateButton
              heading="You have data saved from a previous session"
              buttonText="Continue where I left off"
            />
          </>
        )}
      </div>
    </main>
  );
}

const OrDivider = () => (
  <div className="mx-[-2.5rem] flex items-center pb-6 pt-8" aria-hidden="true">
    <div className="flex-grow border-t border-gray-200" />
    <span className="mx-2 mt-[-2px] flex-shrink text-lg text-gray-400">or</span>
    <div className="flex-grow border-t border-gray-200" />
  </div>
);

const SectionWithHeadingAndCreateButton = ({
  heading,
  buttonText,
}: {
  heading: string;
  buttonText: string;
}) => {
  return (
    <>
      <p className="font-semibold text-gray-900">{heading}</p>
      <div className="mt-5">
        <Link
          href="/resume-builder"
          className="outline-theme-blue rounded-full bg-sky-500 px-6 pb-2 pt-1.5 text-base font-semibold text-white"
        >
          {buttonText}
        </Link>
      </div>
    </>
  );
};
