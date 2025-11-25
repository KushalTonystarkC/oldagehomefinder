import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bestfit Healthcare Network - Find the Best Senior Care Community",
  description: "Your premier healthcare search engine, dedicated to helping you find the best and most comprehensive healthcare solutions in your area.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <Header />
      <body className={inter.className}>{children}</body> */}
      <body className={inter.className} style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header />
        <div style={{ flex: "1" }}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
