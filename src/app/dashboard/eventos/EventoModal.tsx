"use client";

import { useState } from "react";
import {
  adminForm,
  adminFormActions,
  adminFormGrid,
  adminFormTitle,
  btnGhost,
  btnPrimarySm,
  formGroup,
  formLabel,
  inputClass,
  modalBox,
  modalOverlay,
} from "@/components/admin/ui";

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
  creatorId: number;
}

export type EventoInput = Omit<EventoItem, "id" | "creatorId">;

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
      className={modalOverlay}
      onClick={onCancel}
    >
      <div
        className={modalBox}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={adminForm}>
          <h3 className={adminFormTitle}>
            {evento ? "Editar evento" : "Crear evento"}
          </h3>

          <div className={adminFormGrid}>
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
                className={`${inputClass} min-h-[120px]`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className={formGroup}>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                />
                Destacado
              </label>
            </div>
          </div>

          {/* ENVIAR EVENTO  */}
          <div className={adminFormActions}>
            <button
              className={btnPrimarySm}
              onClick={() =>
                onSave({ title, date, category, tagLabel, location, image, description, featured })
              }
            >
              Guardar
            </button>
            <button className={btnGhost} onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
