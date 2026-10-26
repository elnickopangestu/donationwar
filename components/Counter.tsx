"use client";

import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

export default function Counter({ value, prefix = "Rp " }: { value: number; prefix?: string }) {
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => prefix + Math.round(v).toLocaleString("id-ID"));

  useEffect(() => {
    const controls = animate(mv, value, { duration: 1.2, ease: "easeOut" });
    return controls.stop;
  }, [value, mv]);

  return <motion.span>{text}</motion.span>;
}
