"use client";

import { useState } from "react";
import { formatRp, useDonations } from "@/lib/store";

export default function Footer() {
  const { totals, openModal } = useDonations();
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const data = {
      title: "Donation War 2026",
      text: `Donation War 2026 sudah terkumpul ${formatRp(totals.all)}! Ayo gabung tim kamu!`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(data);
      } catch {
        // pengguna membatalkan share
      }
    } else {
      await navigator.clipboard.writeText(`${data.text} ${data.url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <footer className="border-t border-black/5 bg-white/70 px-5 py-14 text-center backdrop-blur-xl">
      <p className="text-sm uppercase tracking-widest text-[#6e6e73]">Total donasi terkumpul</p>
      <p className="text-ink mt-2 text-4xl font-semibold sm:text-5xl">{formatRp(totals.all)}</p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button onClick={() => openModal()} className="btn-primary">
          Donasi Sekarang
        </button>
        <button onClick={share} className="glass rounded-full px-8 py-4 font-bold transition hover:bg-black/5">
          {copied ? "✅ Link tersalin!" : "🔗 Bagikan"}
        </button>
      </div>
      <p className="mt-10 text-xs text-[#6e6e73]">© 2026 Donation War · Dibuat dengan untuk kebaikan</p>
    </footer>
  );
}
