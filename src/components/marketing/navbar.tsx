"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  isReducedMotion?: boolean;
  onToggleReducedMotion?: () => void;
}

export function Navbar({}: NavbarProps = {}) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 80);
    });
  }, [scrollY]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-background/95 backdrop-blur-md border-b border-border text-foreground shadow-sm"
          : "bg-transparent text-white"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <span
            className={`font-serif text-2xl tracking-tight font-medium transition-colors ${
              isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"
            }`}
          >
            TripSpree
          </span>
          <span
            className={`hidden sm:inline-block font-mono text-[10px] tracking-[0.25em] uppercase border-l pl-3 transition-colors ${
              isScrolled || isMobileMenuOpen
                ? "text-muted-foreground border-border"
                : "text-white/60 border-white/20"
            }`}
          >
            Private Travel
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className={`hidden md:flex items-center space-x-8 text-sm tracking-wide transition-colors ${
            isScrolled ? "text-muted-foreground" : "text-white/80"
          }`}
        >
          <Link
            href="/#sanctuaries"
            className={`transition-colors ${
              isScrolled ? "hover:text-foreground" : "hover:text-white"
            }`}
          >
            Sanctuaries
          </Link>
          <Link
            href="/#manifesto"
            className={`transition-colors ${
              isScrolled ? "hover:text-foreground" : "hover:text-white"
            }`}
          >
            Philosophy
          </Link>
          <Link
            href="/quiz"
            className={`transition-colors ${
              isScrolled ? "hover:text-foreground" : "hover:text-white"
            }`}
          >
            Taste Quiz
          </Link>
          <Link
            href="/journal"
            className={`transition-colors ${
              isScrolled ? "hover:text-foreground" : "hover:text-white"
            }`}
          >
            Journal
          </Link>
          <Link
            href="/designer"
            className={`transition-colors ${
              isScrolled ? "hover:text-foreground" : "hover:text-white"
            }`}
          >
            Trip Designer
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          <Link href="/designer" className="hidden sm:block">
            <Button
              variant="default"
              size="sm"
              className="rounded-full bg-primary px-5 font-sans text-xs font-medium text-primary-foreground hover:bg-primary/90 shadow-sm cursor-pointer"
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Inquire
            </Button>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden flex h-10 w-10 items-center justify-center rounded-full border transition-colors cursor-pointer ${
              isScrolled || isMobileMenuOpen
                ? "border-border text-foreground hover:bg-muted"
                : "border-white/30 text-white hover:bg-white/10"
            }`}
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
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-border bg-background px-6 py-6 space-y-4"
          >
            <nav className="flex flex-col space-y-4 text-base font-sans text-foreground">
              <Link
                href="/#sanctuaries"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-primary transition-colors py-1"
              >
                Sanctuaries
              </Link>
              <Link
                href="/#manifesto"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-primary transition-colors py-1"
              >
                Philosophy
              </Link>
              <Link
                href="/quiz"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-primary transition-colors py-1 flex items-center justify-between"
              >
                <span>Taste Quiz</span>
                <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  Interactive
                </span>
              </Link>
              <Link
                href="/journal"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-primary transition-colors py-1"
              >
                Travel Journal
              </Link>
              <Link
                href="/designer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-primary transition-colors py-1 font-semibold text-primary"
              >
                Trip Designer Studio
              </Link>
              <Link
                href="/today"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-primary transition-colors py-1 text-muted-foreground"
              >
                Today View
              </Link>
              <Link
                href="/pre-departure"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-primary transition-colors py-1 text-muted-foreground"
              >
                Pre-Departure Hub
              </Link>
            </nav>

            <div className="pt-4 border-t border-border flex flex-col gap-2">
              <Link href="/designer" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant="default"
                  className="w-full rounded-full bg-primary text-primary-foreground text-xs py-3 font-medium"
                >
                  <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                  Plan with Elena Vance
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}