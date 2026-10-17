"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import Slider from "@/components/ui/Slider";
import type { EventItem } from "@/types/marketing";

export default function EventsSlider() {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      const res = await fetch("/api/eventos?featured=true");
      const data = await res.json();
      setEvents(
        data.map(
          (e: {
            title: string;
            description: string;
            date: string;
            category: string;
            tagLabel: string;
            image: string;
            location: string | null;
          }) => ({
            title: e.title,
            description: e.description,
            date: new Date(e.date).toLocaleDateString("es-PE", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
            category: e.category as "ec" | "gl",
            tagLabel: e.tagLabel,
            image: e.image,
            location: e.location,
          })
        )
      );
    }
    fetchEvents();
  }, []);

  return (
    <section className="mx-auto max-w-[1200px] px-4 pb-16 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-6 flex items-center justify-between"
      >
        <h2 className="mb-0 font-[family-name:var(--font-heading)] text-[1.25rem] font-bold text-[#0d2c4f] md:text-[1.75rem]">
          Eventos Destacados
        </h2>
        <Link
          href="/eventos"
          className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold leading-none text-[#005a9c] transition duration-200 hover:-translate-y-px hover:bg-slate-50 hover:text-[#0d2c4f] active:translate-y-0"
        >
          Ver todos →
        </Link>
      </motion.div>

      <Slider visibleCount={3}>
        {events.map((ev, i) => (
          <div
            className="shrink-0 basis-[280px] min-w-[280px] md:basis-[320px] md:min-w-[320px]"
            key={i}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="w-full overflow-hidden rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
                <div className="p-6">
                  <span
                    className={`mb-2 inline-block rounded-full px-[0.6rem] py-[0.2rem] text-xs font-semibold uppercase tracking-[0.05em] ${
                      ev.category === "ec"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-pink-100 text-pink-700"
                    }`}
                  >
                    {ev.tagLabel}
                  </span>
                  <div className="mb-1 text-xs text-slate-400">{ev.date}</div>
                  <div className="mb-2 font-[family-name:var(--font-heading)] text-base font-bold text-[#0d2c4f]">
                    {ev.title}
                  </div>
                  <p className="text-sm leading-[1.5] text-gray-500">
                    {ev.description}
                  </p>
                  {ev.location && (
                    <p className="mt-1 text-xs leading-[1.5] text-gray-500">
                      📍 {ev.location}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
