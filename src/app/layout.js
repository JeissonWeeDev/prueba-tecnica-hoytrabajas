import { Inter } from "next/font/google";

// Styles
import "./globals.css";

// Here i declare the Inter font from Google Fonts
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
      <body>{children}</body>
    </html>
  );
}
