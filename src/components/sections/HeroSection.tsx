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
      <section className="hero">
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
            className="hero__logo"
          />
          <h1 className="hero__title">
            Conectando ciencias,{" "}
            <span className="hero__accent">construyendo futuro</span>
          </h1>
          <p className="hero__subtitle">
            Red Interuniversitaria de estudiantes y profesionales que impulsa las
            ciencias básicas, reduce la deserción y genera comunidad.
          </p>
          <div className="hero__actions">
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
