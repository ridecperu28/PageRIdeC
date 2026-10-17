"use client";

import { useState, type FormEvent } from "react";

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

export default function ContactForm() {
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
