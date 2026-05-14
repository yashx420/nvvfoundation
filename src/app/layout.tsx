import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  title: "National Videsh Vidya Foundation — Study Medicine Abroad",
  description:
    "An admissions advisory for Indian students pursuing MBBS and post-graduate medicine in Georgia, Uzbekistan, and beyond.",
  keywords:
    "MBBS Georgia, MBBS Uzbekistan, study medicine abroad, NMC approved universities, NVVF, FMGE preparation",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
        <SmoothScroll>
          <ScrollProgress />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
