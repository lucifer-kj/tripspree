import type { Metadata } from "next";
import { Montserrat, Lora, IBM_Plex_Mono } from "next/font/google";
import "@/styles/globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://tripspree-prod.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "TripSpree — Curated Private Travel & Sanctuaries",
  description: "Travel is not an escape. It is an awakening.",
  openGraph: {
    title: "TripSpree — Curated Private Travel & Sanctuaries",
    description: "Travel is not an escape. It is an awakening.",
    url: siteUrl,
    siteName: "TripSpree",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${lora.variable} ${ibmPlexMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}