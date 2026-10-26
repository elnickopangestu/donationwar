"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TEAMS, TeamId, formatRp, useDonations } from "@/lib/store";

export default function DonateModal() {
  const { modalOpen, closeModal, presetAmount, donate } = useDonations();
  const [name, setName] = useState("");
  const [team, setTeam] = useState<TeamId>("A");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (modalOpen) {
      setAmount(presetAmount ? String(presetAmount) : "");
      setDone(false);
    }
  }, [modalOpen, presetAmount]);

  const value = Number(amount);
  const valid = name.trim().length > 0 && value >= 1000;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    donate({ name: name.trim(), team, amount: value, message: message.trim() || undefined });
    setDone(true);
    setName("");
    setMessage("");
  };

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass max-h-[92vh] w-full max-w-md overflow-y-auto bg-white/90 p-6 sm:p-8"
          >
            {done ? (
              <div className="py-8 text-center">
                <div className="text-6xl">🎉</div>
                <h3 className="text-ink mt-4 text-2xl font-semibold">Terima kasih!</h3>
                <p className="mt-2 text-[#6e6e73]">Donasimu sudah masuk ke {TEAMS[team].name}.</p>
                <button onClick={closeModal} className="btn-primary mt-6">
                  Tutup
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold">Donasi Sekarang</h3>
                  <button type="button" onClick={closeModal} aria-label="Tutup" className="text-2xl text-[#6e6e73]">
                    ×
                  </button>
                </div>

                <Field label="Nama">
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama kamu" className="input" required />
                </Field>

                <Field label="Pilih Tim">
                  <div className="grid grid-cols-2 gap-3">
                    {(["A", "B"] as TeamId[]).map((id) => (
                      <button
                        type="button"
                        key={id}
                        onClick={() => setTeam(id)}
                        className="rounded-2xl border p-3 text-sm font-bold transition"
                        style={{
                          borderColor: team === id ? TEAMS[id].color : "rgba(0,0,0,0.08)",
                          background: team === id ? TEAMS[id].color + "1a" : "transparent",
                        }}
                      >
                        {TEAMS[id].emoji} {TEAMS[id].name}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label={`Jumlah Donasi ${value ? "· " + formatRp(value) : ""}`}>
                  <input
                    type="number"
                    min={1000}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Min. 1000"
                    className="input"
                    required
                  />
                </Field>

                <Field label="Pesan (opsional)">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    maxLength={140}
                    placeholder="Semangat untuk timku!"
                    className="input resize-none"
                  />
                </Field>

                <button disabled={!valid} className="btn-primary w-full disabled:opacity-40 disabled:hover:scale-100">
                  Kirim Donasi
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-[#6e6e73]">{label}</span>
      {children}
    </label>
  );
}
