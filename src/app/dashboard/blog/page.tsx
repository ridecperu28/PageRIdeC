"use client";

import { useState, useEffect } from "react";
import RoleGuard from "@/components/admin/RoleGuard";
import BlogModal, { type BlogItem, type BlogInput } from "./BlogModal";

export default function BlogPage() {
  const [items, setItems] = useState<BlogItem[]>([]);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<BlogItem | null>(null);

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
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">Gestión de Blog</h1>
          <p className="admin-header__subtitle">
            Administra las publicaciones del blog
          </p>
        </div>
        <div className="admin-header__actions">
          <button
            className="btn btn--primary btn--sm"
            onClick={() => setCreating(true)}
          >
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
        <div className="admin-empty">
          <div className="admin-empty__icon">📝</div>
          <p>No hay publicaciones en el blog.</p>
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Estado</th>
              <th>Slug</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((b) => (
              <tr key={b.id}>
                <td style={{ fontWeight: 600, color: "var(--c-heading)" }}>
                  {b.title}
                </td>
                <td>{b.author}</td>
                <td>
                  <span
                    className={`admin-badge admin-badge--${b.published ? "approved" : "pending"}`}
                  >
                    {b.published ? "Publicado" : "Borrador"}
                  </span>
                </td>
                <td
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.75rem",
                    color: "var(--c-text-muted)",
                  }}
                >
                  {b.slug}
                </td>
                <td>
                  <div className="admin-actions">
                    <button
                      className="btn btn--ghost btn--sm"
                      style={{ color: "var(--c-cyan)" }}
                      onClick={() => setEditing(b)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn--ghost btn--sm"
                      style={{ color: "#f87171" }}
                      onClick={() => handleDelete(b.id)}
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
