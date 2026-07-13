import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";


const urbanist = Urbanist({
  variable: "--font-urbanist",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nebula",
  description: "Your universe for learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${urbanist.variable} h-full antialiased overflow-hidden`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden overscroll-none overflow-hidden">{children}</body>
    </html>
  );
}
