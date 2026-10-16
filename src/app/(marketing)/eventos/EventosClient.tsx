"use client";

import { useState } from "react";
import EventCard from "@/components/ui/EventCard";

interface Evento {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  tagLabel: string;
  image: string;
  location?: string | null;
}

interface EventosClientProps {
  eventos: Evento[];
}

const pillClass = (active: boolean) =>
  `inline-flex cursor-pointer items-center rounded-full border px-4 py-[0.45rem] font-[family-name:var(--font-body)] text-sm font-medium whitespace-nowrap transition ${
    active
      ? "border-[#0d2c4f] bg-[#0d2c4f] text-white hover:border-[#005a9c] hover:bg-[#005a9c]"
      : "border-[#e0e0e0] bg-[#f7f9fc] text-[#6c757d] hover:border-[#0d2c4f] hover:text-[#0d2c4f]"
  }`;

export default function EventosClient({ eventos }: EventosClientProps) {
  const [yearFilter, setYearFilter] = useState("Todos");
  const [catFilter, setCatFilter] = useState<string | null>(null);

  const years = [...new Set(eventos.map((e) => new Date(e.date).getFullYear().toString()))].sort().reverse();

  const filtered = eventos.filter((e) => {
    const dateYear = new Date(e.date).getFullYear().toString();
    if (yearFilter !== "Todos" && dateYear !== yearFilter) return false;
    if (catFilter && e.category !== catFilter) return false;
    return true;
  });

  return (
    <div className="mx-auto min-h-screen max-w-[1200px] space-y-8 px-4 py-1 md:px-8">

      <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-white px-4 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.06)] md:gap-4 md:px-6 md:py-4">
        <span className="mr-2 font-[family-name:var(--font-heading)] text-sm font-semibold text-[#0d2c4f]">Año:</span>
        <button
          className={pillClass(yearFilter === "Todos")}
          onClick={() => setYearFilter("Todos")}
        >
          Todos
        </button>
        {years.map((y) => (
          <button
            key={y}
            className={pillClass(yearFilter === y)}
            onClick={() => setYearFilter(y)}
          >
            {y}
          </button>
        ))}

        <div className="hidden h-6 w-px shrink-0 bg-[#e0e0e0] md:block" />

        <span className="mr-2 font-[family-name:var(--font-heading)] text-sm font-semibold text-[#0d2c4f]">Categoría:</span>
        <button
          className={pillClass(catFilter === "ec")}
          onClick={() => setCatFilter(catFilter === "ec" ? null : "ec")}
        >
          🔬 Explorando Ciencias
        </button>
        <button
          className={pillClass(catFilter === "gl")}
          onClick={() => setCatFilter(catFilter === "gl" ? null : "gl")}
        >
          🤝 Generando Lazos
        </button>
      </div>

      <section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {filtered.map((ev) => (
            <EventCard
              key={ev.id}
              title={ev.title}
              description={ev.description}
              date={new Date(ev.date).toLocaleDateString("es-PE", { day: "numeric", month: "short", year: "numeric" })}
              category={ev.category as "ec" | "gl"}
              tagLabel={ev.tagLabel}
              image={ev.image}
              location={ev.location}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="px-4 py-12 text-center text-[#94a3b8]">
            <p className="mb-2 text-[2rem]">🔍</p>
            <p>No hay eventos que coincidan con los filtros seleccionados.</p>
          </div>
        )}
      </section>
    </div>
  );
}
