import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "PIGE IMMO — CRM Immobilier pour Agents IAD",
  description: "Plateforme CRM de prospection immobilière avec IA. Scraping multi-plateforme, pipeline de leads, cockpit omnicanal et Live Radar.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
