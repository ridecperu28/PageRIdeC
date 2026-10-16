"use client";

import { useState, useEffect } from "react";
import RoleGuard from "@/components/admin/RoleGuard";

interface User {
  id: number;
  name: string;
  email: string;
  university: string | null;
  role: string;
  status: string;
  createdAt: string;
}

export default function EstadisticasPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<{ id: number }[]>([]);
  const [oportunidades, setOportunidades] = useState<{ id: number }[]>([]);
  const [blogPosts, setBlogPosts] = useState<
    { id: number; published: boolean }[]
  >([]);

  useEffect(() => {
    (async () => {
      const [u, e, o, b] = await Promise.all([
        fetch("/api/users").then((r) => r.json()),
        fetch("/api/eventos").then((r) => r.json()),
        fetch("/api/oportunidades").then((r) => r.json()),
        fetch("/api/blog?published=false").then((r) => r.json()),
      ]);
      setUsers(u);
      setEvents(e);
      setOportunidades(o);
      setBlogPosts(b);
    })();
  }, []);

  const pendingCount = users.filter((u) => u.status === "pending").length;

  return (
    <RoleGuard allowed={["ADMIN"]}>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">Estadísticas</h1>
          <p className="admin-header__subtitle">
            Resumen general de la plataforma
          </p>
        </div>
      </div>

      <div className="admin-stats">
        <div className="admin-stat">
          <p className="admin-stat__number">{users.length}</p>
          <p className="admin-stat__label">Usuarios totales</p>
        </div>
        <div className="admin-stat">
          <p className="admin-stat__number">
            {users.filter((u) => u.status === "approved").length}
          </p>
          <p className="admin-stat__label">Aprobados</p>
        </div>
        <div className="admin-stat">
          <p className="admin-stat__number">{pendingCount}</p>
          <p className="admin-stat__label">Pendientes</p>
        </div>
        <div className="admin-stat">
          <p className="admin-stat__number">
            {users.filter((u) => u.status === "rejected").length}
          </p>
          <p className="admin-stat__label">Rechazados</p>
        </div>
      </div>

      <div className="admin-stats">
        <div className="admin-stat">
          <p className="admin-stat__number">{events.length}</p>
          <p className="admin-stat__label">Eventos</p>
        </div>
        <div className="admin-stat">
          <p className="admin-stat__number">{oportunidades.length}</p>
          <p className="admin-stat__label">Oportunidades</p>
        </div>
        <div className="admin-stat">
          <p className="admin-stat__number">
            {blogPosts.filter((b) => b.published).length}
          </p>
          <p className="admin-stat__label">Blog publicados</p>
        </div>
        <div className="admin-stat">
          <p className="admin-stat__number">
            {blogPosts.filter((b) => !b.published).length}
          </p>
          <p className="admin-stat__label">Blog borradores</p>
        </div>
      </div>

      {users.length > 0 && (
        <>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--fs-lg)",
              color: "var(--c-heading)",
              margin: "var(--sp-xl) 0 var(--sp-md)",
            }}
          >
            Por universidad
          </h2>
          <div className="admin-stats">
            {Object.entries(
              users.reduce<Record<string, number>>((acc, u) => {
                const uni = u.university || "Sin especificar";
                acc[uni] = (acc[uni] || 0) + 1;
                return acc;
              }, {}),
            )
              .sort((a, b) => b[1] - a[1])
              .map(([uni, count]) => (
                <div className="admin-stat" key={uni}>
                  <p className="admin-stat__number">{count}</p>
                  <p className="admin-stat__label">{uni}</p>
                </div>
              ))}
          </div>
        </>
      )}
    </RoleGuard>
  );
}
