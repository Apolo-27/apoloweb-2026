'use client';

import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import ScrollRevealSection from "@/components/ScrollRevealSection";
import Header from "@/components/Header";
import SaveTheDateSection from "@/components/SaveTheDateSection";
import TimelineSection from "@/components/TimelineSection";
import SponsorsSection from "@/components/SponsorsSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import Footer from "@/components/Footer";

// Lazy load heavy WebGL components to avoid SSR issues and reduce initial bundle
const STEMSectionNew = dynamic(() => import("@/components/STEMSectionNew"), { ssr: false });

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <Header />
      <HeroSection />

      {/* Scroll Reveal Section - Immersive text animation */}
      <ScrollRevealSection />

      {/* Save the Date - Urgency */}
      <SaveTheDateSection />

      {/* Sections with Meteors Background */}
      <div className="relative overflow-hidden">
        <div className="relative z-10">
          {/* Mission Timeline */}
          <TimelineSection />

          {/* STEM Impact - Educational CTA with CircularGallery */}
          <STEMSectionNew />

          {/* Sponsors - Who supports us */}
          <SponsorsSection />

          {/* Social Proof - Social Media */}
          <SocialMediaSection />
        </div>
      </div>

      {/* Footer with Globe */}
      <Footer />
    </main>
  );
}
