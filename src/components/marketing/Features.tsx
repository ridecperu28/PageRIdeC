"use client";

import { motion } from "motion/react";
import type { Feature } from "@/types/marketing";

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
};

const item = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const features: Feature[] = [
  {
    icon: "🔬",
    title: "Investigación",
    description: "Impulsamos las ciencias básicas.",
    href: null,
  },
  {
    icon: "🤝",
    title: "Comunidad",
    description: "Conectamos estudiantes y profesionales.",
    href: null,
  },
  {
    icon: "🚀",
    title: "Divulgación",
    description: "Acercamos la ciencia a la sociedad.",
    href: null,
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-[1200px] px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-12 text-center">
          <h2 className="mb-2 font-[family-name:var(--font-heading)] text-[1.25rem] font-bold text-[#0d2c4f] md:text-[1.75rem]">
            ¿Qué hacemos?
          </h2>
        </div>
      </motion.div>
      <motion.div
        variants={stagger}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        {features.map((f) => (
          <motion.div
            key={f.title}
            variants={item}
            transition={{ duration: 0.5 }}
          >
            <div className="flex h-full flex-col items-center rounded-2xl bg-white px-6 py-12 text-center shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-400/15 text-[1.75rem]">
                {f.icon}
              </div>
              <h3 className="mb-2 font-[family-name:var(--font-heading)] text-lg font-bold text-[#0d2c4f]">
                {f.title}
              </h3>
              <p className="text-sm leading-[1.6] text-gray-500">
                {f.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
