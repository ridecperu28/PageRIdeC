"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserInfo {
  role: string;
  email: string;
  name: string;
}

const btnOutlineSm =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/10 bg-transparent px-4 py-2 font-[family-name:var(--font-body)] text-sm leading-none font-semibold text-white no-underline transition duration-200 hover:-translate-y-px hover:bg-white/10 active:translate-y-0";
const btnGhostSm =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-transparent px-4 py-2 font-[family-name:var(--font-body)] text-sm leading-none font-semibold no-underline transition duration-200 hover:-translate-y-px hover:bg-[#f7f9fc] active:translate-y-0";
const userBadge =
  "inline-block rounded-lg bg-cyan-400 px-[0.4rem] py-[0.15rem] text-[0.65rem] font-bold tracking-[0.05em] text-[#060b18] uppercase";

export default function AuthStatus() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("ridec-user");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setUser(JSON.parse(stored));
  }, []);

  function handleLogout() {
    localStorage.removeItem("ridec-user");
    router.push("/login");
  }

  if (!user) {
    return (
      <Link href="/login" className={`${btnOutlineSm} max-md:hidden`}>
        Iniciar sesión
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-white">
        {user.name}
        {user.role === "admin" && <span className={userBadge}>Admin</span>}
        {user.role === "colaborador" && (
          <span className={`${userBadge} bg-[#facc15]`}>Colab</span>
        )}
      </span>
      {user.role === "admin" && (
        <Link
          href="/dashboard/estadisticas"
          className={`${btnGhostSm} text-[#22d3ee]`}
        >
          Panel
        </Link>
      )}
      {user.role === "colaborador" && (
        <Link href="/dashboard/eventos" className={`${btnGhostSm} text-[#22d3ee]`}>
          Crear
        </Link>
      )}
      {user.role === "miembro" && (
        <Link href="/dashboard/perfil" className={`${btnGhostSm} text-[#22d3ee]`}>
          Mi perfil
        </Link>
      )}
      <button
        className={`${btnGhostSm} text-[#94a3b8]`}
        onClick={handleLogout}
      >
        Salir
      </button>
    </div>
  );
}
