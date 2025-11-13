import { Hero } from "home/Hero";
import { Steps } from "home/Steps";
import { Testimonials } from "home/Testimonials";
import { Features } from "home/Features";

export default function Home() {
  return (
    <main className="mx-auto max-w-screen-2xl bg-dot px-4 sm:px-6 lg:px-8 text-gray-900 overflow-x-hidden">
      <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-10">
        <Hero />
        <Steps />
        <Testimonials />
        <Features />
      </div>
    </main>
  );
}
