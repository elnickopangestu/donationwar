"use client";

import { motion } from "framer-motion";
import { TEAMS, TeamId, useDonations } from "@/lib/store";
import Counter from "./Counter";

export default function Hero() {
  const { totals, openModal } = useDonations();

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-5 py-20 text-center">

      <motion.span
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass mb-6 rounded-full px-5 py-2 text-sm tracking-widest text-[#6e6e73]"
      >
        🔥 KOMPETISI DONASI ANTAR KOMUNITAS
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-ink tracking-tight text-5xl font-semibold leading-none sm:text-7xl md:text-8xl lg:text-9xl"
      >
        DONATION
        <br />
        WAR 2026
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 text-xl text-[#6e6e73] sm:text-3xl"
      >
        Siapa Paling Dermawan?
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 flex w-full max-w-3xl flex-col items-center gap-4 sm:flex-row sm:justify-between"
      >
        <TeamCard id="A" amount={totals.A} />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="text-ink text-5xl font-semibold"
        >
          VS
        </motion.div>
        <TeamCard id="B" amount={totals.B} />
      </motion.div>

      <div className="mt-10">
        <p className="flex items-center justify-center gap-2 text-sm uppercase tracking-widest text-[#6e6e73]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#34c759]" /> Total terkumpul (live)
        </p>
        <p className="text-ink mt-2 text-4xl font-semibold sm:text-6xl">
          <Counter value={totals.all} />
        </p>
      </div>

      <button onClick={() => openModal()} className="btn-primary mt-10 text-lg">
        Donasi Sekarang
      </button>
    </section>
  );
}

function TeamCard({ id, amount }: { id: TeamId; amount: number }) {
  const t = TEAMS[id];
  return (
    <div className="glass w-full p-5 sm:w-64" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
      <div className="text-4xl">{t.emoji}</div>
      <div className="mt-1 font-bold" style={{ color: t.color }}>
        {t.name}
      </div>
      <div className="text-lg font-semibold">
        <Counter value={amount} />
      </div>
    </div>
  );
}
