"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import NetworkBackground from "@/components/NetworkBackground";

export default function Hero() {
  return (
    <>
      <NetworkBackground />
      <div className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(180deg,rgba(6,11,24,0.6)_0%,rgba(6,11,24,0.35)_35%,rgba(6,11,24,0.85)_100%)]" />
      <section className="relative z-10 flex min-h-svh flex-col items-center justify-center px-4 -translate-y-20 text-center md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <Image
            src="/images/logo.png"
            alt="RIdeC"
            width={80}
            height={80}
            className="mb-8 h-20 w-20 rounded-xl"
          />
          <h1 className="mb-4 font-[family-name:var(--font-heading)] text-[2rem] leading-[1.15] font-extrabold text-white md:text-5xl">
            Conectando ciencias,{" "}
            <span className="text-cyan-400">construyendo futuro</span>
          </h1>
          <p className="mx-auto mb-8 max-w-[560px] text-lg leading-[1.6] text-slate-400">
            Red Interuniversitaria de estudiantes y profesionales que impulsa las
            ciencias básicas, reduce la deserción y genera comunidad.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/nosotros"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3 text-base font-semibold leading-none text-[#060b18] transition duration-200 hover:-translate-y-px hover:bg-cyan-500 hover:shadow-[0_4px_16px_rgba(34,211,238,0.3)] active:translate-y-0"
            >
              Conoce RIdeC
            </Link>
            <Link
              href="/eventos"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-6 py-3 text-base font-semibold leading-none text-white transition duration-200 hover:-translate-y-px hover:bg-white/10 active:translate-y-0"
            >
              Ver eventos
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
