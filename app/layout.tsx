import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Calculadora Sueldo Neto 2025",
    template: "%s | Calculadora Sueldo Neto 2025",
  },
  description: "Calculadora de sueldo neto anual y mensual para Espana con IRPF, Seguridad Social y desglose visual.",
  applicationName: "Calculadora Sueldo Neto 2025",
  authors: [{ name: "Cristian Chozas Diaz" }],
  creator: "Cristian Chozas Diaz",
  publisher: "Cristian Chozas Diaz",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    title: "Calculadora Sueldo Neto 2025",
    description:
      "Calculadora de sueldo neto anual y mensual para Espana con IRPF, Seguridad Social y desglose visual.",
    siteName: "Calculadora Sueldo Neto 2025",
  },
  twitter: {
    card: "summary",
    title: "Calculadora Sueldo Neto 2025",
    description:
      "Calculadora de sueldo neto anual y mensual para Espana con IRPF, Seguridad Social y desglose visual.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
