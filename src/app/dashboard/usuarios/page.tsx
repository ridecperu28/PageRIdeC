"use client";

import { useState, useEffect } from "react";
import RoleGuard from "@/components/admin/RoleGuard";

const btnPrimarySm =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 py-2 font-[family-name:var(--font-body)] text-sm leading-none font-semibold text-[#060b18] no-underline transition duration-200 hover:-translate-y-px hover:bg-cyan-500 hover:shadow-[0_4px_16px_rgba(34,211,238,0.3)] active:translate-y-0";
const btnGhostSm =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-transparent px-4 py-2 font-[family-name:var(--font-body)] text-sm leading-none font-semibold no-underline transition duration-200 hover:-translate-y-px hover:bg-[#f7f9fc] active:translate-y-0";
const badgeBase =
  "inline-block rounded-lg px-2 py-[0.2rem] text-[0.7rem] font-bold uppercase";
const badgeVariants: Record<string, string> = {
  pending: "bg-[rgba(234,179,8,0.15)] text-[#facc15]",
  approved: "bg-[rgba(34,197,94,0.15)] text-[#4ade80]",
  rejected: "bg-[rgba(239,68,68,0.15)] text-[#f87171]",
  admin: "bg-cyan-400/15 text-[#22d3ee]",
  colaborador: "bg-[rgba(234,179,8,0.15)] text-[#facc15]",
  miembro: "bg-[rgba(148,163,184,0.15)] text-[#94a3b8]",
};
const tableClass =
  "w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white [border-collapse:separate] [border-spacing:0] [&_tr:last-child_td]:border-b-0";
const thClass =
  "border-b border-white/[0.06] bg-white/[0.02] px-4 py-3 text-left text-sm font-semibold tracking-[0.05em] text-[#94a3b8] uppercase";
const tdClass =
  "border-b border-white/[0.04] px-4 py-3 text-sm text-[#333]";

function badgeClass(key: string) {
  return `${badgeBase} ${badgeVariants[key] ?? ""}`;
}

interface User {
  id: number;
  name: string;
  email: string;
  university: string | null;
  role: string;
  status: string;
  createdAt: string;
}

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/users");
      setUsers(await res.json());
    })();
  }, []);

  async function updateUserStatus(id: number, status: string) {
    await fetch(`/api/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setUsers(users.map((u) => (u.id === id ? { ...u, status } : u)));
  }

  async function deleteUser(id: number) {
    if (!confirm("¿Eliminar este usuario?")) return;
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    setUsers(users.filter((u) => u.id !== id));
  }

  return (
    <RoleGuard allowed={["ADMIN"]}>
      <div className="mb-16 flex items-center justify-between">
        <div>
          <h1 className="m-0 font-[family-name:var(--font-heading)] text-2xl font-bold text-[#0d2c4f]">
            Gestión de Usuarios
          </h1>
          <p className="mt-1 text-sm text-[#94a3b8]">
            Aprueba o rechaza registros de nuevos miembros
          </p>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="p-12 text-center text-[#94a3b8]">
          <div className="mb-6 text-[3rem] opacity-50">👥</div>
          <p>No hay usuarios registrados aún.</p>
        </div>
      ) : (
        <table className={tableClass}>
          <thead>
            <tr>
              <th className={thClass}>Nombre</th>
              <th className={thClass}>Email</th>
              <th className={thClass}>Universidad</th>
              <th className={thClass}>Rol</th>
              <th className={thClass}>Estado</th>
              <th className={thClass}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className={`${tdClass} font-semibold text-[#0d2c4f]`}>
                  {u.name}
                </td>
                <td className={tdClass}>{u.email}</td>
                <td className={tdClass}>{u.university || "—"}</td>
                <td className={tdClass}>
                  <span className={badgeClass(u.role)}>{u.role}</span>
                </td>
                <td className={tdClass}>
                  <span className={badgeClass(u.status)}>{u.status}</span>
                </td>
                <td className={tdClass}>
                  <div className="flex gap-[0.35rem]">
                    {u.status === "pending" && (
                      <>
                        <button
                          className={btnPrimarySm}
                          onClick={() => updateUserStatus(u.id, "approved")}
                        >
                          Aprobar
                        </button>
                        <button
                          className={`${btnGhostSm} text-[#f87171]`}
                          onClick={() => updateUserStatus(u.id, "rejected")}
                        >
                          Rechazar
                        </button>
                      </>
                    )}
                    {u.status === "approved" && (
                      <button
                        className={`${btnGhostSm} text-[#facc15]`}
                        onClick={() => updateUserStatus(u.id, "pending")}
                      >
                        Revocar
                      </button>
                    )}
                    {u.status === "rejected" && (
                      <button
                        className={`${btnGhostSm} text-[#4ade80]`}
                        onClick={() => updateUserStatus(u.id, "approved")}
                      >
                        Aprobar
                      </button>
                    )}
                    <button
                      className={`${btnGhostSm} text-[#f87171]`}
                      onClick={() => deleteUser(u.id)}
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
