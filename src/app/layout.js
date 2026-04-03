import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "සිංහල AI Chatbot | Modern Sinhala Assistant",
  description: "A fast, smart, and beautiful AI assistant that understands and speaks Sinhala.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="si" className={`${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
