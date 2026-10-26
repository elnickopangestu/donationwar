"use client";

import { motion } from "framer-motion";

const STEPS = [
  { icon: "🛡️", title: "Pilih Tim", desc: "Tentukan komunitasmu: Team Persija atau Team Persita." },
  { icon: "💸", title: "Donasi", desc: "Pilih nominal donasi favoritmu dan kirim dukungan." },
  { icon: "🏆", title: "Menangkan War", desc: "Donasimu menambah poin tim. Tim dengan donasi terbanyak menang!" },
];

export default function HowItWorks() {
  return (
    <section id="how" className="section">
      <h2 className="mb-12 text-center text-3xl font-semibold sm:text-5xl">
        <span className="text-ink">Cara Kerja</span>
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ y: -8 }}
            className="glass relative p-8 text-center"
          >
            <span className="absolute right-5 top-4 text-5xl font-semibold text-black/5">{i + 1}</span>
            <div className="text-5xl">{s.icon}</div>
            <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
            <p className="mt-2 text-[#6e6e73]">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
