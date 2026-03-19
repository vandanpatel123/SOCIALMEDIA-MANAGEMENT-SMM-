import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { AppProvider } from "@/components/app-provider";
import { ToastCenter } from "@/components/toast-center";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "InstaFlow AI",
  description: "Modern SaaS dashboard for Instagram AI automation workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} [font-family:var(--font-manrope)] antialiased`}>
        <AppProvider>
          {children}
          <ToastCenter />
        </AppProvider>
      </body>
    </html>
  );
}
