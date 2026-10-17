import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/eventos", label: "Eventos" },
  { href: "/oportunidades", label: "Oportunidades" },
  { href: "/blog", label: "Blog" },
];

const socials = [
  { icon: "/images/redes-sociales/icons8-instagram-50.svg", label: "Instagram", href: "https://www.instagram.com/ridecperu/" },
  { icon: "/images/redes-sociales/icons8-facebook-50.svg", label: "Facebook", href: "https://www.facebook.com/RIDECPERUOFICIAL" },
  { icon: "/images/redes-sociales/icons8-linkedin-50.svg", label: "LinkedIn", href: "https://www.linkedin.com/company/red-interuniversitaria-de-ciencia-ridec/" },
  { icon: "/images/redes-sociales/icons8-youtube-50.svg", label: "YouTube", href: "https://www.youtube.com/@ridec-peru5886" },
  // { icon: "/images/redes-sociales/icons8-whatsapp-50.svg", label: "WhatsApp", href: "#" },
  { icon: "/images/redes-sociales/icons8-tiktok-50.svg", label: "TikTok", href: "https://www.tiktok.com/@ridecperu" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#0d2c4f] text-white">
      <div className="mx-auto max-w-[1200px] px-4 pt-12 md:px-8 md:pt-16">
        <div className="grid grid-cols-2 gap-8 border-b border-white/10 pb-12 md:grid-cols-[1.5fr_1fr_1fr] md:gap-12">
          {/* Brand */}
          <div className="col-span-full flex flex-col gap-4 md:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-[family-name:var(--font-heading)] text-xl font-bold"
            >
              <Image src="/images/logo.png" alt="RIdeC" width={40} height={40} />
              <span>RIdeC</span>
            </Link>
            <p className="max-w-[280px] text-sm leading-[1.6] text-slate-400">
              Red iberoamericana de estudiantes y profesionales que impulsa las
              ciencias básicas, reduce la deserción y genera comunidad.
            </p>
            <div className="mt-2 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.08] transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-400/20"
                  aria-label={s.label}
                >
                  <Image src={s.icon} alt={s.label} width={20} height={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Navegación */}
          <div className="flex flex-col gap-4">
            <h4 className="mb-2 font-[family-name:var(--font-heading)] text-sm font-bold tracking-[0.05em] text-white uppercase">
              Navegación
            </h4>
            <ul className="flex flex-col gap-[0.6rem]">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-400 transition-colors duration-200 hover:text-cyan-400"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="flex flex-col gap-4">
            <h4 className="mb-2 font-[family-name:var(--font-heading)] text-sm font-bold tracking-[0.05em] text-white uppercase">
              Contacto
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-2 text-sm text-slate-400">
                <span className="text-base">📧</span> ridecperu@gmail.com
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-400">
                <span className="text-base">📍</span> Lima, Perú
              </li>
              {/* <li className="flex items-center gap-2 text-sm text-slate-400">
                <span className="text-base">📱</span> +51 -- --- ----
              </li> */}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 py-6 text-center md:flex-row md:text-left">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} RIdeC — Red Iberoamericana de Ciencias. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-xs text-slate-500 transition-colors duration-200 hover:text-cyan-400"
            >
              Política de privacidad
            </Link>
            <Link
              href="#"
              className="text-xs text-slate-500 transition-colors duration-200 hover:text-cyan-400"
            >
              Términos de uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
