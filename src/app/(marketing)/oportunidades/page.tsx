"use client";

import { useState, useEffect } from "react";

interface Oportunidad {
  id: number;
  title: string;
  description: string;
  deadline: string | null;
  type: string;
  externalLink?: string | null;
  image?: string | null;
  year: number;
}

const typeLabels: Record<string, string> = {
  becas: "Becas",
  traslados: "Traslados",
  congresos: "Congresos",
  financiamientos: "Financiamientos",
};

const typeIcons: Record<string, string> = {
  becas: "🎓",
  congresos: "🎤",
  traslados: "✈️",
  financiamientos: "💰",
};

const cardBorder: Record<string, string> = {
  becas: "border-l-[#16a34a]",
  congresos: "border-l-[#2563eb]",
  traslados: "border-l-[#9333ea]",
  financiamientos: "border-l-[#ea580c]",
};

const tagStyle: Record<string, string> = {
  becas: "bg-[#dcfce7] text-[#16a34a]",
  congresos: "bg-[#dbeafe] text-[#2563eb]",
  traslados: "bg-[#f3e8ff] text-[#9333ea]",
  financiamientos: "bg-[#fff7ed] text-[#ea580c]",
};

const pillClass = (active: boolean) =>
  `inline-flex cursor-pointer items-center rounded-full border px-4 py-[0.45rem] font-[family-name:var(--font-body)] text-sm font-medium whitespace-nowrap transition ${
    active
      ? "border-[#0d2c4f] bg-[#0d2c4f] text-white hover:border-[#005a9c] hover:bg-[#005a9c]"
      : "border-[#e0e0e0] bg-[#f7f9fc] text-[#6c757d] hover:border-[#0d2c4f] hover:text-[#0d2c4f]"
  }`;

function getDeadlineUrgency(
  deadline: string | null
): { label: string; variant: "urgent" | "soon" | null } | null {
  if (!deadline) return null;
  const now = new Date();
  const dl = new Date(deadline);
  const diffDays = Math.ceil(
    (dl.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays < 0) return { label: "Vencida", variant: "urgent" };
  if (diffDays <= 7) return { label: `¡Últimos ${diffDays} días!`, variant: "urgent" };
  if (diffDays <= 30) return { label: `${diffDays} días restantes`, variant: "soon" };
  return { label: `${diffDays} días restantes`, variant: null };
}

const deadlineVariantClass: Record<"urgent" | "soon" | "none", string> = {
  urgent: "bg-[#fef2f2] text-[#dc2626] font-semibold",
  soon: "bg-[#fff7ed] text-[#ea580c]",
  none: "bg-[#f7f9fc] text-[#94a3b8]",
};

export default function OportunidadesPage() {
  const [oportunidades, setOportunidades] = useState<Oportunidad[]>([]);
  const [yearFilter, setYearFilter] = useState("Todos");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/oportunidades");
      const data = await res.json();
      setOportunidades(data);
    }
    fetchData();
  }, []);

  const years = [...new Set(oportunidades.map((o) => o.year.toString()))]
    .sort()
    .reverse();

  const filtered = oportunidades.filter((o) => {
    if (yearFilter !== "Todos" && o.year.toString() !== yearFilter) return false;
    if (typeFilter && o.type !== typeFilter) return false;
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
          Tipo:
        </span>
        {Object.entries(typeLabels).map(([key, label]) => (
          <button
            key={key}
            className={pillClass(typeFilter === key)}
            onClick={() => setTypeFilter(typeFilter === key ? null : key)}
          >
            {typeIcons[key]} {label}
          </button>
        ))}
      </div>

      <section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {filtered.map((o) => {
            const urgency = getDeadlineUrgency(o.deadline);
            return (
              <div
                key={o.id}
                className={`w-full overflow-hidden rounded-2xl border-l-4 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] ${cardBorder[o.type] ?? ""}`}
              >
                <div className="p-6">
                  <span
                    className={`mb-2 inline-block rounded-full px-[0.6rem] py-[0.2rem] text-xs font-semibold tracking-[0.05em] uppercase ${tagStyle[o.type] ?? ""}`}
                  >
                    {typeIcons[o.type]} {typeLabels[o.type] ?? o.type}
                  </span>
                  <h3 className="mb-2 font-[family-name:var(--font-heading)] text-base font-bold text-[#0d2c4f]">
                    {o.title}
                  </h3>
                  <p className="text-sm leading-[1.5] text-[#6c757d]">
                    {o.description}
                  </p>

                  {o.deadline && (
                    <div
                      className={`mt-2 inline-flex items-center gap-[0.35rem] rounded-full px-[0.6rem] py-1 text-xs font-medium ${deadlineVariantClass[urgency?.variant ?? "none"]}`}
                    >
                      ⏰{" "}
                      {new Date(o.deadline).toLocaleDateString("es-PE", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                      {urgency && <span> · {urgency.label}</span>}
                    </div>
                  )}

                  {o.externalLink && (
                    <a
                      href={o.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-[0.35rem] rounded-xl bg-[#0d2c4f] px-4 py-2 text-sm font-semibold text-white no-underline transition duration-200 hover:-translate-y-px hover:bg-[#005a9c]"
                    >
                      Más información →
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="px-4 py-12 text-center text-[#94a3b8]">
            <p className="mb-2 text-[2rem]">🔍</p>
            <p>No hay oportunidades que coincidan con los filtros seleccionados.</p>
          </div>
        )}
      </section>
    </div>
  );
}
