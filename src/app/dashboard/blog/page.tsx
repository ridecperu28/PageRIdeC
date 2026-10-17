"use client";

import { useState, useEffect } from "react";
import RoleGuard from "@/components/admin/RoleGuard";
import BlogModal, { type BlogItem, type BlogInput } from "./BlogModal";
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

export default function BlogPage() {
  const [items, setItems] = useState<BlogItem[]>([]);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<BlogItem | null>(null);
  
  const {user, loading, logout} = useAuth();

  const fetchData = async () => {
    const res = await fetch("/api/blog?published=false");
    setItems(await res.json());
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, []);

  async function handleSave(data: BlogInput) {
    const url = editing ? `/api/blog/${editing.id}` : "/api/blog";
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
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    fetchData();
  }

  return (
    <RoleGuard allowed={["ADMIN", "USER"]}>
      <div className="mb-16 flex items-center justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#0d2c4f]">
            Gestión de Blog
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Administra las publicaciones del blog
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button className={btnPrimarySm} onClick={() => setCreating(true)}>
            + Crear publicación
          </button>
        </div>
      </div>

      {(creating || editing) && (
        <BlogModal
          key={editing?.id ?? "new"}
          post={editing}
          onSave={handleSave}
          onCancel={() => {
            setCreating(false);
            setEditing(null);
          }}
        />
      )}

      {items.length === 0 ? (
        <div className="p-12 text-center text-slate-400">
          <div className="mb-6 text-[3rem] opacity-50">📝</div>
          <p>No hay publicaciones en el blog.</p>
        </div>
      ) : (
        <table className={tableClass}>
          <thead>
            <tr>
              <th className={thClass}>Título</th>
              <th className={thClass}>Autor</th>
              <th className={thClass}>Estado</th>
              <th className={thClass}>Slug</th>
              {user?.role==="ADMIN" ? <th className={thClass}>Acciones</th> : ""}
            </tr>
          </thead>
          <tbody>
            {items.map((b) => (
              <tr key={b.id}>
                <td className={`${tdClass} font-semibold text-[#0d2c4f]`}>
                  {b.title}
                </td>
                <td className={tdClass}>{b.author}</td>
                <td className={tdClass}>
                  <span
                    className={`${badgeBase} ${
                      b.published
                        ? badgeVariants.approved
                        : badgeVariants.pending
                    }`}
                  >
                    {b.published ? "Publicado" : "Borrador"}
                  </span>
                </td>
                <td className={`${tdClass} font-mono text-xs text-slate-400`}>
                  {b.slug}
                </td>

                {/* ACCIONES : EDITAR , ELIMINAR  */}

                {user?.role === "ADMIN" ? <td className={tdClass}>
                  <div className="flex gap-1.5">
                    <button
                      className={`${btnGhostPlain} text-cyan-400`}
                      onClick={() => setEditing(b)}
                    >
                      Editar
                    </button>
                    <button
                      className={`${btnGhostPlain} text-red-400`}
                      onClick={() => handleDelete(b.id)}
                    >
                      Eliminar
                    </button>
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
