import type { Metadata } from "next";
import { Elsie, Homemade_Apple, Karla } from "next/font/google";
import ReceiptNav from "@/components/nav/ReceiptNav";
import "./globals.css";

const elsie = Elsie({
  variable: "--font-elsie",
  subsets: ["latin"],
  weight: ["400", "900"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const homemadeApple = Homemade_Apple({
  variable: "--font-homemade-apple",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "mayfira",
  description: "fiona's personal supermarket-themed corner of the internet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${elsie.variable} ${karla.variable} ${homemadeApple.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <ReceiptNav />
      </body>
    </html>
  );
}
