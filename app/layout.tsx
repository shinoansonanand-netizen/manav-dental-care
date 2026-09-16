import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FixedMobileCTA from "@/components/FixedMobileCTA";
import { CLINIC_CONFIG } from "@/lib/clinic-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0b2545",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://manavdentalcare.com"),
  title: {
    default: "Manav Dental Care | Advanced Dental Clinic in Padur, OMR Chennai",
    template: "%s | Manav Dental Care Padur"
  },
  description: "Experience premium, gentle dental care at Manav Dental Care in Padur, OMR, Chennai. Led by Dr. Vallabh Mahadevan for root canal therapy, dental implants, braces & family dentistry.",
  keywords: [
    "Manav Dental Care",
    "Dentist in Padur",
    "Dental Clinic in Padur",
    "Dentist OMR",
    "Dental Clinic OMR Chennai",
    "Dr. Vallabh Mahadevan",
    "Root canal treatment Padur",
    "Dental implants OMR",
    "Braces and aligners Chennai"
  ],
  authors: [{ name: "Dr. Vallabh Mahadevan" }],
  creator: "Manav Dental Care",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://manavdentalcare.com",
    siteName: "Manav Dental Care",
    title: "Manav Dental Care | Advanced Dental Clinic in Padur, OMR Chennai",
    description: "Premium, patient-focused dental practice in Padur, OMR. Book your consultation with Dr. Vallabh Mahadevan.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Manav Dental Care Clinic Padur OMR"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Manav Dental Care | Advanced Dental Clinic in Padur, OMR Chennai",
    description: "Gentle, evidence-based dentistry in Padur, OMR. Root canal, dental implants, aligners & preventive care.",
    images: ["https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": CLINIC_CONFIG.name,
    "image": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200",
    "telephone": CLINIC_CONFIG.contact.primaryPhone,
    "email": CLINIC_CONFIG.contact.email,
    "url": "https://manavdentalcare.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": CLINIC_CONFIG.address.line1,
      "addressLocality": "Padur, OMR",
      "addressRegion": "Tamil Nadu",
      "postalCode": CLINIC_CONFIG.address.pincode,
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "12.8032",
      "longitude": "80.2186"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:30",
        "closes": "20:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "10:00",
        "closes": "13:30"
      }
    ],
    "medicalSpecialty": [
      "Dentistry",
      "Endodontics",
      "Prosthodontics",
      "Orthodontics",
      "Pediatric Dentistry"
    ]
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900 pb-16 md:pb-0">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FixedMobileCTA />
      </body>
    </html>
  );
}
