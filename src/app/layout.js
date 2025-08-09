import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Techinal Test - HoyTrabajas",
  description:
    "This is a technical test for HoyTrabajas was created by Jeison Leon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={inter.className}>
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}