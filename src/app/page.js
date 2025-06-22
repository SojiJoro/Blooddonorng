"use client";
import "./globals.css"; // Correct path for globals.css
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";
import LatestUpdatesSection from "@/components/LatestUpdatesSection";
import Footer from "@/components/Footer";
import 'leaflet/dist/leaflet.css'


// Dynamically load HeroCanvas (client-only) so that Three.js only loads on the client.
const HeroCanvas = dynamic(() => import("@/components/HeroCanvas"), { ssr: false });

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25, delayChildren: 0.25 },
  },
};

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <HeroCanvas />
      </div>

      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-red-800 via-pink-700 to-yellow-500 opacity-70 animate-gradient"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 2 }}
      ></motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <HeroSection />
        <FeaturesSection />
        <CTASection />
        <LatestUpdatesSection />
      </motion.div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
