"use client";

import { useState, useEffect } from "react";
import RoleGuard from "@/components/admin/RoleGuard";
import EventoModal, {
  type EventoItem,
  type EventoInput,
} from "./EventoModal";

export default function EventosPage() {
  const [items, setItems] = useState<EventoItem[]>([]);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<EventoItem | null>(null);

  const fetchData = async () => {
    const res = await fetch("/api/eventos");
    setItems(await res.json());
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, []);

  async function handleSave(data: EventoInput) {
    const url = editing ? `/api/eventos/${editing.id}` : "/api/eventos";
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
    await fetch(`/api/eventos/${id}`, { method: "DELETE" });
    fetchData();
  }

  return (
    <RoleGuard allowed={["ADMIN", "USER"]}>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">Gestión de Eventos</h1>
          <p className="admin-header__subtitle">
            Administra los eventos de la plataforma
          </p>
        </div>
        <div className="admin-header__actions">
          <button
            className="btn btn--primary btn--sm"
            onClick={() => setCreating(true)}
          >
            + Crear evento
          </button>
        </div>
      </div>

      {(creating || editing) && (
        <EventoModal
          key={editing?.id ?? "new"}
          evento={editing}
          onSave={handleSave}
          onCancel={() => {
            setCreating(false);
            setEditing(null);
          }}
        />
      )}

      {items.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty__icon">📅</div>
          <p>No hay eventos creados.</p>
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Fecha</th>
              <th>Categoría</th>
              <th>Destacado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((e) => (
              <tr key={e.id}>
                <td style={{ fontWeight: 600, color: "var(--c-heading)" }}>
                  {e.title}
                </td>
                <td>{new Date(e.date).toLocaleDateString("es-PE")}</td>
                <td>
                  <span
                    className={`admin-badge admin-badge--${e.category === "ec" ? "approved" : "colaborador"}`}
                  >
                    {e.category}
                  </span>
                </td>
                <td>{e.featured ? "⭐" : "—"}</td>
                <td>
                  <div className="admin-actions">
                    <button
                      className="btn btn--ghost btn--sm"
                      style={{ color: "var(--c-cyan)" }}
                      onClick={() => setEditing(e)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn--ghost btn--sm"
                      style={{ color: "#f87171" }}
                      onClick={() => handleDelete(e.id)}
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
