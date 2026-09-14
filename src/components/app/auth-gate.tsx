"use client";

import { useState } from "react";
import Link from "next/link";
import { useTripSpreeStore } from "@/lib/store";
import { Lock, KeyRound, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthGateProps {
  children: React.ReactNode;
  fallbackTitle?: string;
  fallbackDescription?: string;
}

export function AuthGate({
  children,
  fallbackTitle = "Member Studio Access",
  fallbackDescription = "This workspace is reserved exclusively for registered members and traveling guests.",
}: AuthGateProps) {
  const { isAuthenticated, currentUser, login } = useTripSpreeStore();
  const [passcode, setPasscode] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [isError, setIsError] = useState(false);

  // If already authenticated, render protected view seamlessly
  if (isAuthenticated && currentUser) {
    return <>{children}</>;
  }

  const handleDemoSignIn = () => {
    login({
      id: "patron-001",
      name: "Jonathan Sterling",
      email: "j.sterling@sterling-holdings.co.uk",
      tier: "Founding Member",
      avatarInitials: "JS",
      memberSince: "Autumn 2024",
      assignedCurator: "Elena Vance",
    });
  };

  const handleCustomSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) {
      setIsError(true);
      return;
    }

    const namePart = emailInput.split("@")[0].replace(/[._-]/g, " ");
    const formattedName = namePart
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ") || "Guest";

    const initials = formattedName
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    login({
      id: `patron-${Date.now()}`,
      name: formattedName,
      email: emailInput.trim(),
      tier: "Member",
      avatarInitials: initials || "GM",
      memberSince: "Autumn 2026",
      assignedCurator: "Elena Vance",
    });
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-background text-foreground px-4 sm:px-6 py-12 overflow-hidden selection:bg-primary/20 selection:text-primary">
      {/* Ambient background geometry and glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[25%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[45vw] h-[45vw] rounded-full bg-chart-1/5 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Monogram branding */}
        <div className="flex flex-col items-center text-center mb-8">
          <Link
            href="/"
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-serif text-xl font-medium shadow-md hover:bg-primary/90 transition-transform duration-200 hover:scale-105 mb-4"
            title="TripSpree Home"
          >
            TS
          </Link>
          <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest mb-1.5">
            <Lock className="h-3.5 w-3.5" />
            <span>Member Workspace Sign-In</span>
          </div>
          <h1 className="font-serif text-3xl font-medium tracking-tight text-foreground">
            {fallbackTitle}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-muted-foreground mt-2 max-w-sm leading-relaxed">
            {fallbackDescription}
          </p>
        </div>

        {/* Member Sign-In Card */}
        <div className="rounded-2xl border border-border bg-card/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-6">
          {/* Quick Demo Access Button */}
          <div className="p-4 rounded-xl border border-primary/25 bg-primary/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-primary font-semibold flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" />
                Verified Member Credentials
              </span>
              <span className="rounded-full bg-chart-1/15 px-2 py-0.5 font-mono text-[9px] text-chart-1 font-medium border border-chart-1/25">
                Ready
              </span>
            </div>
            <p className="font-sans text-xs text-muted-foreground">
              Instant access as <strong className="text-foreground font-medium">Jonathan Sterling</strong> (Founding Member #TS-8842, Kyoto journey).
            </p>
            <Button
              type="button"
              onClick={handleDemoSignIn}
              className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-sans text-xs font-semibold py-2.5 shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Enter as Jonathan Sterling (Demo)</span>
            </Button>
          </div>

          <div className="relative flex items-center justify-center">
            <span className="absolute inset-x-0 h-px bg-border" />
            <span className="relative bg-card px-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Or Sign In with Email
            </span>
          </div>

          {/* Custom Credential Form */}
          <form onSubmit={handleCustomSignIn} className="space-y-4">
            <div>
              <label
                htmlFor="patron-email"
                className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5"
              >
                Member Email or ID
              </label>
              <input
                id="patron-email"
                type="email"
                required
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                  setIsError(false);
                }}
                placeholder="member@residence.com"
                className="w-full rounded-xl border border-border bg-background/80 px-3.5 py-2.5 font-sans text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="patron-key"
                className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center justify-between"
              >
                <span>Passcode</span>
                <span className="text-muted-foreground/60">Any valid code</span>
              </label>
              <div className="relative">
                <input
                  id="patron-key"
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-border bg-background/80 px-3.5 py-2.5 font-mono text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                />
                <KeyRound className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground/50 pointer-events-none" />
              </div>
            </div>

            {isError && (
              <p className="font-mono text-[11px] text-destructive">
                Please provide a valid email address to authenticate.
              </p>
            )}

            <Button
              type="submit"
              variant="outline"
              className="w-full rounded-xl border-border text-foreground hover:bg-muted font-sans text-xs font-medium py-2.5 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Unlock Member Workspace</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </form>

          {/* Footer Back Link */}
          <div className="pt-2 text-center border-t border-border/60">
            <Link
              href="/"
              className="font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
            >
              &larr; Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
