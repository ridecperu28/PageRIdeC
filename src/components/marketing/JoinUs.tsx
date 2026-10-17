"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function JoinUs() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 pb-16 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="rounded-[20px] bg-gradient-to-br from-[#0d2c4f] to-[#005a9c] px-6 py-12 text-center text-white md:px-8 md:py-16">
          <h2 className="mb-2 font-[family-name:var(--font-heading)] text-[1.25rem] font-extrabold md:text-[1.75rem]">
            Únete a la red
          </h2>
          <p className="mx-auto mb-8 max-w-[500px] text-base opacity-[0.85]">
            Forma parte de una comunidad que está transformando la educación
            científica en Perú.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/oportunidades"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3 text-base font-semibold leading-none text-[#060b18] transition duration-200 hover:-translate-y-px hover:bg-cyan-500 hover:shadow-[0_4px_16px_rgba(34,211,238,0.3)] active:translate-y-0"
            >
              Ver oportunidades
            </Link>
            <Link
              href="/nosotros"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-6 py-3 text-base font-semibold leading-none text-white transition duration-200 hover:-translate-y-px hover:bg-white/10 active:translate-y-0"
            >
              Conoce más
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
