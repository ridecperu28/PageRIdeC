"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  Children,
  type ReactNode,
  type FormEvent,
} from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import NetworkBackground from "@/components/NetworkBackground";
import { ods } from "@/data/ods";

interface Feature {
  icon: string;
  title: string;
  description: string;
  href?: string | null;
}

interface EventItem {
  title: string;
  description: string;
  date: string;
  category: "ec" | "gl";
  tagLabel: string;
  image: string;
  location?: string | null;
}

const features: Feature[] = [
  {
    icon: "🔬",
    title: "Investigación",
    description: "Impulsamos las ciencias básicas.",
    href: null,
  },
  {
    icon: "🤝",
    title: "Comunidad",
    description: "Conectamos estudiantes y profesionales.",
    href: null,
  },
  {
    icon: "🚀",
    title: "Divulgación",
    description: "Acercamos la ciencia a la sociedad.",
    href: null,
  },
];

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
};

const item = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

function Slider({
  children,
  visibleCount = 3,
}: {
  children: ReactNode;
  visibleCount?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const [cardWidth, setCardWidth] = useState(336);
  const count = Children.count(children);
  const maxIdx = Math.max(0, count - visibleCount);

  useEffect(() => {
    function measure() {
      if (trackRef.current) {
        const first = trackRef.current.children[0] as HTMLElement;
        if (first) {
          const gap = parseInt(getComputedStyle(trackRef.current).gap) || 24;
          setCardWidth(first.offsetWidth + gap);
        }
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const clamp = useCallback(
    (i: number) => Math.max(0, Math.min(i, maxIdx)),
    [maxIdx]
  );

  return (
    <div className="relative overflow-hidden">
      <div
        ref={trackRef}
        className="flex gap-6 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{ transform: `translateX(-${slideIdx * cardWidth}px)` }}
      >
        {children}
      </div>

      {slideIdx > 0 && (
        <button
          className="absolute left-0 top-1/2 z-[2] flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-[1.2rem] text-[#0d2c4f] shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-colors duration-200 hover:bg-slate-200"
          onClick={() => setSlideIdx((i) => clamp(i - 1))}
          aria-label="Anterior"
        >
          &#8249;
        </button>
      )}
      {slideIdx < maxIdx && (
        <button
          className="absolute right-0 top-1/2 z-[2] flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-[1.2rem] text-[#0d2c4f] shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-colors duration-200 hover:bg-slate-200"
          onClick={() => setSlideIdx((i) => clamp(i + 1))}
          aria-label="Siguiente"
        >
          &#8250;
        </button>
      )}
    </div>
  );
}

const groupClass = "flex flex-col gap-1.5";
const labelClass = "text-sm font-medium text-slate-200";
const fieldBase =
  "w-full rounded-xl border border-white/15 bg-white/[0.08] text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.15)]";
const inputClass = `${fieldBase} px-[0.9rem] py-[0.6rem] text-base`;
const textareaClass = `${fieldBase} resize-none px-4 py-3 text-sm`;
const errorClass = "mt-1 text-xs text-[#ff6b6b]";
const successClass =
  "rounded-xl border border-cyan-400/30 bg-cyan-400/15 px-6 py-4 text-sm font-medium text-cyan-400";
const submitClass =
  "mt-2 inline-flex items-center justify-center gap-2 self-start rounded-2xl bg-cyan-400 px-6 py-3 text-base leading-none font-semibold text-[#060b18] transition hover:-translate-y-px hover:bg-cyan-500 hover:shadow-[0_4px_16px_rgba(34,211,238,0.3)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60";

type ContactForm = {
  nombre: string;
  email: string;
  mensaje: string;
};

type ContactErrors = Partial<Record<keyof ContactForm, string>>;

function FormularioContacto() {
  const [form, setForm] = useState<ContactForm>({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [errores, setErrores] = useState<ContactErrors>({});
  const [loading, setLoading] = useState(false);
  const [exito, setExito] = useState(false);

  const validar = (): ContactErrors => {
    const e: ContactErrors = {};
    if (!form.nombre.trim()) e.nombre = "El nombre es obligatorio";
    else if (form.nombre.trim().length < 2) e.nombre = "Mínimo 2 caracteres";

    if (!form.email.trim()) e.email = "El email es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = "Email no válido";

    if (!form.mensaje.trim()) e.mensaje = "El mensaje es obligatorio";
    else if (form.mensaje.trim().length < 10)
      e.mensaje = "Mínimo 10 caracteres";

    return e;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setExito(false);

    const v = validar();
    setErrores(v);
    if (Object.keys(v).length > 0) return;

    setLoading(true);

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre.trim(),
          email: form.email.trim(),
          mensaje: form.mensaje.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrores(data.campos ?? {});
        return;
      }

      setForm({ nombre: "", email: "", mensaje: "" });
      setErrores({});
      setExito(true);
    } catch {
      setErrores({ mensaje: "Error de conexión. Intenta de nuevo." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {exito && (
        <div className={successClass}>
          Mensaje enviado correctamente. Gracias por contactarnos.
        </div>
      )}

      <div className={groupClass}>
        <label className={labelClass} htmlFor="contact-nombre">Nombre</label>
        <input
          id="contact-nombre"
          className={inputClass}
          type="text"
          placeholder="Tu nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
        {errores.nombre && <p className={errorClass}>{errores.nombre}</p>}
      </div>

      <div className={groupClass}>
        <label className={labelClass} htmlFor="contact-email">Correo electrónico</label>
        <input
          id="contact-email"
          className={inputClass}
          type="email"
          placeholder="tu@email.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errores.email && <p className={errorClass}>{errores.email}</p>}
      </div>

      <div className={groupClass}>
        <label className={labelClass} htmlFor="contact-mensaje">Mensaje</label>
        <textarea
          id="contact-mensaje"
          className={textareaClass}
          rows={4}
          placeholder="¿En qué podemos ayudarte?"
          value={form.mensaje}
          onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
        />
        {errores.mensaje && <p className={errorClass}>{errores.mensaje}</p>}
      </div>

      <button className={submitClass} type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Enviar mensaje →"}
      </button>
    </form>
  );
}

export default function Home() {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      const res = await fetch("/api/eventos?featured=true");
      const data = await res.json();
      setEvents(
        data.map(
          (e: {
            title: string;
            description: string;
            date: string;
            category: string;
            tagLabel: string;
            image: string;
            location: string | null;
          }) => ({
            title: e.title,
            description: e.description,
            date: new Date(e.date).toLocaleDateString("es-PE", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
            category: e.category as "ec" | "gl",
            tagLabel: e.tagLabel,
            image: e.image,
            location: e.location,
          })
        )
      );
    }
    fetchEvents();
  }, []);

  return (
    <>
      {/* HERO */}
      <NetworkBackground />
      <div className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(180deg,rgba(6,11,24,0.6)_0%,rgba(6,11,24,0.35)_35%,rgba(6,11,24,0.85)_100%)]" />
      <section className="relative z-10 flex min-h-svh flex-col items-center justify-center px-4 -translate-y-20 text-center md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <Image
            src="/images/logo.png"
            alt="RIdeC"
            width={80}
            height={80}
            className="mb-8 h-20 w-20 rounded-xl"
          />
          <h1 className="mb-4 font-[family-name:var(--font-heading)] text-[2rem] leading-[1.15] font-extrabold text-white md:text-5xl">
            Conectando ciencias,{" "}
            <span className="text-cyan-400">construyendo futuro</span>
          </h1>
          <p className="mx-auto mb-8 max-w-[560px] text-lg leading-[1.6] text-slate-400">
            Red Interuniversitaria de estudiantes y profesionales que impulsa las
            ciencias básicas, reduce la deserción y genera comunidad.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/nosotros"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3 text-base font-semibold leading-none text-[#060b18] transition duration-200 hover:-translate-y-px hover:bg-cyan-500 hover:shadow-[0_4px_16px_rgba(34,211,238,0.3)] active:translate-y-0"
            >
              Conoce RIdeC
            </Link>
            <Link
              href="/eventos"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-6 py-3 text-base font-semibold leading-none text-white transition duration-200 hover:-translate-y-px hover:bg-white/10 active:translate-y-0"
            >
              Ver eventos
            </Link>
          </div>
        </motion.div>
      </section>

      <div className="relative z-10 bg-slate-50">
        {/* QUÉ HACEMOS */}
        <section className="mx-auto max-w-[1200px] px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-12 text-center">
              <h2 className="mb-2 font-[family-name:var(--font-heading)] text-[1.25rem] font-bold text-[#0d2c4f] md:text-[1.75rem]">¿Qué hacemos?</h2>
            </div>
          </motion.div>
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={item}
                transition={{ duration: 0.5 }}
              >
                <div className="flex h-full flex-col items-center rounded-2xl bg-white px-6 py-12 text-center shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-400/15 text-[1.75rem]">{f.icon}</div>
                  <h3 className="mb-2 font-[family-name:var(--font-heading)] text-lg font-bold text-[#0d2c4f]">{f.title}</h3>
                  <p className="text-sm leading-[1.6] text-gray-500">{f.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* PRÓXIMOS EVENTOS */}
        <section className="mx-auto max-w-[1200px] px-4 pb-16 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center justify-between"
          >
            <h2 className="mb-0 font-[family-name:var(--font-heading)] text-[1.25rem] font-bold text-[#0d2c4f] md:text-[1.75rem]">
              Eventos Destacados
            </h2>
            <Link
              href="/eventos"
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold leading-none text-[#005a9c] transition duration-200 hover:-translate-y-px hover:bg-slate-50 hover:text-[#0d2c4f] active:translate-y-0"
            >
              Ver todos →
            </Link>
          </motion.div>

          <Slider visibleCount={3}>
            {events.map((ev, i) => (
              <div className="shrink-0 basis-[280px] min-w-[280px] md:basis-[320px] md:min-w-[320px]" key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <div className="w-full overflow-hidden rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
                    <div className="p-6">
                      <span className={`mb-2 inline-block rounded-full px-[0.6rem] py-[0.2rem] text-xs font-semibold uppercase tracking-[0.05em] ${ev.category === "ec" ? "bg-blue-100 text-blue-700" : "bg-pink-100 text-pink-700"}`}>
                        {ev.tagLabel}
                      </span>
                      <div className="mb-1 text-xs text-slate-400">{ev.date}</div>
                      <div className="mb-2 font-[family-name:var(--font-heading)] text-base font-bold text-[#0d2c4f]">{ev.title}</div>
                      <p className="text-sm leading-[1.5] text-gray-500">{ev.description}</p>
                      {ev.location && (
                        <p className="mt-1 text-xs leading-[1.5] text-gray-500">
                          📍 {ev.location}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </section>

        {/* ODS */}
        <section className="mx-auto max-w-[1200px] px-4 pb-16 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-12 text-center">
              <h2 className="mb-2 font-[family-name:var(--font-heading)] text-[1.25rem] font-bold text-[#0d2c4f] md:text-[1.75rem]">Alineados con los ODS</h2>
            </div>
          </motion.div>
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6 md:grid-cols-4"
          >
            {ods.map((o) => (
              <motion.div
                key={o.title}
                variants={item}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col items-center rounded-2xl bg-white px-4 py-8 text-center shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                  <Image
                    src={o.image}
                    alt={`ODS ${o.number}`}
                    width={64}
                    height={64}
                    className="mb-4 h-16 w-16"
                  />
                  <h4 className="mb-1 font-[family-name:var(--font-heading)] text-sm font-bold text-[#0d2c4f]">
                    ODS {o.number} · {o.title}
                  </h4>
                  <p className="text-xs leading-[1.5] text-gray-500">{o.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ÚNETE */}
        <section className="mx-auto max-w-[1200px] px-4 pb-16 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-[20px] bg-gradient-to-br from-[#0d2c4f] to-[#005a9c] px-6 py-12 text-center text-white md:px-8 md:py-16">
              <h2 className="mb-2 font-[family-name:var(--font-heading)] text-[1.25rem] font-extrabold md:text-[1.75rem]">Únete a la red</h2>
              <p className="mx-auto mb-8 max-w-[500px] text-base opacity-[0.85]">
                Forma parte de una comunidad que está transformando la educación
                científica en Perú.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/oportunidades"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3 text-base font-semibold leading-none text-[#060b18] transition duration-200 hover:-translate-y-px hover:bg-cyan-500 hover:shadow-[0_4px_16px_rgba(34,211,238,0.3)] active:translate-y-0"
                >
                  Ver oportunidades
                </Link>
                <Link
                  href="/nosotros"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-6 py-3 text-base font-semibold leading-none text-white transition duration-200 hover:-translate-y-px hover:bg-white/10 active:translate-y-0"
                >
                  Conoce más
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

      {/* CONTACTO */}
      <section className="relative z-10 bg-gradient-to-br from-[#0d2c4f] to-[#060b18] text-white">
        <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-8 md:py-16">
          <motion.div
            className="grid grid-cols-1 gap-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="mb-2 font-[family-name:var(--font-heading)] text-[1.25rem] font-bold md:text-[1.75rem]">
                Ponte en contacto
              </h2>
              <p className="mb-8 text-base leading-[1.6] text-slate-400">
                ¿Tienes preguntas, sugerencias o quieres ser parte de la red?
                Escríbenos y te responderemos pronto.
              </p>
              <FormularioContacto />
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </>
  );
}
