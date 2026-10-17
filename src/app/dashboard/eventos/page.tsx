"use client";

import { useState, useEffect } from "react";
import RoleGuard from "@/components/admin/RoleGuard";
import EventoModal, {
  type EventoItem,
  type EventoInput,
} from "./EventoModal";
import {
  badgeBase,
  badgeVariants,
  btnGhostPlain,
  btnPrimarySm,
  tableClass,
  tdClass,
  thClass,
} from "@/components/admin/ui";
import { useAuth } from "@/context/AuthContext";

export default function EventosPage() {
  const [items, setItems] = useState<EventoItem[]>([]);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<EventoItem | null>(null);

  const { user, loading, logout } = useAuth();

  // PETICION DE DATOS 
  const fetchData = async () => {
    const res = await fetch("/api/eventos?dashboard=true");
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
      <div className="mb-16 flex items-center justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#0d2c4f]">
            Gestión de Eventos
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Administra los eventos de la plataforma
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button className={btnPrimarySm} onClick={() => setCreating(true)}>
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
        <div className="p-12 text-center text-slate-400">
          <div className="mb-6 text-[3rem] opacity-50">📅</div>
          <p>No hay eventos creados.</p>
        </div>
      ) : (
        <table className={tableClass}>
          <thead>
            <tr>
              <th className={thClass}>Título</th>
              <th className={thClass}>Fecha</th>
              <th className={thClass}>Categoría</th>
              <th className={thClass}>Destacado</th>
              <th className={thClass}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((e) => (
              <tr key={e.id}>
                <td className={`${tdClass} font-semibold text-[#0d2c4f]`}>
                  {e.title}
                </td>
                <td className={tdClass}>
                  {new Date(e.date).toLocaleDateString("es-PE")}
                </td>
                <td className={tdClass}>
                  <span
                    className={`${badgeBase} ${
                      e.category === "ec"
                        ? badgeVariants.approved
                        : badgeVariants.colaborador
                    }`}
                  >
                    {e.category}
                  </span>
                </td>


                <td className={tdClass}>{e.featured ? "⭐" : "—"}</td>

                {/* ACCIONES: EDITAR Y ELIMINAR */}

                {(user?.role==="ADMIN" || user?.id===e.creatorId )? 
                <td className={tdClass}>
                  <div className="flex gap-1.5">
                    <button
                      className={`${btnGhostPlain} text-cyan-400`}
                      onClick={() => setEditing(e)}
                    >
                      Editar
                    </button>
                    {/* <button
                      className={`${btnGhostPlain} text-red-400`}
                      onClick={() => handleDelete(e.id)}
                    >
                      Eliminar
                    </button> */}
                  </div>
                </td> : ""}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </RoleGuard>
  );
}
