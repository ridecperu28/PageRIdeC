"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

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
const fieldLabel =
  "mb-1 text-[0.75rem] tracking-[0.05em] text-[#94a3b8] uppercase";
const fieldValue = "font-semibold text-[#0d2c4f]";
const btnPrimary =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3 font-[family-name:var(--font-body)] text-base leading-none font-semibold text-[#060b18] no-underline transition duration-200 hover:-translate-y-px hover:bg-cyan-500 hover:shadow-[0_4px_16px_rgba(34,211,238,0.3)] active:translate-y-0";

export default function PerfilPage() {
  const { user } = useAuth();

  if (!user) {
    return <p className="text-[#94a3b8]">Cargando...</p>;
  }

  return (
    <div className="flex justify-center py-8">
      <section className="m-auto w-full max-w-[480px] rounded-[20px] border border-[#e0e0e0] bg-white px-8 py-12 shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
        <h1 className="mt-0 mb-1 font-[family-name:var(--font-heading)] text-2xl font-bold text-[#333]">
          Mi perfil
        </h1>
        <p className="mt-0 mb-6 text-sm text-[#94a3b8]">
          Información de tu cuenta en RIdeC.
        </p>

        <div className="mt-6 flex flex-col gap-4">
          <div>
            <p className={fieldLabel}>Nombre</p>
            <p className={fieldValue}>{user.name}</p>
          </div>
          <div>
            <p className={fieldLabel}>Email</p>
            <p className={fieldValue}>{user.email}</p>
          </div>
          <div>
            <p className={fieldLabel}>Rol</p>
            <span className={`${badgeBase} ${badgeVariants[user.role] ?? ""}`}>
              {user.role}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <Link href="/" className={`${btnPrimary} w-full text-center`}>
            Volver al inicio
          </Link>
        </div>
      </section>
    </div>
  );
}
