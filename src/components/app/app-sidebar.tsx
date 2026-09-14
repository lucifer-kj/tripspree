"use client";

import Link from "next/link";
import { LayoutDashboard, Compass, CalendarCheck, FileText, BookOpen, Settings } from "lucide-react";

interface AppSidebarProps {
  activeTab?: string;
}

export function AppSidebar({ activeTab = "designer" }: AppSidebarProps) {
  const navItems = [
    { id: "overview", label: "Dashboard", href: "/designer", icon: LayoutDashboard },
    { id: "designer", label: "Trip Designer", href: "/designer", icon: Compass },
    { id: "today", label: "Today View", href: "/today", icon: CalendarCheck },
    { id: "pre-departure", label: "Pre-Departure Hub", href: "/pre-departure", icon: FileText },
    { id: "journal", label: "Travel Journal", href: "/journal", icon: BookOpen },
  ];

  return (
    <aside className="w-16 md:w-20 shrink-0 border-r border-border bg-card flex flex-col justify-between items-center py-6 select-none">
      {/* Brand Monogram */}
      <div className="flex flex-col items-center gap-6">
        <Link
          href="/"
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground font-serif text-lg font-medium shadow-sm hover:bg-primary/90 transition-colors"
          title="TripSpree Home"
        >
          TS
        </Link>

        {/* Primary Navigation Icons */}
        <nav className="flex flex-col items-center gap-2 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-150 ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                title={item.label}
                aria-label={item.label}
              >
                <Icon className="h-5 w-5" />
                {isActive && (
                  <span className="absolute left-0 h-5 w-1 rounded-r-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile / Settings */}
      <div className="flex flex-col items-center gap-3">
        <Link
          href="/account"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          title="Account & Settings"
          aria-label="Account & Settings"
        >
          <Settings className="h-4 w-4" />
        </Link>

        <Link
          href="/account"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-xs font-semibold hover:bg-primary/20 transition-colors"
          title="Member Profile"
        >
          JS
        </Link>
      </div>
    </aside>
  );
}