"use client";

import { useState, useEffect } from "react";
import RoleGuard from "@/components/admin/RoleGuard";
import {
  badgeBase,
  badgeVariants,
  btnGhostPlain,
  btnPrimarySm,
  tableClass,
  tdClass,
  thClass,
} from "@/components/admin/ui";

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
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#0d2c4f]">
            Gestión de Usuarios
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Aprueba o rechaza registros de nuevos miembros
          </p>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="p-12 text-center text-slate-400">
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
                  <div className="flex gap-1.5">
                    {u.status === "pending" && (
                      <>
                        <button
                          className={btnPrimarySm}
                          onClick={() => updateUserStatus(u.id, "approved")}
                        >
                          Aprobar
                        </button>
                        <button
                          className={`${btnGhostPlain} text-red-400`}
                          onClick={() => updateUserStatus(u.id, "rejected")}
                        >
                          Rechazar
                        </button>
                      </>
                    )}
                    {u.status === "approved" && (
                      <button
                        className={`${btnGhostPlain} text-yellow-400`}
                        onClick={() => updateUserStatus(u.id, "pending")}
                      >
                        Revocar
                      </button>
                    )}
                    {u.status === "rejected" && (
                      <button
                        className={`${btnGhostPlain} text-green-400`}
                        onClick={() => updateUserStatus(u.id, "approved")}
                      >
                        Aprobar
                      </button>
                    )}
                    <button
                      className={`${btnGhostPlain} text-red-400`}
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
