"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AuthStatus from "./auth/AuthStatus";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/eventos", label: "Eventos" },
  { href: "/oportunidades", label: "Oportunidades" },
  { href: "/blog", label: "Blog" },
];

const navLink =
  "relative px-2 py-[0.4rem] text-sm font-medium transition-colors after:absolute after:right-2 after:bottom-0 after:left-2 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-sm after:bg-cyan-400 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-cyan-400 hover:after:scale-x-100 max-md:border-b max-md:border-white/10 max-md:px-0 max-md:py-3 max-md:text-base max-md:after:hidden";
const navLinkActive = "text-cyan-400 after:scale-x-100 max-md:text-cyan-400";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  const isHome = pathname === "/";

  const navClass = [
    "sticky top-0 z-50 flex items-center gap-6 px-8 py-4 text-white transition-[background,backdrop-filter,box-shadow,border-radius] duration-300 max-md:px-4 max-md:py-2",
    !isHome && "bg-[#0d2c4f]",
    scrolled && "rounded-b-2xl shadow-[0_4px_24px_rgba(0,0,0,0.2)]",
    scrolled &&
      (isHome
        ? "bg-[rgba(13,44,79,0.75)] backdrop-blur-md"
        : "bg-[rgba(13,44,79,0.85)] backdrop-blur-md"),
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <nav className={navClass}>
        <Link
          href="/"
          className="flex items-center gap-2 font-[family-name:var(--font-heading)] text-lg font-bold"
          onClick={closeMenu}
        >
          <Image
            src="/images/logo.png"
            alt="RIdeC"
            width={100}
            height={100}
            className="rounded-lg"
          />
          {/* <span>RIdeC</span> */}
        </Link>

        <ul
          className={[
            "flex gap-4",
            "max-md:fixed max-md:top-0 max-md:right-0 max-md:z-[60] max-md:h-screen max-md:w-[min(280px,80vw)] max-md:flex-col max-md:gap-0 max-md:bg-[rgba(13,44,79,0.95)] max-md:px-8 max-md:pt-20 max-md:pb-8 max-md:shadow-[-4px_0_24px_rgba(0,0,0,0.3)] max-md:backdrop-blur-lg max-md:transition-transform max-md:duration-300 max-md:ease-[cubic-bezier(0.25,1,0.5,1)]",
            menuOpen ? "max-md:translate-x-0" : "max-md:translate-x-full",
          ].join(" ")}
        >
          {links.map((l) => (
            <li key={l.href}>
              <Link
                className={`${navLink}${pathname === l.href ? ` ${navLinkActive}` : ""}`}
                href={l.href}
                onClick={closeMenu}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-4 max-md:hidden">
          <AuthStatus />
        </div>

        <button
          className="ml-auto hidden h-9 w-9 cursor-pointer flex-col justify-center gap-[5px] p-1.5 max-md:flex"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menú"
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-0.5 w-full rounded-sm bg-white transition-[transform,opacity] duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-full rounded-sm bg-white transition-[transform,opacity] duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-full rounded-sm bg-white transition-[transform,opacity] duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {menuOpen && (
        <div
          className="hidden fixed inset-0 z-[55] bg-black/40 max-md:block"
          onClick={closeMenu}
        />
      )}
    </>
  );
}
