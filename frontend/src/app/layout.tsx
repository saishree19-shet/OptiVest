import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OptiVest - Smart Portfolio Planning",
  description: "Enterprise-grade wealth management and portfolio optimization powered by Dynamic Programming for Modern Indian Investors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
