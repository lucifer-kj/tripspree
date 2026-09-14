"use client";

import { useEffect, useState } from "react";
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
          ? "bg-[#091b20]/95 backdrop-blur-md border-b border-white/10 text-white shadow-lg"
          : "bg-transparent text-white"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Vita Style Cross Star Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 border border-white/15 group-hover:border-white/30 transition-colors">
            <svg
              className="h-5 w-5 text-white fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 17.205L13.6095 13.6996C12.4133 12.9782 11.6823 11.6852 11.6823 10.2906L11.6823 9.70778C11.6823 8.31409 12.4124 7.02172 13.6074 6.30002C15.3397 5.25382 20 2.82159 20 2.82159L20 7.68382L16.3212 9.34147C16.0543 9.46172 15.8827 9.72688 15.8827 10.0191C15.8828 10.3084 16.051 10.5714 16.314 10.6933L20 12.4016L20 17.205Z" />
              <path d="M6.2872e-07 17.205L6.39049 13.6996C7.5867 12.9782 8.31769 11.6852 8.31769 10.2906L8.31769 9.70778C8.31769 8.31409 7.5876 7.02172 6.3926 6.30002C4.66027 5.25382 0 2.82159 0 2.82159L2.12535e-07 7.68382L3.67879 9.34147C3.94569 9.46172 4.11726 9.72688 4.11726 10.0191C4.11724 10.3084 3.94899 10.5714 3.68602 10.6933L4.18757e-07 12.4016L6.2872e-07 17.205Z" />
              <path d="M17.1936 0L13.6802 6.37594C12.9571 7.56942 11.6612 8.29875 10.2634 8.29876H9.67924C8.28237 8.29875 6.98705 7.57032 6.26371 6.37805C5.21512 4.64966 2.77734 0 2.77734 0H7.65067L9.31209 3.67042C9.43262 3.9367 9.69839 4.10788 9.99123 4.10788C10.2812 4.10787 10.5448 3.94 10.667 3.67763L12.3792 0H17.1936Z" />
              <path d="M2.75172 20L6.26513 13.6241C6.98819 12.4306 8.28413 11.7012 9.68189 11.7012L10.2661 11.7012C11.6629 11.7012 12.9583 12.4297 13.6816 13.622C14.7302 15.3503 17.168 20 17.168 20L12.2946 20L10.6332 16.3296C10.5127 16.0633 10.2469 15.8921 9.95408 15.8921C9.66412 15.8921 9.4005 16.06 9.27835 16.3224L7.56607 20L2.75172 20Z" />
            </svg>
          </div>
          <span className="font-sans text-xl font-bold tracking-tight text-white">
            TripSpree
          </span>
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
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-chart-1 px-5 py-2.5 text-xs font-sans font-semibold text-[#0D2E37] hover:bg-white transition-all shadow-md cursor-pointer group"
          >
            <span>Explore Sanctuaries</span>
            <svg
              className="h-2.5 w-2.5 fill-[#0D2E37] transition-transform group-hover:rotate-45 duration-300"
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
            className="md:hidden border-b border-white/10 bg-[#091b20] px-6 py-6 space-y-4"
          >
            <nav className="flex flex-col space-y-3 text-sm font-sans text-white">
              <Link
                href="/#retreats"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1 hover:text-chart-1 transition-colors flex items-center gap-2"
              >
                <span className="text-white/40">+</span>
                <span>Sanctuaries</span>
              </Link>
              <Link
                href="/#combine"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1 hover:text-chart-1 transition-colors flex items-center gap-2"
              >
                <span className="text-white/40">+</span>
                <span>Combine Journey</span>
              </Link>
              <Link
                href="/#destination"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1 hover:text-chart-1 transition-colors flex items-center gap-2"
              >
                <span className="text-white/40">+</span>
                <span>Destinations</span>
              </Link>
              <Link
                href="/#specialists"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1 hover:text-chart-1 transition-colors flex items-center gap-2"
              >
                <span className="text-white/40">+</span>
                <span>Specialists</span>
              </Link>
              <Link
                href="/journal"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1 hover:text-chart-1 transition-colors flex items-center gap-2"
              >
                <span className="text-white/40">+</span>
                <span>Journal</span>
              </Link>
              <Link
                href="/designer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1 text-chart-1 font-semibold flex items-center gap-2"
              >
                <span className="text-chart-1/40">+</span>
                <span>Trip Designer Studio</span>
              </Link>
            </nav>

            <div className="pt-4 border-t border-white/10">
              <a
                href="#retreats"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full rounded-full bg-chart-1 text-[#0D2E37] text-xs py-3 font-semibold flex items-center justify-center gap-2"
              >
                <span>Explore Sanctuaries</span>
                <svg className="h-2.5 w-2.5 fill-[#0D2E37]" viewBox="0 0 8 8">
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