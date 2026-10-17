"use client";

import { useState, useEffect } from "react";
import RoleGuard from "@/components/admin/RoleGuard";

const statGrid =
  "mb-16 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 max-md:grid-cols-2";
const statCard = "rounded-2xl border border-white/[0.06] bg-white p-8";
const statNumber =
  "m-0 font-[family-name:var(--font-heading)] text-[1.25rem] font-bold text-[#0d2c4f] md:text-[1.75rem]";
const statLabel = "mt-1 text-sm text-[#94a3b8]";

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
      <div className="mb-16 flex items-center justify-between">
        <div>
          <h1 className="m-0 font-[family-name:var(--font-heading)] text-2xl font-bold text-[#0d2c4f]">
            Estadísticas
          </h1>
          <p className="mt-1 text-sm text-[#94a3b8]">
            Resumen general de la plataforma
          </p>
        </div>
      </div>

      <div className={statGrid}>
        <div className={statCard}>
          <p className={statNumber}>{users.length}</p>
          <p className={statLabel}>Usuarios totales</p>
        </div>
        <div className={statCard}>
          <p className={statNumber}>
            {users.filter((u) => u.status === "approved").length}
          </p>
          <p className={statLabel}>Aprobados</p>
        </div>
        <div className={statCard}>
          <p className={statNumber}>{pendingCount}</p>
          <p className={statLabel}>Pendientes</p>
        </div>
        <div className={statCard}>
          <p className={statNumber}>
            {users.filter((u) => u.status === "rejected").length}
          </p>
          <p className={statLabel}>Rechazados</p>
        </div>
      </div>

      <div className={statGrid}>
        <div className={statCard}>
          <p className={statNumber}>{events.length}</p>
          <p className={statLabel}>Eventos</p>
        </div>
        <div className={statCard}>
          <p className={statNumber}>{oportunidades.length}</p>
          <p className={statLabel}>Oportunidades</p>
        </div>
        <div className={statCard}>
          <p className={statNumber}>
            {blogPosts.filter((b) => b.published).length}
          </p>
          <p className={statLabel}>Blog publicados</p>
        </div>
        <div className={statCard}>
          <p className={statNumber}>
            {blogPosts.filter((b) => !b.published).length}
          </p>
          <p className={statLabel}>Blog borradores</p>
        </div>
      </div>

      {users.length > 0 && (
        <>
          <h2 className="mt-12 mb-6 font-[family-name:var(--font-heading)] text-lg text-[#0d2c4f]">
            Por universidad
          </h2>
          <div className={statGrid}>
            {Object.entries(
              users.reduce<Record<string, number>>((acc, u) => {
                const uni = u.university || "Sin especificar";
                acc[uni] = (acc[uni] || 0) + 1;
                return acc;
              }, {}),
            )
              .sort((a, b) => b[1] - a[1])
              .map(([uni, count]) => (
                <div className={statCard} key={uni}>
                  <p className={statNumber}>{count}</p>
                  <p className={statLabel}>{uni}</p>
                </div>
              ))}
          </div>
        </>
      )}
    </RoleGuard>
  );
}
