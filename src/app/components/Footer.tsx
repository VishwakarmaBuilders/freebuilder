'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface FooterProps {
  showFooter?: boolean;
}

export const Footer = ({ showFooter = true }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (!showFooter) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-4');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [showFooter]);

  if (!showFooter) return null;

  const socialLinks = [
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6.94 6.5a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
          <path d="M5.5 9.75h2.88V18H5.5z" />
          <path d="M11 9.75h2.76v1.16a2.81 2.81 0 0 1 2.45-1.32c2.07 0 3.29 1.3 3.29 3.57V18h-2.88v-4.33c0-1.07-.42-1.8-1.38-1.8-0.78 0-1.25.52-1.45 1.02-.08.19-.1.44-.1.69V18H11z" />
        </svg>
      ),
    },
    {
      label: 'Twitter',
      href: 'https://twitter.com',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.83 5.54a6.52 6.52 0 0 1-1.88.52 3.28 3.28 0 0 0 1.44-1.8 6.57 6.57 0 0 1-2.08.8 3.27 3.27 0 0 0-5.57 2.24c0 .26.03.52.08.77A9.3 9.3 0 0 1 4.59 4.89a3.27 3.27 0 0 0 1.01 4.37 3.24 3.24 0 0 1-1.48-.41v.04a3.27 3.27 0 0 0 2.62 3.21 3.34 3.34 0 0 1-1.47.06 3.28 3.28 0 0 0 3.05 2.27A6.56 6.56 0 0 1 4 16.56a9.26 9.26 0 0 0 5.02 1.47c6.02 0 9.31-4.99 9.31-9.31 0-.14 0-.28-.01-.41a6.65 6.65 0 0 0 1.51-1.62Z" />
        </svg>
      ),
    },
    {
      label: 'GitHub',
      href: 'https://github.com',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-4 1-4-2-6-2m12 4v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 18 4.77 5.07 5.07 0 0 0 17.91 1S16.73.65 14 2.48a13.38 13.38 0 0 0-5 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.82c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 19v3" />
        </svg>
      ),
    },
  ];

  const linkGroups = [
    {
      title: 'Product',
      icon: (
        <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7a2 2 0 0 1 1-1.73l6-3.46a2 2 0 0 1 2 0l6 3.46A2 2 0 0 1 20 7v10a2 2 0 0 1-1 1.73l-6 3.46a2 2 0 0 1-2 0l-6-3.46A2 2 0 0 1 4 17Z" />
          <path d="m3.27 6.96 8.73 5.04 8.73-5.04" />
          <path d="M12 22V12" />
        </svg>
      ),
      links: [
        { label: 'Builder', href: '/builder' },
        { label: 'Resume Parser', href: '/resume-parser' },
        { label: 'Resume Examples', href: '/examples' },
        { label: 'Cover Letter', href: '/cover-letter' },
      ],
    },
    {
      title: 'Resources',
      icon: (
        <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
          <path d="M12 6v6l3 3" />
        </svg>
      ),
      links: [
        { label: 'FAQ', href: '/faq' },
        { label: 'Contact', href: '/contact' },
        { label: 'Support', href: '/support' },
      ],
    },
    {
      title: 'Legal',
      icon: (
        <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22c4-2 8-4 8-10V5l-8-3-8 3v7c0 6 4 8 8 10Z" />
        </svg>
      ),
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Use', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-white via-[#f4f6ff] to-[#e7eefc] text-[#1f2937]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-48 w-48 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-indigo-300/20 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-16 lg:px-[10%]">
        {/* Top Section */}
        <div className="fade-in opacity-0 translate-y-4 transition-all duration-500">
          <div className="flex flex-col items-center gap-6 rounded-3xl bg-white/80 p-8 text-center shadow-xl shadow-blue-900/5 ring-1 ring-white/60 backdrop-blur">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-700 ring-1 ring-blue-100">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v3" />
                <path d="M6.6 6.6 4.5 4.5" />
                <path d="M3 12h3" />
                <path d="M6.6 17.4 4.5 19.5" />
                <path d="M12 18v3" />
                <path d="M17.4 17.4 19.5 19.5" />
                <path d="M18 12h3" />
                <path d="M17.4 6.6 19.5 4.5" />
                <path d="M12 8a4 4 0 1 0 4 4" />
              </svg>
              Fresh update
            </span>
            <div className="flex flex-col items-center gap-3">
              <div className="inline-flex items-center gap-3 rounded-full bg-white/70 px-5 py-2 text-blue-600 shadow-sm ring-1 ring-blue-100">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Free Resume Online</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Build a standout resume in minutes
              </h2>
              <p className="max-w-2xl text-base text-gray-600">
                Craft tailored resumes with beautiful templates, instant export, and guidance for every section.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Link
                href="/builder"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Start building
                <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </Link>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 shadow-sm">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3 20 7l-8 4-8-4 8-4Z" />
                    <path d="M4 15l8 4 8-4" />
                    <path d="M4 11l8 4 8-4" />
                  </svg>
                </div>
                <span className="max-w-[200px] text-left">No login, unlimited downloads, always free.</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-[#4b5563] shadow-sm ring-1 ring-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50 hover:text-blue-600"
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden="true" />
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="fade-in opacity-0 translate-y-4 transition-all duration-500 mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {linkGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-4 rounded-2xl bg-white/60 p-6 shadow-lg shadow-blue-900/5 ring-1 ring-white/70 backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  {group.icon}
                </span>
                <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-gray-900">
                  {group.title}
                </h3>
              </div>
              <ul className="space-y-3 text-sm">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 text-[#4B5563] transition-colors duration-150 hover:text-blue-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    >
                      <span className="h-1 w-1 rounded-full bg-blue-500" aria-hidden="true" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>
    </footer>
  );
};
