import type { Metadata } from "next";
import { Montserrat, Inter, Poppins } from "next/font/google";
import "./globals.css";
import { RoleProvider } from "@/components/RoleContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GKF · Geoffrey Karema Foundation | Building with Purpose",
  description:
    "Empowering communities through sustainable development, innovative leadership, and accessible education by deploying scalable, technology-enabled frameworks. Brand System: Saffron & Noir (v1.0 Brand Book).",
  icons: {
    icon: "/images/gkf-logo-transparent.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FBFAF4] text-[#0B3D2E]">
        <RoleProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </RoleProvider>
      </body>
    </html>
  );
}
