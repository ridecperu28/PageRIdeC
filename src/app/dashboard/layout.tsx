"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Providers from "@/components/Providers";
import Sidebar from "@/components/Navigation";

const svgProps = {
  className: "h-4 w-4 shrink-0",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
} as const;

const NAV_ITEMS = [
  {
    href: "/dashboard",
    label: "Inicio",
    icon: (
      <svg {...svgProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
    roles: ["ADMIN", "USER"],
  },
  // {
  //   href: "/dashboard/estadisticas",
  //   label: "Estadísticas",
  //   icon: (
  //     <svg {...svgProps}>
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         strokeWidth={2}
  //         d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
  //       />
  //     </svg>
  //   ),
  //   roles: ["ADMIN"],
  // },
  {
    href: "/dashboard/usuarios",
    label: "Usuarios",
    icon: (
      <svg {...svgProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    roles: ["ADMIN"],
  },
  {
    href: "/dashboard/eventos",
    label: "Eventos",
    icon: (
      <svg {...svgProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    roles: ["ADMIN", "USER"],
  },
  {
    href: "/dashboard/oportunidades",
    label: "Oportunidades",
    icon: (
      <svg {...svgProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 14l9-5-9-5-9 5 9 5zM3 10l9 5 9-5M3 14l9 5 9-5"
        />
      </svg>
    ),
    roles: ["ADMIN", "USER"],
  },
  {
    href: "/dashboard/blog",
    label: "Blog",
    icon: (
      <svg {...svgProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
    roles: ["ADMIN", "USER"],
  },
  // {
  //   href: "/dashboard/perfil",
  //   label: "Mi perfil",
  //   icon: (
  //     <svg {...svgProps}>
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         strokeWidth={2}
  //         d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
  //       />
  //     </svg>
  //   ),
  //   roles: ["ADMIN", "USER"],
  // },
];

function DashboardContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Cargando...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const items = user
    ? NAV_ITEMS.filter((i) => i.roles.includes(user.role))
    : [];

  return (
    <div className="flex min-h-screen bg-[#f7f9fc]">
      <Sidebar
        menuItems={items}
        collapsed={!sidebarOpen}
        onToggle={() => setSidebarOpen((o) => !o)}
      />

      <main className="flex-1 overflow-x-hidden p-16 max-md:px-6 max-md:py-8">{children}</main>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <DashboardContent>{children}</DashboardContent>
    </Providers>
  );
}
