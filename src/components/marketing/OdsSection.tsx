"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ods } from "@/data/ods";

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
};

const item = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function OdsSection() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 pb-16 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-12 text-center">
          <h2 className="mb-2 font-[family-name:var(--font-heading)] text-[1.25rem] font-bold text-[#0d2c4f] md:text-[1.75rem]">
            Alineados con los ODS
          </h2>
        </div>
      </motion.div>
      <motion.div
        variants={stagger}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid grid-cols-2 gap-6 md:grid-cols-4"
      >
        {ods.map((o) => (
          <motion.div
            key={o.title}
            variants={item}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center rounded-2xl bg-white px-4 py-8 text-center shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <Image
                src={o.image}
                alt={`ODS ${o.number}`}
                width={64}
                height={64}
                className="mb-4 h-16 w-16"
              />
              <h4 className="mb-1 font-[family-name:var(--font-heading)] text-sm font-bold text-[#0d2c4f]">
                ODS {o.number} · {o.title}
              </h4>
              <p className="text-xs leading-[1.5] text-gray-500">
                {o.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
