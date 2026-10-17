"use client";

import { useState } from "react";

export interface EventoItem {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  tagLabel: string;
  image: string;
  location: string | null;
  featured: boolean;
}

export type EventoInput = Omit<EventoItem, "id">;

const inputClass =
  "w-full rounded-xl border border-[#e0e0e0] bg-white px-[0.9rem] py-[0.6rem] font-[family-name:var(--font-body)] text-base text-[#333] outline-none transition placeholder:text-[#94a3b8] focus:border-[#0d2c4f] focus:shadow-[0_0_0_3px_rgba(13,44,79,0.12)]";
const formGroup = "flex flex-col gap-[0.35rem]";
const formLabel = "text-sm font-medium text-[#333]";
const btnPrimarySm =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 py-2 font-[family-name:var(--font-body)] text-sm leading-none font-semibold text-[#060b18] no-underline transition duration-200 hover:-translate-y-px hover:bg-cyan-500 hover:shadow-[0_4px_16px_rgba(34,211,238,0.3)] active:translate-y-0";
const btnGhostSm =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-transparent px-4 py-2 font-[family-name:var(--font-body)] text-sm leading-none font-semibold text-[#6c757d] no-underline transition duration-200 hover:-translate-y-px hover:bg-[#f7f9fc] hover:text-[#0d2c4f] active:translate-y-0";

export default function EventoModal({
  evento,
  onSave,
  onCancel,
}: {
  evento: EventoItem | null;
  onSave: (data: EventoInput) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(evento?.title ?? "");
  const [date, setDate] = useState(evento?.date?.slice(0, 10) ?? "");
  const [category, setCategory] = useState(evento?.category ?? "ec");
  const [tagLabel, setTagLabel] = useState(evento?.tagLabel ?? "");
  const [location, setLocation] = useState(evento?.location ?? "");
  const [image, setImage] = useState(evento?.image ?? "");
  const [description, setDescription] = useState(evento?.description ?? "");
  const [featured, setFeatured] = useState(evento?.featured ?? false);

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
            {evento ? "Editar evento" : "Crear evento"}
          </h3>

          <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
            <div className={formGroup}>
              <label className={formLabel} htmlFor="evento-title">Título</label>
              <input
                id="evento-title"
                className={inputClass}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className={formGroup}>
              <label className={formLabel} htmlFor="evento-date">Fecha</label>
              <input
                id="evento-date"
                className={inputClass}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className={formGroup}>
              <label className={formLabel} htmlFor="evento-category">Categoría</label>
              <select
                id="evento-category"
                className={inputClass}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="ec">ec</option>
                <option value="gl">gl</option>
              </select>
            </div>

            <div className={formGroup}>
              <label className={formLabel} htmlFor="evento-tag">Etiqueta</label>
              <input
                id="evento-tag"
                className={inputClass}
                type="text"
                value={tagLabel}
                onChange={(e) => setTagLabel(e.target.value)}
              />
            </div>

            <div className={formGroup}>
              <label className={formLabel} htmlFor="evento-location">Ubicación</label>
              <input
                id="evento-location"
                className={inputClass}
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className={formGroup}>
              <label className={formLabel} htmlFor="evento-image">Imagen (URL)</label>
              <input
                id="evento-image"
                className={inputClass}
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            <div className={`${formGroup} col-span-full`}>
              <label className={formLabel} htmlFor="evento-description">Descripción</label>
              <textarea
                id="evento-description"
                className={`${inputClass} min-h-[120px] resize-y`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className={formGroup}>
              <label className="flex cursor-pointer items-center gap-2 text-[#333]">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                />
                Destacado
              </label>
            </div>
          </div>

          <div className="mt-8 flex gap-2">
            <button
              className={btnPrimarySm}
              onClick={() =>
                onSave({ title, date, category, tagLabel, location, image, description, featured })
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
