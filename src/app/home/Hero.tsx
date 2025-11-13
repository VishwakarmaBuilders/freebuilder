"use client";

import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { AutoTypingResume } from "./AutoTypingResume";

export function Hero() {
  const router = useRouter();

  const scrollToTemplates = () => {
    const element = document.getElementById("templates");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f8fbff] via-white to-[#eef4ff]">
      <div className="pointer-events-none absolute inset-y-0 right-[-20%] hidden w-[60%] translate-y-10 rounded-full bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.18),_transparent_65%)] blur-3xl lg:block" />
      <div className="pointer-events-none absolute -left-20 top-[18%] hidden h-52 w-52 rounded-full bg-[radial-gradient(circle_at_center,_rgba(147,197,253,0.25),_transparent_60%)] blur-2xl sm:block" />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-6 sm:px-6 sm:py-10 md:py-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:px-8 lg:py-10">
        {/* Left side - Text content */}
        <div className="relative z-10 space-y-6 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600 sm:text-xs sm:tracking-[0.35em]">
            <span className="h-1 w-1 rounded-full bg-blue-500" /> ATS-Friendly resumes in minutes
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            <span className="block leading-tight">The #1 Resume Builder</span>
            <span className="mt-2 block bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Get hired faster without the design stress
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-sm text-slate-600 sm:text-lg">
            Craft a polished, ATS-optimized resume in under 10 minutes. Start with
            conversion-tested templates, edit live, and download unlimited PDFs for
            free—no account required.
          </p>

          <div className="mx-auto flex max-w-lg flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-start lg:mx-0">
            <button
              onClick={() => router.push("/builder")}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 px-8 py-4 text-sm font-semibold text-white shadow-[0_18px_35px_-18px_rgba(59,130,246,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_25px_45px_-24px_rgba(79,70,229,0.75)] sm:w-auto"
            >
              Create my resume
              <ArrowRightIcon className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
            <button
              onClick={scrollToTemplates}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-blue-100 bg-white px-8 py-4 text-sm font-semibold text-blue-600 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 sm:w-auto"
            >
              View templates
            </button>
          </div>
          <div className="flex flex-col items-center gap-3 text-xs text-slate-500 sm:flex-row sm:justify-center sm:text-sm lg:justify-start">
            <div className="inline-flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, starIdx) => (
                <svg key={starIdx} className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2 14.9 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 9.1 8.26 12 2Z" />
                </svg>
              ))}
            </div>
            <span className="max-w-xs text-center sm:max-w-none sm:text-left">
              Rated 4.9/5 from 40k+ job seekers • Free forever
            </span>
          </div>
        </div>

        {/* Right side - AutoTypingResume */}
        <div className="relative z-10 mt-6 flex justify-center sm:mt-10 lg:mt-0 lg:justify-end overflow-x-hidden">
          <div className="relative w-full max-w-sm overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_25px_70px_-30px_rgba(59,130,246,0.65)] sm:max-w-md lg:max-w-xl">
            <div className="absolute inset-x-0 top-0 flex h-10 items-center gap-2 px-5">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <span className="ml-auto rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                Live preview
              </span>
            </div>
            <div className="pt-12 overflow-x-hidden">
              <AutoTypingResume />
            </div>
            <div className="absolute -right-10 bottom-8 hidden rounded-2xl border border-blue-100 bg-white px-4 py-3 shadow-lg shadow-blue-500/10 lg:block">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                Featured in
              </p>
              <div className="mt-2 flex items-center gap-4 text-sm font-semibold text-slate-500">
                <span>LinkedIn</span>
                <span>Google</span>
                <span>Indeed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="z-10 mx-auto flex max-w-6xl flex-col gap-5 px-4 pb-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pb-3 sm:text-sm">
        <div className="inline-flex items-center gap-2 text-center text-slate-600 sm:text-left">
          <svg className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12h20" />
            <path d="M12 2v20" />
          </svg>
          No login required • Unlimited downloads • Built for ATS
        </div>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              { label: "40k+", caption: "resumes created" },
              { label: "98%", caption: "user satisfaction" },
            ].map((metric) => (
              <div key={metric.label} className="flex flex-col text-center">
                <span className="text-base font-semibold text-slate-900 sm:text-lg">{metric.label}</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 sm:text-xs">{metric.caption}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => router.push("/resume-parser")}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-blue-600 transition-colors duration-200 hover:border-blue-200 hover:bg-blue-50 sm:w-auto"
          >
            Parse My Resume
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
