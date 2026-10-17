"use client";

import { useAuth } from "@/context/AuthContext";

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

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return <p className="text-[#94a3b8]">Cargando...</p>;
  }

  const badgeKey = user.role === "admin" ? "admin" : user.role;

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-12 text-center">
      <div>
        <p className="m-0 text-sm text-[#94a3b8]">Bienvenido de nuevo</p>
        <h1 className="mt-1 mb-2 font-[family-name:var(--font-heading)] text-[1.75rem] text-[#0d2c4f] md:text-[2.25rem]">
          Hola, {user.name}
        </h1>
        <span className={`${badgeBase} ${badgeVariants[badgeKey] ?? ""}`}>
          {user.role}
        </span>
      </div>
    </div>
  );
}
