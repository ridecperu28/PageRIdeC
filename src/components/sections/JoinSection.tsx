"use client";

import { motion } from "motion/react";
import CTASection from "../ui/CTASection";

export default function JoinSection() {
  return (
    <section className="section-light__inner" style={{ paddingBottom: "4rem" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <CTASection
          title="Únete a la red"
          text="Forma parte de una comunidad que está transformando la educación científica en Perú."
          primaryBtn={{ label: "Ver oportunidades", href: "/oportunidades" }}
          secondaryBtn={{ label: "Conoce más", href: "/nosotros" }}
        />
      </motion.div>
    </section>
  );
}
