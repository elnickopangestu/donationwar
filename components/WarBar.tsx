"use client";

import { motion } from "framer-motion";
import { TEAMS, formatRp, useDonations } from "@/lib/store";

export default function WarBar() {
  const { totals } = useDonations();
  const pctA = totals.all ? (totals.A / totals.all) * 100 : 50;
  const pctB = 100 - pctA;
  const leader = totals.A >= totals.B ? "A" : "B";

  return (
    <section id="war" className="section">
      <h2 className="mb-2 text-center text-3xl font-black sm:text-5xl">
        <span className="text-gradient">Live War Bar</span>
      </h2>
      <p className="mb-10 text-center text-violet-300">
        {TEAMS[leader].emoji} {TEAMS[leader].name} sedang memimpin!
      </p>

      <div className="glass p-6 sm:p-10">
        <div className="mb-4 flex justify-between text-lg font-bold sm:text-2xl">
          <span style={{ color: TEAMS.A.color }}>
            {TEAMS.A.emoji} {pctA.toFixed(1)}%
          </span>
          <span style={{ color: TEAMS.B.color }}>
            {pctB.toFixed(1)}% {TEAMS.B.emoji}
          </span>
        </div>

        <div className="flex h-10 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full"
            style={{ background: `linear-gradient(90deg, #6d28d9, ${TEAMS.A.color})` }}
            animate={{ width: `${pctA}%` }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
          />
          <motion.div
            className="h-full"
            style={{ background: `linear-gradient(90deg, ${TEAMS.B.color}, #be185d)` }}
            animate={{ width: `${pctB}%` }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
          />
        </div>

        <div className="mt-4 flex justify-between text-sm text-violet-200 sm:text-base">
          <span>{formatRp(totals.A)}</span>
          <span>{formatRp(totals.B)}</span>
        </div>
      </div>
    </section>
  );
}
