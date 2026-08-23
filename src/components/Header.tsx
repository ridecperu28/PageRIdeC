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

  return (
    <>
      <nav className={`nav${isHome ? "" : " nav--solid"}${scrolled ? " nav--scrolled" : ""}`}>
        <Link href="/" className="nav__brand" onClick={closeMenu}>
          <Image
            src="/images/logo.png"
            alt="RIdeC"
            width={100}
            height={100}
            className="nav__logo"
          />
          {/* <span>RIdeC</span> */}
        </Link>

        <ul className={`nav__links${menuOpen ? " nav__links--open" : ""}`}>
          {links.map((l) => (
            <li key={l.href}>
              <Link
                className={`nav__link${pathname === l.href ? " nav__link--active" : ""}`}
                href={l.href}
                onClick={closeMenu}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav__right">
          <AuthStatus />
        </div>

        <button
          className={`nav__toggle${menuOpen ? " nav__toggle--open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menú"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {menuOpen && (
        <div className="nav__backdrop" onClick={closeMenu} />
      )}
    </>
  );
}
