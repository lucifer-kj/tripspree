"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  isReducedMotion?: boolean;
  onToggleReducedMotion?: () => void;
}

export function Navbar({ isReducedMotion, onToggleReducedMotion }: NavbarProps = {}) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 60);
    });
  }, [scrollY]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-[#0c0717]/90 backdrop-blur-md border-b border-white/10 text-white shadow-lg"
          : "bg-transparent text-white"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Official TripSpree Brand Lockup */}
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="TripSpree Home">
          <div className="relative h-8 w-6 flex items-center justify-center shrink-0">
            <Image
              src="/images/brand/logo-mark.png"
              alt="TripSpree Monogram"
              width={24}
              height={36}
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
          <div className="relative h-5 w-28 flex items-center">
            <Image
              src="/images/brand/logo-wordmark-white.png"
              alt="TripSpree"
              width={112}
              height={28}
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation Links with Vita "+" markers */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-sans tracking-wide text-white/80">
          <Link
            href="/#retreats"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span className="text-white/40 text-xs">+</span>
            <span>Sanctuaries</span>
          </Link>
          <Link
            href="/#combine"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span className="text-white/40 text-xs">+</span>
            <span>Combine</span>
          </Link>
          <Link
            href="/#destination"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span className="text-white/40 text-xs">+</span>
            <span>Destinations</span>
          </Link>
          <Link
            href="/#specialists"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span className="text-white/40 text-xs">+</span>
            <span>Specialists</span>
          </Link>
          <Link
            href="/journal"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span className="text-white/40 text-xs">+</span>
            <span>Journal</span>
          </Link>
        </nav>

        {/* Right Action: Pill Button with Vita Star Icon & Accessible Motion Toggle */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {onToggleReducedMotion && (
            <button
              type="button"
              onClick={onToggleReducedMotion}
              className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 text-[10px] font-mono text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Toggle reduced motion preference"
              aria-label="Toggle reduced motion preference"
            >
              <span>{isReducedMotion ? "Motion: Off" : "Motion: On"}</span>
            </button>
          )}

          <a
            href="#retreats"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-sans font-semibold text-[#0c0717] hover:bg-white/90 transition-all shadow-md cursor-pointer group"
          >
            <span>Explore Sanctuaries</span>
            <svg
              className="h-2.5 w-2.5 fill-[#0c0717] transition-transform group-hover:rotate-45 duration-300"
              viewBox="0 0 8 8"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 0C8 0 7.32057 2.41553 7.32057 4C7.32057 5.58447 8 8 8 8C8 8 5.58447 7.32057 4 7.32057C2.41553 7.32057 0 8 0 8C0 8 0.679427 5.58447 0.679427 4C0.679427 2.41553 0 0 0 0C0 0 2.41553 0.679426 4 0.679426C5.58447 0.679426 8 0 8 0Z" />
            </svg>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-b border-white/10 bg-[#0c0717] px-6 py-6 space-y-4"
          >
            <nav className="flex flex-col space-y-3 text-sm font-sans text-white">
              <Link
                href="/#retreats"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1 hover:text-primary transition-colors flex items-center gap-2"
              >
                <span className="text-white/40">+</span>
                <span>Sanctuaries</span>
              </Link>
              <Link
                href="/#combine"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1 hover:text-primary transition-colors flex items-center gap-2"
              >
                <span className="text-white/40">+</span>
                <span>Combine Journey</span>
              </Link>
              <Link
                href="/#destination"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1 hover:text-primary transition-colors flex items-center gap-2"
              >
                <span className="text-white/40">+</span>
                <span>Destinations</span>
              </Link>
              <Link
                href="/#specialists"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1 hover:text-primary transition-colors flex items-center gap-2"
              >
                <span className="text-white/40">+</span>
                <span>Specialists</span>
              </Link>
              <Link
                href="/journal"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1 hover:text-primary transition-colors flex items-center gap-2"
              >
                <span className="text-white/40">+</span>
                <span>Journal</span>
              </Link>
              <Link
                href="/designer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1 text-primary font-semibold flex items-center gap-2"
              >
                <span className="text-primary/40">+</span>
                <span>Trip Designer Studio</span>
              </Link>
            </nav>

            <div className="pt-4 border-t border-white/10">
              <a
                href="#retreats"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full rounded-full bg-white text-[#0c0717] text-xs py-3 font-semibold flex items-center justify-center gap-2 shadow-md"
              >
                <span>Explore Sanctuaries</span>
                <svg className="h-2.5 w-2.5 fill-[#0c0717]" viewBox="0 0 8 8">
                  <path d="M8 0C8 0 7.32057 2.41553 7.32057 4C7.32057 5.58447 8 8 8 8C8 8 5.58447 7.32057 4 7.32057C2.41553 7.32057 0 8 0 8C0 8 0.679427 5.58447 0.679427 4C0.679427 2.41553 0 0 0 0C0 0 2.41553 0.679426 4 0.679426C5.58447 0.679426 8 0 8 0Z" />
                </svg>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}