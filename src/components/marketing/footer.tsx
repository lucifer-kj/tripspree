"use client";

import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative bg-[#0c0717] text-white border-t border-white/10 overflow-hidden">
      {/* Top Panoramic Landscape Illustration */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
        <Image
          src="/images/footer/footer-illustration.webp"
          alt="Atmospheric panoramic mountain and lake landscape illustration"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark Purple Gradients to blend into footer content */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0717] via-transparent to-[#0c0717]" />
        <div className="absolute inset-0 bg-[#0c0717]/40" />

        {/* Centered Official Brand Monogram & Statement on the Illustration */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0c0717]/80 border border-white/20 backdrop-blur-md mb-4 shadow-xl p-2">
            <Image
              src="/images/brand/logo.png"
              alt="TripSpree Logo Monogram"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-tight max-w-xl">
            &ldquo;Travel is not an escape. It is an awakening.&rdquo;
          </h3>
          <p className="font-sans text-xs sm:text-sm text-white/70 mt-2 font-light">
            TripSpree Private Atelier • Autonomous Orchestration & Curated Stays
          </p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-white/10 text-xs font-sans">
          {/* Col 1: Brand & Concierge Desk */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="relative h-8 w-8 shrink-0">
                <Image
                  src="/images/brand/logo.png"
                  alt="TripSpree Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="font-serif text-lg font-bold text-white tracking-tight">
                TripSpree
              </span>
            </div>
            <p className="text-white/60 leading-relaxed font-light max-w-sm">
              India&apos;s first autonomous travel intelligence platform. Architecting unhurried journeys of stillness, rare access, and architectural pedigree.
            </p>
            <div className="pt-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#a855f7] block mb-1">
                Private Inquiries & Passcodes
              </span>
              <a
                href="mailto:concierge@tripspree.com"
                className="font-serif text-sm text-white hover:text-primary transition-colors underline underline-offset-4"
              >
                concierge@tripspree.com
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 block">
              Platform
            </span>
            <ul className="space-y-2 text-white/70">
              <li>
                <a href="#retreats" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="text-white/30">+</span>
                  <span>Sanctuaries</span>
                </a>
              </li>
              <li>
                <a href="#combine" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="text-white/30">+</span>
                  <span>Combine</span>
                </a>
              </li>
              <li>
                <a href="#destination" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="text-white/30">+</span>
                  <span>Destinations</span>
                </a>
              </li>
              <li>
                <a href="#specialists" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="text-white/30">+</span>
                  <span>Specialists</span>
                </a>
              </li>
              <li>
                <Link href="/journal" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="text-white/30">+</span>
                  <span>Journal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Real-Time Corridors */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 block">
              Corridors
            </span>
            <ul className="space-y-2 text-white/70">
              <li className="flex items-center gap-1.5">
                <span className="text-[#a855f7]">•</span>
                <span>Udaipur Palaces</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[#38bdf8]">•</span>
                <span>Kerala Backwaters</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[#f97316]">•</span>
                <span>Ladakh Stargazing</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[#a855f7]">•</span>
                <span>Positano Clifftop</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[#38bdf8]">•</span>
                <span>Engadin Chalets</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Atelier Trust Standards */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 block">
              Assurance
            </span>
            <ul className="space-y-2 text-white/70">
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Verified Provenance</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8]" />
                <span>Specialist Vetted</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
                <span>Zero Tourist Noise</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                <span>Encrypted Dossiers</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono text-white/40">
          <span>© 2026 TripSpree Atelier Ltd. All rights reserved.</span>
          <div className="flex items-center space-x-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Charter</span>
            <span className="hover:text-white cursor-pointer transition-colors">Member Terms</span>
            <span className="hover:text-white cursor-pointer transition-colors">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}