"use client";

import { useState, useEffect } from "react";

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

const pillClass = (active: boolean) =>
  `inline-flex cursor-pointer items-center rounded-full border px-4 py-[0.45rem] font-[family-name:var(--font-body)] text-sm font-medium whitespace-nowrap transition ${
    active
      ? "border-[#0d2c4f] bg-[#0d2c4f] text-white hover:border-[#005a9c] hover:bg-[#005a9c]"
      : "border-[#e0e0e0] bg-[#f7f9fc] text-[#6c757d] hover:border-[#0d2c4f] hover:text-[#0d2c4f]"
  }`;

export default function EventosPage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [yearFilter, setYearFilter] = useState("Todos");
  const [catFilter, setCatFilter] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/eventos");
      const data = await res.json();
      setEventos(data);
    }
    fetchData();
  }, []);

  const years = [
    ...new Set(eventos.map((e) => new Date(e.date).getFullYear().toString())),
  ]
    .sort()
    .reverse();

  const filtered = eventos.filter((e) => {
    const dateYear = new Date(e.date).getFullYear().toString();
    if (yearFilter !== "Todos" && dateYear !== yearFilter) return false;
    if (catFilter && e.category !== catFilter) return false;
    return true;
  });

  return (
    <div className="mx-auto min-h-screen max-w-[1200px] space-y-8 px-4 py-1 md:px-8">
      <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-white px-4 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.06)] md:gap-4 md:px-6 md:py-4">
        <span className="mr-2 font-[family-name:var(--font-heading)] text-sm font-semibold text-[#0d2c4f]">
          Año:
        </span>
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

        <span className="mr-2 font-[family-name:var(--font-heading)] text-sm font-semibold text-[#0d2c4f]">
          Categoría:
        </span>
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
            <div
              className="w-full overflow-hidden rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
              key={ev.id}
            >
              <div className="p-6">
                <span
                  className={`mb-2 inline-block rounded-full px-[0.6rem] py-[0.2rem] text-xs font-semibold uppercase tracking-[0.05em] ${ev.category === "ec" ? "bg-[#dbeafe] text-[#1d4ed8]" : "bg-[#fce7f3] text-[#be185d]"}`}
                >
                  {ev.tagLabel}
                </span>
                <div className="mb-1 text-xs text-[#94a3b8]">
                  {new Date(ev.date).toLocaleDateString("es-PE", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
                <div className="mb-2 font-[family-name:var(--font-heading)] text-base font-bold text-[#0d2c4f]">{ev.title}</div>
                <p className="text-sm leading-[1.5] text-[#6c757d]">{ev.description}</p>
                {ev.location && (
                  <p className="mt-1 text-xs leading-[1.5] text-[#6c757d]">
                    📍 {ev.location}
                  </p>
                )}
              </div>
            </div>
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
