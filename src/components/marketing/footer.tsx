"use client";

import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative bg-[#091b20] text-white border-t border-white/10 overflow-hidden">
      {/* Top Panoramic Landscape Illustration */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
        <Image
          src="/images/footer/footer-illustration.webp"
          alt="Atmospheric panoramic mountain and lake landscape illustration"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark Gradients to seamlessly blend with the footer content */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#091b20] via-transparent to-[#091b20]" />
        <div className="absolute inset-0 bg-[#091b20]/30" />

        {/* Centered Monogram & Statement on the Illustration */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#091b20]/80 border border-white/20 backdrop-blur-md mb-4 shadow-xl">
            <svg
              className="h-6 w-6 text-chart-1 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 17.205L13.6095 13.6996C12.4133 12.9782 11.6823 11.6852 11.6823 10.2906L11.6823 9.70778C11.6823 8.31409 12.4124 7.02172 13.6074 6.30002C15.3397 5.25382 20 2.82159 20 2.82159L20 7.68382L16.3212 9.34147C16.0543 9.46172 15.8827 9.72688 15.8827 10.0191C15.8828 10.3084 16.051 10.5714 16.314 10.6933L20 12.4016L20 17.205Z" />
              <path d="M6.2872e-07 17.205L6.39049 13.6996C7.5867 12.9782 8.31769 11.6852 8.31769 10.2906L8.31769 9.70778C8.31769 8.31409 7.5876 7.02172 6.3926 6.30002C4.66027 5.25382 0 2.82159 0 2.82159L2.12535e-07 7.68382L3.67879 9.34147C3.94569 9.46172 4.11726 9.72688 4.11726 10.0191C4.11724 10.3084 3.94899 10.5714 3.68602 10.6933L4.18757e-07 12.4016L6.2872e-07 17.205Z" />
              <path d="M17.1936 0L13.6802 6.37594C12.9571 7.56942 11.6612 8.29875 10.2634 8.29876H9.67924C8.28237 8.29875 6.98705 7.57032 6.26371 6.37805C5.21512 4.64966 2.77734 0 2.77734 0H7.65067L9.31209 3.67042C9.43262 3.9367 9.69839 4.10788 9.99123 4.10788C10.2812 4.10787 10.5448 3.94 10.667 3.67763L12.3792 0H17.1936Z" />
              <path d="M2.75172 20L6.26513 13.6241C6.98819 12.4306 8.28413 11.7012 9.68189 11.7012L10.2661 11.7012C11.6629 11.7012 12.9583 12.4297 13.6816 13.622C14.7302 15.3503 17.168 20 17.168 20L12.2946 20L10.6332 16.3296C10.5127 16.0633 10.2469 15.8921 9.95408 15.8921C9.66412 15.8921 9.4005 16.06 9.27835 16.3224L7.56607 20L2.75172 20Z" />
            </svg>
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
            <span className="font-sans text-base font-bold text-white tracking-tight block">
              TripSpree Atelier
            </span>
            <p className="text-white/60 leading-relaxed font-light max-w-sm">
              India&apos;s first autonomous travel intelligence platform. Architecting unhurried journeys of stillness, rare access, and architectural pedigree.
            </p>
            <div className="pt-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-chart-1 block mb-1">
                Private Inquiries & Passcodes
              </span>
              <a
                href="mailto:concierge@tripspree.com"
                className="font-serif text-sm text-white hover:text-chart-1 transition-colors underline underline-offset-4"
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
                <a href="#retreats" className="hover:text-chart-1 transition-colors flex items-center gap-1.5">
                  <span className="text-white/30">+</span>
                  <span>Sanctuaries</span>
                </a>
              </li>
              <li>
                <a href="#combine" className="hover:text-chart-1 transition-colors flex items-center gap-1.5">
                  <span className="text-white/30">+</span>
                  <span>Combine</span>
                </a>
              </li>
              <li>
                <a href="#destination" className="hover:text-chart-1 transition-colors flex items-center gap-1.5">
                  <span className="text-white/30">+</span>
                  <span>Destinations</span>
                </a>
              </li>
              <li>
                <a href="#specialists" className="hover:text-chart-1 transition-colors flex items-center gap-1.5">
                  <span className="text-white/30">+</span>
                  <span>Specialists</span>
                </a>
              </li>
              <li>
                <Link href="/journal" className="hover:text-chart-1 transition-colors flex items-center gap-1.5">
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
                <span className="text-chart-1">•</span>
                <span>Udaipur Palaces</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-chart-1">•</span>
                <span>Kerala Backwaters</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-chart-1">•</span>
                <span>Ladakh Stargazing</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-chart-1">•</span>
                <span>Positano Clifftop</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-chart-1">•</span>
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
                <span className="h-1.5 w-1.5 rounded-full bg-chart-1" />
                <span>Verified Provenance</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-chart-2" />
                <span>Specialist Vetted</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-chart-3" />
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