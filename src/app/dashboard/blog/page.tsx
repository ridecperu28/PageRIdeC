"use client";

import { useState, useEffect } from "react";
import RoleGuard from "@/components/admin/RoleGuard";
import BlogModal, { type BlogItem, type BlogInput } from "./BlogModal";

const btnPrimarySm =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 py-2 font-[family-name:var(--font-body)] text-sm leading-none font-semibold text-[#060b18] no-underline transition duration-200 hover:-translate-y-px hover:bg-cyan-500 hover:shadow-[0_4px_16px_rgba(34,211,238,0.3)] active:translate-y-0";
const btnGhostSm =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-transparent px-4 py-2 font-[family-name:var(--font-body)] text-sm leading-none font-semibold no-underline transition duration-200 hover:-translate-y-px hover:bg-[#f7f9fc] active:translate-y-0";
const badgeBase =
  "inline-block rounded-lg px-2 py-[0.2rem] text-[0.7rem] font-bold uppercase";
const badgeVariants: Record<string, string> = {
  pending: "bg-[rgba(234,179,8,0.15)] text-[#facc15]",
  colaborador: "bg-[rgba(234,179,8,0.15)] text-[#facc15]",
  approved: "bg-[rgba(34,197,94,0.15)] text-[#4ade80]",
  rejected: "bg-[rgba(239,68,68,0.15)] text-[#f87171]",
  admin: "bg-cyan-400/15 text-[#22d3ee]",
  miembro: "bg-[rgba(148,163,184,0.15)] text-[#94a3b8]",
};
const tableClass =
  "w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white [border-collapse:separate] [border-spacing:0] [&_tr:last-child_td]:border-b-0";
const thClass =
  "border-b border-white/[0.06] bg-white/[0.02] px-4 py-3 text-left text-sm font-semibold tracking-[0.05em] text-[#94a3b8] uppercase";
const tdClass =
  "border-b border-white/[0.04] px-4 py-3 text-sm text-[#333]";

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
      <div className="mb-16 flex items-center justify-between">
        <div>
          <h1 className="m-0 font-[family-name:var(--font-heading)] text-2xl font-bold text-[#0d2c4f]">
            Gestión de Blog
          </h1>
          <p className="mt-1 text-sm text-[#94a3b8]">
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
        <div className="p-12 text-center text-[#94a3b8]">
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
              <th className={thClass}>Acciones</th>
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
                <td className={`${tdClass} font-mono text-xs text-[#94a3b8]`}>
                  {b.slug}
                </td>
                <td className={tdClass}>
                  <div className="flex gap-[0.35rem]">
                    <button
                      className={`${btnGhostSm} text-[#22d3ee]`}
                      onClick={() => setEditing(b)}
                    >
                      Editar
                    </button>
                    <button
                      className={`${btnGhostSm} text-[#f87171]`}
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
