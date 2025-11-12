import Image from "next/image";
import heartSrc from "public/assets/heart.svg";

type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Students often struggle with resume formatting — inconsistent spacing, fonts, and bullet styles. Free Resume Online fixes all that automatically and makes resumes look clean and professional.",
    name: "Ms. Spiegel",
    title: "Career Advisor",
    company: "Stanford University",
  },
  {
    quote:
      "I built my resume using Free Resume Online and landed interviews at companies like Google and Amazon. The templates are simple yet perfectly optimized for ATS systems.",
    name: "Santiago",
    title: "Software Engineer",
    company: "Google",
  },
  {
    quote:
      "Free Resume Online made resume creation so easy! I finished my entire professional resume in minutes — no more struggling with Word templates or messy formatting.",
    name: "Vivian",
    title: "Product Manager",
    company: "Microsoft",
  },
];

const TestimonialCard = ({
  quote,
  name,
  title,
  company,
  isActive = false,
}: Testimonial & { isActive?: boolean }) => (
  <div
    className={`relative overflow-hidden rounded-2xl border border-white/50 bg-white/80 p-8 shadow-[0_18px_40px_-18px_rgba(30,64,175,0.35)] backdrop-blur transition-all duration-300 ${
      isActive
        ? "scale-[1.03] border-blue-200 shadow-blue-500/30"
        : "md:opacity-85"
    }`}
  >
    <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-100 opacity-50 blur-3xl" />
    <div className="flex items-start gap-4">
      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-lg font-semibold text-white shadow-lg shadow-blue-500/25">
        {name.charAt(0)}
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-blue-500">“</span>
          Real Stories
        </div>
        <p className="text-base leading-relaxed text-slate-600">“{quote}”</p>
        <div className="flex items-center gap-2 text-amber-400">
          {Array.from({ length: 5 }).map((_, starIdx) => (
            <svg
              key={starIdx}
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2 14.9 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 9.1 8.26 12 2Z" />
            </svg>
          ))}
        </div>
        <div>
          <div className="text-lg font-semibold text-slate-900">{name}</div>
          <div className="text-sm font-medium text-slate-500">
            {title} • {company}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const Testimonials = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f5f7ff] via-white to-white py-6 sm:py-8 md:py-10 lg:py-10">
      <div className="pointer-events-none absolute inset-x-0 top-[-20%] h-[400px] bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.12),_transparent_60%)]" />
      <div className="pointer-events-none absolute inset-y-0 left-[-10%] hidden h-full w-[45%] rounded-full bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.12),_transparent_60%)] blur-3xl md:block" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading Section */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14">
          <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-blue-600">
            Testimonials
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:mt-6 sm:text-4xl md:text-5xl">
            Hiring teams love resumes built with Free Resume Online
          </h2>
          <p className="mt-3 text-base text-slate-500 sm:mt-4 sm:text-lg">
            Hear from real users who've landed interviews faster by using our
            polished templates and ATS-friendly formatting.
          </p>
        </div>

        {/* Testimonials Section */}
        <div className="relative mt-10 sm:mt-12">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-1/2 w-1/2 rounded-full bg-blue-100/50 blur-3xl" />
          </div>

          <div className="relative grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={index}
                className={`transform transition-all duration-500 ${
                  index === 1 ? "md:-translate-y-4" : "md:translate-y-2"
                }`}
              >
                <TestimonialCard {...testimonial} isActive={index === 1} />
              </div>
            ))}
          </div>

          {/* Dots Navigation */}
          <div className="mt-10 flex justify-center gap-2 sm:mt-12">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === 1 ? "w-12 bg-gradient-to-r from-blue-500 to-indigo-500" : "w-4 bg-slate-300"
                }`}
                aria-label={`View testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Heart Section (optional visual element) */}
        <div className="mt-12 flex justify-center sm:mt-14">
          <div className="flex items-center gap-3 rounded-full bg-white/70 px-5 py-2 text-xs font-medium text-slate-600 shadow-[0_12px_30px_-22px_rgba(59,130,246,0.5)] ring-1 ring-white/60 sm:text-sm">
            <Image src={heartSrc} alt="heart" width={20} height={20} className="sm:h-6 sm:w-6" />
            <span>
              Trusted by over <span className="font-semibold text-blue-600">40k+</span> job seekers
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
