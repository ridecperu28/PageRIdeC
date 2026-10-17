"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { badgeBase, badgeVariants, btnPrimary } from "@/components/admin/ui";

const fieldLabel =
  "mb-1 text-[0.75rem] tracking-[0.05em] text-slate-400 uppercase";
const fieldValue = "font-semibold text-[#0d2c4f]";

export default function PerfilPage() {
  const { user } = useAuth();

  if (!user) {
    return <p className="text-slate-400">Cargando...</p>;
  }

  return (
    <div className="flex justify-center py-8">
      <section className="m-auto w-full max-w-[480px] rounded-[20px] border border-gray-200 bg-white px-8 py-12 shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
        <h1 className="mb-1 font-[family-name:var(--font-heading)] text-2xl font-bold">
          Mi perfil
        </h1>
        <p className="mb-6 text-sm text-slate-400">
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
          <Link href="/" className={`${btnPrimary} w-full`}>
            Volver al inicio
          </Link>
        </div>
      </section>
    </div>
  );
}
