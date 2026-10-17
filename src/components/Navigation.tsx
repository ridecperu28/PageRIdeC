"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

interface NavLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  menuItems: NavLink[];
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({
  menuItems,
  collapsed,
  onToggle,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const [mounted, setMounted] = useState<boolean>(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // problema de hidratacion
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <aside
      className={cn(
        "min-h-screen border-r transition-all duration-300",
        "border-gray-200/80",
        "bg-white",
        "flex h-full flex-col",
        collapsed ? "w-[60px]" : "w-[160px]",
      )}
    >
      {/* Logo + Toggle — top section */}
      <div className="px-5 py-6">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div
            className={cn(
              "relative h-8 w-8 shrink-0 overflow-hidden",
              "rounded-lg",
            )}
          >
            {/* <Image
              src="/images/logo.jpeg"
              alt="logo"
              fill
              className="object-cover"
            /> */}
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1 overflow-hidden">
              <h1
                className={cn(
                  "text-[15px] font-semibold",
                  "tracking-tight",
                  "text-gray-900",
                )}
              >
                RIDEC
              </h1>
            </div>
          )}
        </Link>
        {/* Toggle button — right of logo when expanded, centered below when collapsed */}
        <div className={cn("mt-3", collapsed && "flex justify-center")}>
          <button
            onClick={onToggle}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cn(
              "flex items-center justify-center rounded-lg transition-colors",
              "text-gray-400 hover:bg-gray-100 hover:text-gray-600",
              collapsed ? "h-8 w-8" : "h-7 w-full gap-2",
            )}
          >
            {collapsed ? (
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            ) : (
              <>
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                  />
                </svg>
                <span className="text-[11px]">Collapse</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="px-3">
        {/*{!collapsed && (
          <p
            className={cn(
              "mb-2 px-3 text-[11px] font-medium uppercase tracking-wider",
              "text-gray-400",
            )}
          >
            Menu
          </p>
        )}
        */}
        <ul className="space-y-0.5">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "group relative flex items-center gap-3 px-3 py-2.5 transition-all duration-150",
                    "rounded-lg",
                    "text-[13px] font-medium",
                    collapsed && "justify-center px-0",
                    isActive
                      ? cn("bg-blue-50", "text-[#0d2c4f]")
                      : cn("text-gray-500", "hover:bg-gray-50 hover:text-gray-900"),
                  )}
                >
                  {isActive && (
                    <div
                      className={cn(
                        "absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full",
                        "bg-[#0d2c4f]",
                      )}
                    />
                  )}
                  {item.icon}
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom — User + Sign out */}
      <div className={cn("border-t", "border-gray-100", "px-3 py-3")}>
        <div
          className={cn("my-2", collapsed ? "mx-auto h-px w-6" : "h-px")}
          style={collapsed ? undefined : {}}
        />

        {/* Logout */}
        <button
          onClick={handleLogout}
          title={collapsed ? "Cerrar sesión" : undefined}
          className={cn(
            "flex w-full items-center gap-3 transition-all duration-150 hover:bg-gray-50",
            "rounded-lg",
            "text-[13px] font-medium",
            "text-gray-400",
            collapsed ? "justify-center px-0 py-2.5" : "px-3 py-2.5",
          )}
        >
          <svg
            className="h-4 w-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          {!collapsed && <span>Cerrar sesión</span>}
        </button>

        {/* User button — navigates to settings */}
        <button
          onClick={() => router.push("/dashboard/perfil")}
          title={
            collapsed ? `${user?.name || "User"} — Configuración` : undefined
          }
          className={cn(
            "flex w-full items-center gap-3 transition-all duration-150 hover:bg-gray-50",
            "rounded-lg",
            "text-[13px] font-medium",
            "text-gray-500",
            collapsed ? "justify-center px-0 py-2.5" : "px-3 py-2.5",
          )}
        >
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium",
              "bg-gray-900",
              "text-white",
            )}
          >
            {mounted ? user?.name?.charAt(0)?.toUpperCase() || "A" : "A"}
          </div>
          {!collapsed && (
            <>
              <div className="min-w-0 flex-1 text-left">
                <p
                  className={cn(
                    "truncate text-[13px] font-medium",
                    "text-gray-900",
                  )}
                >
                  {mounted ? user?.name || "User" : "user@adoc.pe"}
                </p>
                <p className={cn("truncate text-[11px]", "text-gray-400")}>
                  {mounted ? user?.email || "user@adoc.pe" : "user@adoc.pe"}
                </p>
              </div>
              <svg
                className="h-4 w-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
