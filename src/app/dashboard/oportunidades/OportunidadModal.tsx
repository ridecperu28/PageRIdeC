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
    <div className="admin-modal" onClick={onCancel}>
      <div
        className="admin-modal__box"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="admin-form">
          <h3 className="admin-form__title">
            {oportunidad ? "Editar oportunidad" : "Crear oportunidad"}
          </h3>

          <div className="admin-form__grid">
            <div className="form-group">
              <label className="form-label" htmlFor="opp-title">Título</label>
              <input
                id="opp-title"
                className="form-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="opp-type">Tipo</label>
              <select
                id="opp-type"
                className="form-input"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="becas">becas</option>
                <option value="congresos">congresos</option>
                <option value="traslados">traslados</option>
                <option value="financiamientos">financiamientos</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="opp-year">Año</label>
              <input
                id="opp-year"
                className="form-input"
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="opp-deadline">Fecha límite</label>
              <input
                id="opp-deadline"
                className="form-input"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="opp-image">Imagen (URL)</label>
              <input
                id="opp-image"
                className="form-input"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="opp-link">Link externo</label>
              <input
                id="opp-link"
                className="form-input"
                type="text"
                value={externalLink}
                onChange={(e) => setExternalLink(e.target.value)}
              />
            </div>

            <div className="form-group form-group--full">
              <label className="form-label" htmlFor="opp-description">Descripción</label>
              <textarea
                id="opp-description"
                className="form-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="admin-form__actions">
            <button
              className="btn btn--primary btn--sm"
              onClick={() =>
                onSave({ title, type, year, deadline, image, externalLink, description })
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
