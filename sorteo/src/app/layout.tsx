import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { plusJakartaSans } from "./asstes/fonts";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Sorteo Promocional",
  description: "Sorteo apra clientes de marca automotriz.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.className}`}
      >
        {children}
      </body>
    </html>
  );
}
