"use client";

import { useAuth } from "@/context/AuthContext";

export default function RoleGuard({
  allowed,
  children,
}: {
  allowed: string[];
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  if (!user) {
    return <p className="text-[#94a3b8]">Cargando...</p>;
  }

  if (!allowed.includes(user.role)) {
    return (
      <div className="p-12 text-center text-[#94a3b8]">
        <div className="mb-6 text-[3rem] opacity-50">🔒</div>
        <p>Acceso restringido. No tienes permisos para esta sección.</p>
      </div>
    );
  }

  return <>{children}</>;
}
