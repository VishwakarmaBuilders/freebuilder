import "globals.css";
import { TopNavBar } from "components/TopNavBar";
import { Footer } from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Free Resume Online - Create a Professional Resume Instantly",
  description:
    "Free Resume Online is a simple and free resume builder that helps you create a professional and ATS-friendly resume in minutes. Build, edit, and download your resume easily without any login or hidden fees.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TopNavBar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
