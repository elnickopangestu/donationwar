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
      <h2 className="mb-12 text-center text-3xl font-black sm:text-5xl">
        <span className="text-gradient">Pilih Paket Donasi</span>
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {TIERS.map((t) => (
          <motion.button
            key={t.label}
            whileHover={{ y: -10, scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => openModal(t.amount || null)}
            className="glass group relative overflow-hidden p-6 text-center transition-colors hover:border-pink-400/60"
          >
            <div className="absolute inset-0 bg-brand-gradient opacity-0 transition-opacity group-hover:opacity-20" />
            <div className="relative">
              <div className="text-4xl transition-transform group-hover:rotate-12 group-hover:scale-125">{t.emoji}</div>
              <div className="mt-3 text-sm uppercase tracking-widest text-violet-300">{t.label}</div>
              <div className="text-gradient mt-1 text-2xl font-black">{t.amount ? formatRp(t.amount) : "Bebas"}</div>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
