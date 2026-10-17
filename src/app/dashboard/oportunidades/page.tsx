"use client";

import { useState, useEffect } from "react";
import RoleGuard from "@/components/admin/RoleGuard";
import OportunidadModal, {
  type OportunidadItem,
  type OportunidadInput,
} from "./OportunidadModal";

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
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">Gestión de Oportunidades</h1>
          <p className="admin-header__subtitle">
            Administra las oportunidades publicadas
          </p>
        </div>
        <div className="admin-header__actions">
          <button
            className="btn btn--primary btn--sm"
            onClick={() => setCreating(true)}
          >
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
        <div className="admin-empty">
          <div className="admin-empty__icon">🎓</div>
          <p>No hay oportunidades creadas.</p>
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Tipo</th>
              <th>Año</th>
              <th>Fecha límite</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((o) => (
              <tr key={o.id}>
                <td style={{ fontWeight: 600, color: "var(--c-heading)" }}>
                  {o.title}
                </td>
                <td>
                  <span
                    className={`admin-badge admin-badge--${o.type === "becas" ? "approved" : o.type === "congresos" ? "admin" : o.type === "traslados" ? "colaborador" : "miembro"}`}
                  >
                    {o.type}
                  </span>
                </td>
                <td>{o.year}</td>
                <td>
                  {o.deadline
                    ? new Date(o.deadline).toLocaleDateString("es-PE")
                    : "—"}
                </td>
                <td>
                  <div className="admin-actions">
                    <button
                      className="btn btn--ghost btn--sm"
                      style={{ color: "var(--c-cyan)" }}
                      onClick={() => setEditing(o)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn--ghost btn--sm"
                      style={{ color: "#f87171" }}
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
