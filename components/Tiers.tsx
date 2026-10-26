"use client";

import { motion } from "framer-motion";
import { formatRp, useDonations } from "@/lib/store";

const TIERS = [
  { amount: 25_000, label: "Supporter", emoji: "🌱" },
  { amount: 50_000, label: "Fighter", emoji: "⚔️" },
  { amount: 100_000, label: "Warrior", emoji: "🔥" },
  { amount: 250_000, label: "Legend", emoji: "👑" },
  { amount: 0, label: "Custom", emoji: "✨" },
];

export default function Tiers() {
  const { openModal } = useDonations();

  return (
    <section id="tiers" className="section">
      <h2 className="mb-12 text-center text-3xl font-semibold sm:text-5xl">
        <span className="text-ink">Pilih Paket Donasi</span>
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {TIERS.map((t) => (
          <motion.button
            key={t.label}
            whileHover={{ y: -10, scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => openModal(t.amount || null)}
            className="glass group relative overflow-hidden p-6 text-center transition-colors hover:border-[#22d3ee]/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
          >
            <div className="relative">
              <div className="text-4xl transition-transform group-hover:rotate-12 group-hover:scale-125">{t.emoji}</div>
              <div className="mt-3 text-sm uppercase tracking-widest text-slate-400">{t.label}</div>
              <div className="text-ink mt-1 text-2xl font-semibold">{t.amount ? formatRp(t.amount) : "Bebas"}</div>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
