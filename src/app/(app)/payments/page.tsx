"use client";

import { useState } from "react";
import { AppHeader } from "@/components/app/app-header";
import { InCallOverlay } from "@/components/app/in-call-overlay";
import { useTripSpreeStore } from "@/lib/store";
import { Check, Download, ShieldCheck, CreditCard, ArrowRight } from "lucide-react";

export default function PaymentsPage() {
  const { isCallActive, setCallActive } = useTripSpreeStore();
  const [isSettling, setIsSettling] = useState(false);

  return (
    <div className="min-h-screen bg-[#080c18] text-[#f8fafc] flex flex-col font-sans selection:bg-[#38bdf8]/30">
      {/* Unified Command Header */}
      <AppHeader
        activeTab="Payments"
        telemetryText="TOTAL INVESTMENT: ₹6,40,000 · CLEARED: ₹4,48,000 (70%) · FINAL DUE: OCT 15 · INVOICES: VERIFIED"
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 py-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column (Span 7 / 60% Width): Investment Progress & Invoice Ledger */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Total Trip Investment Card */}
            <div className="rounded-3xl border border-[#1e293b] bg-[#0f172a] p-6 sm:p-8 shadow-2xl space-y-6 select-none">
              <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
                <span className="font-mono text-xs uppercase tracking-wider text-[#38bdf8] font-bold">
                  Bespoke Trip Investment
                </span>
                <span className="font-mono text-xs text-emerald-400 font-semibold">
                  Transparent Curation
                </span>
              </div>

              {/* Bold Total Display */}
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#94a3b8] block">
                  All-Inclusive Atelier Total
                </span>
                <h2 className="font-sans text-4xl sm:text-5xl font-black text-white mt-1 tracking-tight">
                  ₹6,40,000
                </h2>
                <span className="font-mono text-xs text-[#94a3b8] block mt-1">
                  Currency: INR (Net Inclusive of Sovereign Tourism Taxes)
                </span>
              </div>

              {/* Milestone Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white font-bold">₹4,48,000 Cleared (70%)</span>
                  <span className="text-[#38bdf8]">₹1,92,000 Remaining</span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#162032] overflow-hidden p-0.5">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#10b981] via-[#0284c7] to-[#38bdf8] shadow-[0_0_12px_rgba(56,189,248,0.5)] w-[70%]" />
                </div>
              </div>

              {/* Inclusions Checklist */}
              <div className="pt-2 border-t border-[#1e293b] space-y-2.5">
                <span className="font-mono text-[10px] uppercase text-[#94a3b8] block font-bold">
                  Guaranteed Inclusions in this Total:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-white/90">
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>10 Nights Curated Sanctuaries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Private Chauffeurs & Transfers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Shinkansen Gran Class Tickets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>All Local Taxes, Permits & Tips</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Invoice Ledger Card */}
            <div className="rounded-3xl border border-[#1e293b] bg-[#0f172a] p-6 shadow-xl space-y-4 select-none">
              <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
                <span className="font-mono text-xs uppercase tracking-wider text-[#94a3b8] font-bold">
                  Tax Invoices & Receipts
                </span>
                <span className="font-mono text-[11px] text-[#94a3b8]">
                  2 Invoices Issued
                </span>
              </div>

              <div className="space-y-3">
                <div className="rounded-2xl border border-[#1e293b]/70 bg-[#162032] p-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-white">INV-2026-0881</span>
                      <span className="rounded-full bg-emerald-500/10 text-emerald-400 px-2 py-0.5 text-[9px] font-mono font-bold">
                        Paid Sept 15
                      </span>
                    </div>
                    <span className="font-sans text-xs text-[#94a3b8] block mt-0.5">
                      Advance Retainer (30%) • ₹1,92,000
                    </span>
                  </div>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0f172a] hover:bg-white/10 text-white text-xs font-mono border border-white/10 transition-all cursor-pointer"
                  >
                    <Download className="h-3 w-3 text-[#38bdf8]" />
                    <span>PDF</span>
                  </button>
                </div>

                <div className="rounded-2xl border border-[#1e293b]/70 bg-[#162032] p-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-white">INV-2026-0914</span>
                      <span className="rounded-full bg-emerald-500/10 text-emerald-400 px-2 py-0.5 text-[9px] font-mono font-bold">
                        Paid Oct 01
                      </span>
                    </div>
                    <span className="font-sans text-xs text-[#94a3b8] block mt-0.5">
                      Mid-Term Installment (40%) • ₹2,56,000
                    </span>
                  </div>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0f172a] hover:bg-white/10 text-white text-xs font-mono border border-white/10 transition-all cursor-pointer"
                  >
                    <Download className="h-3 w-3 text-[#38bdf8]" />
                    <span>PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Span 5 / 40% Width): Final Settlement & Guarantee */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Final Balance Settlement Card */}
            <div className="rounded-3xl border-2 border-[#38bdf8]/40 bg-[#0f172a] p-6 sm:p-7 shadow-2xl space-y-5 select-none">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-[#38bdf8] font-bold">
                  Final Settlement Due
                </span>
                <span className="rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-mono font-bold">
                  In 7 Days
                </span>
              </div>

              <div>
                <span className="font-mono text-xs text-[#94a3b8] block uppercase">
                  Remaining Balance (30%)
                </span>
                <h3 className="font-sans text-3xl sm:text-4xl font-black text-white mt-1">
                  ₹1,92,000
                </h3>
                <span className="font-mono text-xs text-amber-300 block mt-1">
                  Due on October 15, 2026 (Prior to Departure)
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsSettling(true);
                    setTimeout(() => {
                      setIsSettling(false);
                      alert("Opening secure encrypted payment conduit (Razorpay / Stripe)");
                    }, 800);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#38bdf8] hover:bg-[#0284c7] text-[#080c18] font-sans font-bold text-xs uppercase tracking-wider transition-all duration-150 active:scale-97 shadow-[0_0_16px_rgba(56,189,248,0.4)] cursor-pointer"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>{isSettling ? "Connecting Gateway..." : "Settle Final Balance"}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Zero Hidden Fees Policy Guarantee */}
            <div className="rounded-3xl border border-[#1e293b] bg-[#0f172a] p-6 shadow-xl space-y-4 select-none">
              <div className="flex items-center gap-2 text-emerald-400">
                <ShieldCheck className="h-5 w-5" />
                <h4 className="font-sans text-base font-bold text-white uppercase tracking-tight">
                  Zero Hidden Fees Guarantee
                </h4>
              </div>

              <p className="font-sans text-xs text-[#94a3b8] leading-relaxed">
                TripSpree guarantees absolute financial transparency. You will never encounter unexpected checkout taxes, resort surcharges, or luggage transit fees on arrival.
              </p>

              <div className="space-y-1.5 font-mono text-[11px] text-white/80 pt-1 border-t border-[#1e293b]">
                <div className="flex justify-between">
                  <span>Chauffeur Gratuities:</span>
                  <span className="text-emerald-400 font-semibold">100% Pre-Paid</span>
                </div>
                <div className="flex justify-between">
                  <span>Temple & Garden Entry:</span>
                  <span className="text-emerald-400 font-semibold">All Pass Included</span>
                </div>
                <div className="flex justify-between">
                  <span>Private Onsen Access:</span>
                  <span className="text-emerald-400 font-semibold">No Surcharge</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* In-Call Dimming Overlay */}
      <InCallOverlay
        callStatus={isCallActive ? "active" : "idle"}
        isMuted={false}
        isSpeaking={true}
        duration={15}
        activeTranscript="Elena Vance: 'Julian, your financial statement is fully reconciled with zero remaining hotel taxes or chauffeur surcharges.'"
        onEndCall={() => setCallActive(false)}
        onToggleMute={() => {}}
        curatorName="Elena Vance"
        sanctuary="Financial Ledger"
      />
    </div>
  );
}
