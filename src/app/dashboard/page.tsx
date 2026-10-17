"use client";

import { useAuth } from "@/context/AuthContext";
import { badgeBase, badgeVariants } from "@/components/admin/ui";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return <p className="text-slate-400">Cargando...</p>;
  }

  const badgeKey = user.role === "admin" ? "admin" : user.role;

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-12 text-center">
      <div>
        <p className="text-sm text-slate-400">Bienvenido de nuevo</p>
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
