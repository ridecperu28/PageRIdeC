"use client";

import { motion } from "motion/react";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section className="relative z-10 bg-gradient-to-br from-[#0d2c4f] to-[#060b18] text-white">
      <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-8 md:py-16">
        <motion.div
          className="grid grid-cols-1 gap-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="mb-2 font-[family-name:var(--font-heading)] text-[1.25rem] font-bold md:text-[1.75rem]">
              Ponte en contacto
            </h2>
            <p className="mb-8 text-base leading-[1.6] text-slate-400">
              ¿Tienes preguntas, sugerencias o quieres ser parte de la red?
              Escríbenos y te responderemos pronto.
            </p>
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
