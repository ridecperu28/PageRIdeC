import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/theme.css";
import "@/styles/components.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RIdeC — Red Iberoamericana de Ciencias",
  description:
    "Red de estudiantes y profesionales que impulsa las ciencias básicas, reduce la deserción y genera comunidad en Iberoamérica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-[family-name:var(--font-body)]">{children}</body>
    </html>
  );
}
