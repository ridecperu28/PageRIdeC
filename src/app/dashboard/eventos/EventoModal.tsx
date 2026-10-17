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
    <div className="admin-modal" onClick={onCancel}>
      <div
        className="admin-modal__box"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="admin-form">
          <h3 className="admin-form__title">
            {evento ? "Editar evento" : "Crear evento"}
          </h3>

          <div className="admin-form__grid">
            <div className="form-group">
              <label className="form-label" htmlFor="evento-title">Título</label>
              <input
                id="evento-title"
                className="form-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="evento-date">Fecha</label>
              <input
                id="evento-date"
                className="form-input"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="evento-category">Categoría</label>
              <select
                id="evento-category"
                className="form-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="ec">ec</option>
                <option value="gl">gl</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="evento-tag">Etiqueta</label>
              <input
                id="evento-tag"
                className="form-input"
                type="text"
                value={tagLabel}
                onChange={(e) => setTagLabel(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="evento-location">Ubicación</label>
              <input
                id="evento-location"
                className="form-input"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="evento-image">Imagen (URL)</label>
              <input
                id="evento-image"
                className="form-input"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            <div className="form-group form-group--full">
              <label className="form-label" htmlFor="evento-description">Descripción</label>
              <textarea
                id="evento-description"
                className="form-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                  color: "var(--c-text)",
                }}
              >
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                />
                Destacado
              </label>
            </div>
          </div>

          <div className="admin-form__actions">
            <button
              className="btn btn--primary btn--sm"
              onClick={() =>
                onSave({ title, date, category, tagLabel, location, image, description, featured })
              }
            >
              Guardar
            </button>
            <button className="btn btn--ghost btn--sm" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
