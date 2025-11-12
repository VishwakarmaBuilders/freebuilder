import { Hero } from "home/Hero";
import { Steps } from "home/Steps";
import { Testimonials } from "home/Testimonials";
import { Features } from "home/Features";

export default function Home() {
  return (
    <main className="mx-auto max-w-screen-2xl bg-dot px-4 sm:px-6 lg:px-8 text-gray-900">
      <div className="space-y-16 sm:space-y-20 lg:space-y-28">
        <Hero />
        <Steps />
        <Testimonials />
        <Features />
      </div>
    </main>
  );
}
