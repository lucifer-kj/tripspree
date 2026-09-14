"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  isReducedMotion?: boolean;
  onToggleReducedMotion?: () => void;
}

export function Navbar({}: NavbarProps = {}) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 80);
    });
  }, [scrollY]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border text-foreground shadow-sm"
          : "bg-transparent text-white"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <span
            className={`font-serif text-2xl tracking-tight font-medium transition-colors ${
              isScrolled ? "text-foreground" : "text-white"
            }`}
          >
            TripSpree
          </span>
          <span
            className={`hidden sm:inline-block font-mono text-[10px] tracking-[0.25em] uppercase border-l pl-3 transition-colors ${
              isScrolled
                ? "text-muted-foreground border-border"
                : "text-white/60 border-white/20"
            }`}
          >
            Private Travel
          </span>
        </Link>

        {/* Navigation Links */}
        <nav
          className={`hidden md:flex items-center space-x-8 text-sm tracking-wide transition-colors ${
            isScrolled ? "text-muted-foreground" : "text-white/80"
          }`}
        >
          <a
            href="#sanctuaries"
            className={`transition-colors ${
              isScrolled ? "hover:text-foreground" : "hover:text-white"
            }`}
          >
            Sanctuaries
          </a>
          <a
            href="#manifesto"
            className={`transition-colors ${
              isScrolled ? "hover:text-foreground" : "hover:text-white"
            }`}
          >
            Philosophy
          </a>
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
        <div className="flex items-center space-x-4">
          <Link href="/designer">
            <Button
              variant="default"
              size="sm"
              className="rounded-full bg-primary px-5 font-sans text-xs font-medium text-primary-foreground hover:bg-primary/90 shadow-sm cursor-pointer"
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Inquire
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}