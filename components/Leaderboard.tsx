"use client";

import { motion } from "framer-motion";
import { TEAMS, formatRp, useDonations } from "@/lib/store";

const BADGES = ["🥇", "🥈", "🥉"];

export default function Leaderboard() {
  const { donors } = useDonations();
  const top = [...donors].sort((a, b) => b.amount - a.amount).slice(0, 10);

  return (
    <section id="leaderboard" className="section">
      <h2 className="mb-10 text-center text-3xl font-semibold sm:text-5xl">
        🏆 <span className="text-ink">Top 10 Donatur</span>
      </h2>

      <div className="glass divide-y divide-black/5 overflow-hidden">
        {top.map((d, i) => (
          <motion.div
            key={d.id}
            layout
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 px-4 py-4 sm:gap-5 sm:px-8"
          >
            <div className="w-10 text-center text-2xl font-semibold text-[#6e6e73]">{BADGES[i] ?? `#${i + 1}`}</div>
            <div className="min-w-0 flex-1">
              <div className="truncate font-semibold">{d.name}</div>
              <div className="text-xs" style={{ color: TEAMS[d.team].color }}>
                {TEAMS[d.team].emoji} {TEAMS[d.team].name}
              </div>
            </div>
            {i === 0 && (
              <span className="hidden rounded-full bg-[#0071e3] px-3 py-1 text-xs font-medium text-white sm:block">JUARA</span>
            )}
            <div className="font-bold">{formatRp(d.amount)}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
