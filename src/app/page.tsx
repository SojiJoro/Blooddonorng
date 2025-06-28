"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";
import LatestUpdatesSection from "@/components/LatestUpdatesSection";
import Footer from "@/components/Footer";

const HeroCanvas = dynamic(() => import("@/components/HeroCanvas"), { ssr: false });

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [0.3, 0]);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Base gradient - dark mode aware */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-black" />

      {/* Animated mesh gradient blobs */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 dark:opacity-30 animate-blob" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 dark:opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-40 left-40 w-80 h-80 bg-pink-300 dark:bg-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 dark:opacity-30 animate-blob animation-delay-4000" />
      </div>

      {/* Noise texture for depth */}
      <div
        className={`fixed inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)" opacity="0.02"/%3E%3C/svg%3E')] dark:opacity-[0.03]`}
      />

      {/* Grid pattern overlay - only in dark mode */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* 3D Canvas - hero section only with parallax */}
      {mounted && (
        <motion.div 
          className="fixed top-0 left-0 w-full h-screen pointer-events-none"
          style={{ opacity }}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-900 z-10" />
            <HeroCanvas className="opacity-50 dark:opacity-30" />
          </div>
        </motion.div>
      )}

      {/* Gradient accent line */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50" />

      {/* Main content */}
      <div className="relative z-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.3 }
            }
          }}
        >
          {/* Hero Section */}
          <motion.section
            variants={{ 
              hidden: { y: 20, opacity: 0 }, 
              visible: { y: 0, opacity: 1, transition: { duration: 0.8 } } 
            }}
            className="relative min-h-screen flex items-center justify-center px-4"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50 dark:to-gray-900/50" />
            <HeroSection />
          </motion.section>

          {/* Features Section */}
          <motion.section
            variants={{ 
              hidden: { y: 40, opacity: 0 }, 
              visible: { y: 0, opacity: 1, transition: { duration: 0.8 } } 
            }}
            className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent dark:from-gray-800/50" />
            <div className="relative z-10 py-24">
              <FeaturesSection />
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            variants={{ 
              hidden: { y: 40, opacity: 0 }, 
              visible: { y: 0, opacity: 1, transition: { duration: 0.8 } } 
            }}
            className="relative overflow-hidden"
          >
            {/* Gradient background for CTA */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)] dark:bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent)]" />
            <div className="relative z-10 py-24">
              <CTASection />
            </div>
          </motion.section>

          {/* Latest Updates Section */}
          <motion.section
            variants={{ 
              hidden: { y: 40, opacity: 0 }, 
              visible: { y: 0, opacity: 1, transition: { duration: 0.8 } } 
            }}
            className="relative bg-white dark:bg-gray-900"
          >
            <div className="py-24">
              <LatestUpdatesSection />
            </div>
          </motion.section>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer className="relative z-20 bg-gray-50 dark:bg-gray-950" />

      {/* Add styles */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
