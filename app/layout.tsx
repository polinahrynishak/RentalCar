import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { TanStackProvider } from "@/components/TanStackProvider/TanStackProvider";
import { Header } from "@/components/Header/Header";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "RentalCar",
  description: "Reliable and budget-friendly rentals for any journey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${manrope.className} ${manrope.variable}`}
      >
        <TanStackProvider>
          <Header />
          <main>{children}</main>
        </TanStackProvider>
      </body>
    </html>
  );
}
