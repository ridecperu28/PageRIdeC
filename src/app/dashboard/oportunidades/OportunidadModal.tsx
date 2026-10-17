"use client";

import { useState } from "react";

export interface OportunidadItem {
  id: number;
  title: string;
  description: string;
  deadline: string | null;
  type: string;
  externalLink: string | null;
  image: string | null;
  year: number;
}

export type OportunidadInput = Omit<OportunidadItem, "id">;

const inputClass =
  "w-full rounded-xl border border-[#e0e0e0] bg-white px-[0.9rem] py-[0.6rem] font-[family-name:var(--font-body)] text-base text-[#333] outline-none transition placeholder:text-[#94a3b8] focus:border-[#0d2c4f] focus:shadow-[0_0_0_3px_rgba(13,44,79,0.12)]";
const formGroup = "flex flex-col gap-[0.35rem]";
const formLabel = "text-sm font-medium text-[#333]";
const btnPrimarySm =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 py-2 font-[family-name:var(--font-body)] text-sm leading-none font-semibold text-[#060b18] no-underline transition duration-200 hover:-translate-y-px hover:bg-cyan-500 hover:shadow-[0_4px_16px_rgba(34,211,238,0.3)] active:translate-y-0";
const btnGhostSm =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-transparent px-4 py-2 font-[family-name:var(--font-body)] text-sm leading-none font-semibold text-[#6c757d] no-underline transition duration-200 hover:-translate-y-px hover:bg-[#f7f9fc] hover:text-[#0d2c4f] active:translate-y-0";

export default function OportunidadModal({
  oportunidad,
  onSave,
  onCancel,
}: {
  oportunidad: OportunidadItem | null;
  onSave: (data: OportunidadInput) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(oportunidad?.title ?? "");
  const [type, setType] = useState(oportunidad?.type ?? "becas");
  const [year, setYear] = useState(oportunidad?.year ?? new Date().getFullYear());
  const [deadline, setDeadline] = useState(oportunidad?.deadline?.slice(0, 10) ?? "");
  const [image, setImage] = useState(oportunidad?.image ?? "");
  const [externalLink, setExternalLink] = useState(oportunidad?.externalLink ?? "");
  const [description, setDescription] = useState(oportunidad?.description ?? "");

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto bg-black/60 p-6"
      onClick={onCancel}
    >
      <div
        className="m-auto w-full max-w-[720px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-2xl border border-white/[0.06] bg-white p-12">
          <h3 className="mt-0 mb-8 font-[family-name:var(--font-heading)] text-lg font-bold text-[#0d2c4f]">
            {oportunidad ? "Editar oportunidad" : "Crear oportunidad"}
          </h3>

          <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
            <div className={formGroup}>
              <label className={formLabel} htmlFor="opp-title">Título</label>
              <input
                id="opp-title"
                className={inputClass}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className={formGroup}>
              <label className={formLabel} htmlFor="opp-type">Tipo</label>
              <select
                id="opp-type"
                className={inputClass}
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="becas">becas</option>
                <option value="congresos">congresos</option>
                <option value="traslados">traslados</option>
                <option value="financiamientos">financiamientos</option>
              </select>
            </div>

            <div className={formGroup}>
              <label className={formLabel} htmlFor="opp-year">Año</label>
              <input
                id="opp-year"
                className={inputClass}
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              />
            </div>

            <div className={formGroup}>
              <label className={formLabel} htmlFor="opp-deadline">Fecha límite</label>
              <input
                id="opp-deadline"
                className={inputClass}
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>

            <div className={formGroup}>
              <label className={formLabel} htmlFor="opp-image">Imagen (URL)</label>
              <input
                id="opp-image"
                className={inputClass}
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            <div className={formGroup}>
              <label className={formLabel} htmlFor="opp-link">Link externo</label>
              <input
                id="opp-link"
                className={inputClass}
                type="text"
                value={externalLink}
                onChange={(e) => setExternalLink(e.target.value)}
              />
            </div>

            <div className={`${formGroup} col-span-full`}>
              <label className={formLabel} htmlFor="opp-description">Descripción</label>
              <textarea
                id="opp-description"
                className={`${inputClass} min-h-[120px] resize-y`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-8 flex gap-2">
            <button
              className={btnPrimarySm}
              onClick={() =>
                onSave({ title, type, year, deadline, image, externalLink, description })
              }
            >
              Guardar
            </button>
            <button className={btnGhostSm} onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
