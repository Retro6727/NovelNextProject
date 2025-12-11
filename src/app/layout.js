import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Novel Solutions - Premium B2B Manufacturing Solutions | GeM Certified",
  description: "Novel Solutions is a GeM-registered B2B e-commerce platform offering high-quality manufacturing products at consistent prices. Trusted by businesses across India.",
  keywords: "B2B manufacturing, industrial products, GeM vendor, manufacturing supplies",
  image: "/public/images/companylogo.jpg",
  openGraph: {
    title: "Novel Solutions - Premium B2B Manufacturing Solutions",
    description: "GeM-certified B2B manufacturer delivering high-quality products at consistent prices",
    url: "https://novelsolutions.com",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
