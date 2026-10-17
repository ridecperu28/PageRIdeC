"use client";

import { useState, useEffect } from "react";
import RoleGuard from "@/components/admin/RoleGuard";
import OportunidadModal, {
  type OportunidadItem,
  type OportunidadInput,
} from "./OportunidadModal";
import {
  badgeBase,
  badgeVariants,
  btnGhostPlain,
  btnPrimarySm,
  tableClass,
  tdClass,
  thClass,
} from "@/components/admin/ui";

function badgeVariant(type: string) {
  if (type === "becas") return badgeVariants.approved;
  if (type === "congresos") return badgeVariants.admin;
  if (type === "traslados") return badgeVariants.colaborador;
  return badgeVariants.miembro;
}

export default function OportunidadesPage() {
  const [items, setItems] = useState<OportunidadItem[]>([]);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<OportunidadItem | null>(null);

  const fetchData = async () => {
    const res = await fetch("/api/oportunidades");
    setItems(await res.json());
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, []);

  async function handleSave(data: OportunidadInput) {
    const url = editing ? `/api/oportunidades/${editing.id}` : "/api/oportunidades";
    const method = editing ? "PUT" : "POST";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setCreating(false);
    setEditing(null);
    fetchData();
  }

  async function handleDelete(id: number) {
    if (!confirm("¿Eliminar este elemento?")) return;
    await fetch(`/api/oportunidades/${id}`, { method: "DELETE" });
    fetchData();
  }

  return (
    <RoleGuard allowed={["ADMIN", "USER"]}>
      <div className="mb-16 flex items-center justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#0d2c4f]">
            Gestión de Oportunidades
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Administra las oportunidades publicadas
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button className={btnPrimarySm} onClick={() => setCreating(true)}>
            + Crear oportunidad
          </button>
        </div>
      </div>

      {(creating || editing) && (
        <OportunidadModal
          key={editing?.id ?? "new"}
          oportunidad={editing}
          onSave={handleSave}
          onCancel={() => {
            setCreating(false);
            setEditing(null);
          }}
        />
      )}

      {items.length === 0 ? (
        <div className="p-12 text-center text-slate-400">
          <div className="mb-6 text-[3rem] opacity-50">🎓</div>
          <p>No hay oportunidades creadas.</p>
        </div>
      ) : (
        <table className={tableClass}>
          <thead>
            <tr>
              <th className={thClass}>Título</th>
              <th className={thClass}>Tipo</th>
              <th className={thClass}>Año</th>
              <th className={thClass}>Fecha límite</th>
              <th className={thClass}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((o) => (
              <tr key={o.id}>
                <td className={`${tdClass} font-semibold text-[#0d2c4f]`}>
                  {o.title}
                </td>
                <td className={tdClass}>
                  <span className={`${badgeBase} ${badgeVariant(o.type)}`}>
                    {o.type}
                  </span>
                </td>
                <td className={tdClass}>{o.year}</td>
                <td className={tdClass}>
                  {o.deadline
                    ? new Date(o.deadline).toLocaleDateString("es-PE")
                    : "—"}
                </td>
                <td className={tdClass}>
                  <div className="flex gap-1.5">
                    <button
                      className={`${btnGhostPlain} text-cyan-400`}
                      onClick={() => setEditing(o)}
                    >
                      Editar
                    </button>
                    <button
                      className={`${btnGhostPlain} text-red-400`}
                      onClick={() => handleDelete(o.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </RoleGuard>
  );
}
