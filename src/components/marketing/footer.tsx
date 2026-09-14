"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 bg-[#060606] text-[#f0f0f0] border-t border-white/10 pt-24 pb-16 px-6 md:px-16">
      <div className="mx-auto max-w-6xl">
        {/* Upper Statement */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-16 border-b border-white/10">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4 text-primary font-mono text-xs tracking-[0.25em] uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              <span>TripSpree Private Travel</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight mb-4">
              &ldquo;Travel is not an escape. It is an awakening.&rdquo;
            </h3>
            <p className="font-sans text-sm text-[#a0a0a0] leading-relaxed">
              Curated private journeys, architectural sanctuaries, and quiet cultural access across five continents.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end">
            <span className="font-mono text-xs text-[#a0a0a0] mb-2 uppercase tracking-wider">
              Curatorial Inquiries
            </span>
            <a
              href="mailto:concierge@tripspree.com"
              className="font-serif text-xl text-white hover:text-primary transition-colors underline underline-offset-4"
            >
              concierge@tripspree.com
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-16 border-b border-white/10 text-sm">
          <div>
            <span className="font-mono text-xs tracking-wider uppercase text-white/50 block mb-4">
              Platform
            </span>
            <ul className="space-y-2.5 text-[#a0a0a0]">
              <li>
                <Link href="/#manifesto" className="hover:text-white transition-colors">
                  Our Philosophy
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-white transition-colors">
                  Curator&apos;s Journal
                </Link>
              </li>
              <li>
                <Link href="/designer" className="hover:text-white transition-colors">
                  Trip Designer
                </Link>
              </li>
              <li>
                <Link href="/today" className="hover:text-white transition-colors">
                  Today View
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-mono text-xs tracking-wider uppercase text-white/50 block mb-4">
              Curations
            </span>
            <ul className="space-y-2.5 text-[#a0a0a0]">
              <li>
                <span className="text-[#a0a0a0]">Kyoto Zen Estates</span>
              </li>
              <li>
                <span className="text-[#a0a0a0]">Amalfi Maritime Villas</span>
              </li>
              <li>
                <span className="text-[#a0a0a0]">Nordic Fjord Preserves</span>
              </li>
              <li>
                <span className="text-[#a0a0a0]">Moroccan Desert Sanctuaries</span>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-mono text-xs tracking-wider uppercase text-white/50 block mb-4">
              Standard
            </span>
            <ul className="space-y-2.5 text-[#a0a0a0]">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-chart-1" />
                <span>Verified Provenance</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-chart-2" />
                <span>Team-Vetted Access</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-chart-3" />
                <span>Encrypted Itineraries</span>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-mono text-xs tracking-wider uppercase text-white/50 block mb-4">
              Provenance
            </span>
            <p className="font-sans text-xs text-[#a0a0a0] leading-relaxed">
              Every route in TripSpree has been personally traversed by a curator. No algorithmic aggregations.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-[#747474]">
          <span>© 2026 TripSpree. All rights reserved.</span>
          <div className="flex items-center space-x-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Charter</span>
            <span className="hover:text-white cursor-pointer transition-colors">Patron Agreement</span>
            <span className="hover:text-white cursor-pointer transition-colors">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}