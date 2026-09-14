"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown } from "lucide-react";

export function AppNav() {
  const pathname = usePathname();

  const navLinks = [
    { label: "Dashboard", href: "/designer" },
    { label: "Trip Designer", href: "/designer" },
    { label: "Today View", href: "/today" },
    { label: "Pre-Departure", href: "/pre-departure" },
    { label: "Journal", href: "/journal" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0c0717]/95 backdrop-blur-xl px-4 sm:px-8 lg:px-12 py-4 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand Lockup & Desktop Navigation Links */}
        <div className="flex items-center gap-8 lg:gap-12">
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

          {/* Clean Top Navigation Links matching Reference */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs sm:text-sm font-sans">
            {navLinks.map((item, idx) => {
              const isActive =
                item.href === pathname ||
                (item.label === "Dashboard" && pathname === "/designer" && idx === 0);
              return (
                <Link
                  key={`${item.label}-${idx}`}
                  href={item.href}
                  className={`transition-colors duration-150 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-white/60 hover:text-white font-normal"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Notifications & User Profile Avatar */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Notification Icon Pill */}
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-[#f97316]" />
          </button>

          {/* User Profile Avatar with Dropdown Indicator */}
          <Link
            href="/account"
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
          >
            <div className="relative h-8 w-8 rounded-full overflow-hidden border border-white/20 bg-[#130c24] flex items-center justify-center">
              <span className="font-serif text-xs font-semibold text-[#a855f7]">TS</span>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-white/50 group-hover:text-white transition-colors hidden sm:block" />
          </Link>
        </div>
      </div>
    </header>
  );
}
