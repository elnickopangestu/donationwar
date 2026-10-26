"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type TeamId = "A" | "B";

export interface Donor {
  id: number;
  name: string;
  team: TeamId;
  amount: number;
  message?: string;
}

export const TEAMS: Record<TeamId, { name: string; emoji: string; color: string }> = {
  A: { name: "Team Nebula", emoji: "🌌", color: "#8b5cf6" },
  B: { name: "Team Blossom", emoji: "🌸", color: "#ec4899" },
};

export const formatRp = (n: number) => "Rp " + n.toLocaleString("id-ID");

const SEED: Donor[] = [
  { id: 1, name: "Budi Santoso", team: "A", amount: 2_500_000 },
  { id: 2, name: "Siti Rahma", team: "B", amount: 2_000_000 },
  { id: 3, name: "Andi Pratama", team: "A", amount: 1_500_000 },
  { id: 4, name: "Dewi Lestari", team: "B", amount: 1_250_000 },
  { id: 5, name: "Rizky Fadillah", team: "A", amount: 1_000_000 },
  { id: 6, name: "Maya Putri", team: "B", amount: 850_000 },
  { id: 7, name: "Hendra Wijaya", team: "A", amount: 600_000 },
  { id: 8, name: "Nadia Safitri", team: "B", amount: 500_000 },
  { id: 9, name: "Agus Salim", team: "A", amount: 350_000 },
  { id: 10, name: "Lina Marlina", team: "B", amount: 250_000 },
];

const FAKE_NAMES = ["Rina", "Dimas", "Putri", "Fajar", "Tari", "Yoga", "Citra", "Bayu", "Intan", "Reza"];
const FAKE_AMOUNTS = [25_000, 50_000, 100_000, 250_000];

interface Ctx {
  donors: Donor[];
  totals: { A: number; B: number; all: number };
  modalOpen: boolean;
  presetAmount: number | null;
  openModal: (amount?: number | null) => void;
  closeModal: () => void;
  donate: (d: Omit<Donor, "id">) => void;
}

const DonationContext = createContext<Ctx | null>(null);

export function DonationProvider({ children }: { children: React.ReactNode }) {
  const [donors, setDonors] = useState<Donor[]>(SEED);
  const [modalOpen, setModalOpen] = useState(false);
  const [presetAmount, setPresetAmount] = useState<number | null>(null);

  const donate = useCallback((d: Omit<Donor, "id">) => {
    setDonors((prev) => [...prev, { ...d, id: Date.now() + Math.random() }]);
  }, []);

  // Simulasi donasi live dari pengunjung lain (demo — ganti dengan API/WebSocket)
  useEffect(() => {
    const t = setInterval(() => {
      const name = FAKE_NAMES[Math.floor(Math.random() * FAKE_NAMES.length)];
      const initial = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      donate({
        name: `${name} ${initial}.`,
        team: Math.random() > 0.5 ? "A" : "B",
        amount: FAKE_AMOUNTS[Math.floor(Math.random() * FAKE_AMOUNTS.length)],
      });
    }, 3500);
    return () => clearInterval(t);
  }, [donate]);

  const sum = (t: TeamId) => donors.filter((d) => d.team === t).reduce((s, d) => s + d.amount, 0);
  const A = sum("A");
  const B = sum("B");

  return (
    <DonationContext.Provider
      value={{
        donors,
        totals: { A, B, all: A + B },
        modalOpen,
        presetAmount,
        openModal: (amount = null) => {
          setPresetAmount(amount);
          setModalOpen(true);
        },
        closeModal: () => setModalOpen(false),
        donate,
      }}
    >
      {children}
    </DonationContext.Provider>
  );
}

export function useDonations() {
  const ctx = useContext(DonationContext);
  if (!ctx) throw new Error("useDonations must be used within DonationProvider");
  return ctx;
}
