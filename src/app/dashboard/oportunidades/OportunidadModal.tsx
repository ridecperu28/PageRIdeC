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
            {oportunidad ? "Editar oportunidad" : "Crear oportunidad"}
          </h3>

          <div className={adminFormGrid}>
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
                className={`${inputClass} min-h-[120px]`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className={adminFormActions}>
            <button
              className={btnPrimarySm}
              onClick={() =>
                onSave({ title, type, year, deadline, image, externalLink, description })
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
