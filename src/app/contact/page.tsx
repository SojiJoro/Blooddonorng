"use client";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Map = dynamic(() => import("@/components/map"), { ssr: false });
const TwitterFeed = dynamic(() => import("@/components/TwitterFeed"), { ssr: false });

export default function ContactPage() {
  const center = { lat: 6.5244, lng: 3.3792 };
  const markers: { id: number; position: { lat: number; lng: number } }[] = [];

  return (
    <div className="space-y-16">
      <Header />
      <section className="container mx-auto space-y-6 py-8">
        <h1 className="text-3xl font-bold">Get in Touch</h1>
        <p className="text-gray-600">Reach out to us or visit our nearest donation center.</p>
        <Map center={center} markers={markers} />
      </section>
      <section className="container mx-auto py-8">
        <TwitterFeed />
      </section>
      <CTASection />
      <Footer />
    </div>
  );
}
