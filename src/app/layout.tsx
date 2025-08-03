import "../styles/globals.css";
import "../styles/editor.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/lib/provider";
import { ThemeProvider } from "@/components/ThemeProvider";
import Layout from "@/components/Layout";
import { Toaster } from 'react-hot-toast';


const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});


export const metadata: Metadata = {

  title: "Management Click Usaha",

  description:

      " Discover a world of comfort and elegance. Indulge in the epitome of luxury living with classic modern townhouses at Savoy Residences in Bintaro, South Jakarta.",
    
  icons: [
    {
      rel: "icon",
      type: "image/x-icon",
      sizes: "32x32",
      url: "/favicon.ico",
      
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/apple-touch-icon.png",
    },
    
  ],
  keywords:
    "Savoy Residences, exclusive housing, property, modern residence, minimalist house, premium house, Indonesian real estate, strategic housing in Bintaro, South Jakarta Housing",
  openGraph: {
    title: "Savoy Residences",
    description:
      "Savoy Residences, exclusive housing, property, modern residence, minimalist house, premium house, Indonesian real estate, strategic housing in Bintaro, South Jakarta Housing.",
    url: "https://www.savoyresidences.id",
    siteName: "Savoy Residences",
    images: [
      {
        url: "https://savoyresidences.id/og-image.png", // ganti jika ada gambar OG khusus Savoy
        width: 1200,
        height: 630,
        alt: "Savoy Residences - Hunian Modern Eksklusif",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Savoy Residences",
    description:
      "Modern and exclusive residence in a strategic location. Find comfort and premium lifestyle with Savoy Residences.",
    images: ["https://savoyresidences.id/og-image2.png"], // ganti jika ada gambar Twitter khusus Savoy
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      {/* 👆 suppressHydrationWarning membantu Next menghindari warning */}
      <body className={`${geistSans.variable} ${geistMono.variable} w-full`}>
        <Providers>
          <ThemeProvider>
             <Toaster position="bottom-right" />
            <Layout>
              {children}
            </Layout>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
