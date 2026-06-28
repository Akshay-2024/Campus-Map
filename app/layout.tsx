import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--hanken",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kariavattom Campus Navigator",
  description: "University of Kerala — Campus Map",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={hanken.variable}>
      <body style={{ fontFamily: "var(--hanken), system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
