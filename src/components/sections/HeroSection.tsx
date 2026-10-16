"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Button from "../ui/Button";
import NetworkBackground from "../NetworkBackground";

export default function HeroSection() {
  return (
    <>
      <NetworkBackground />
      <div className="network-overlay" />
      <section className="relative z-10 flex min-h-svh flex-col items-center justify-center px-4 -translate-y-20 text-center md:px-10">
        {/* min-h-svh La altura mínima es el 100 % de la altura visible pequeña de la ventana. */}
        {/* -translate-y-6 desplaza visualmente la sección 24 px hacia arriba sin modificar su altura original. */}

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
            <Button href="/nosotros" variant="primary">
              Conoce RIdeC
            </Button>
            <Button href="/eventos" variant="outline">
              Ver eventos
            </Button>
          </div>
        </motion.div>
      </section>
    </>
  );
}
