"use client";
import dynamic from "next/dynamic";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";
import LatestUpdatesSection from "@/components/LatestUpdatesSection";
import Footer from "@/components/Footer";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
});

export default function AboutPage() {
  return (
    <div className="space-y-16">
      <section className="relative py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">About Blood Donor NG</h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-300">
          Blood Donor NG connects willing donors with hospitals and recipients across Nigeria.
          Our mission is to make blood donation faster, safer and more accessible.
        </p>
      </section>

      <StatsSection />

      <section className="container mx-auto text-center space-y-6">
        <h2 className="text-3xl font-bold">Find Donation Centers Near You</h2>
        <MapComponent height="500px" />
      </section>

      <LatestUpdatesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
