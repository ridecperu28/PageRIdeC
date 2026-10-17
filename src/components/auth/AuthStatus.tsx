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
  "inline-flex items-center justify-center rounded-2xl border border-white/10 px-4 py-2 text-sm leading-none font-semibold transition duration-200 hover:-translate-y-px hover:bg-white/10 active:translate-y-0";
const btnGhostSm =
  "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm leading-none font-semibold transition duration-200 hover:-translate-y-px hover:bg-slate-50 active:translate-y-0";
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
      <span className="text-sm font-medium">
        {user.name}
        {user.role === "admin" && <span className={userBadge}>Admin</span>}
        {user.role === "colaborador" && (
          <span className={`${userBadge} bg-yellow-400`}>Colab</span>
        )}
      </span>
      {user.role === "admin" && (
        <Link
          href="/dashboard/estadisticas"
          className={`${btnGhostSm} text-cyan-400`}
        >
          Panel
        </Link>
      )}
      {user.role === "colaborador" && (
        <Link href="/dashboard/eventos" className={`${btnGhostSm} text-cyan-400`}>
          Crear
        </Link>
      )}
      {user.role === "miembro" && (
        <Link href="/dashboard/perfil" className={`${btnGhostSm} text-cyan-400`}>
          Mi perfil
        </Link>
      )}
      <button
        className={`${btnGhostSm} cursor-pointer text-slate-400`}
        onClick={handleLogout}
      >
        Salir
      </button>
    </div>
  );
}
