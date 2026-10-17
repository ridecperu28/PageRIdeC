"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema, type RegisterFormData } from "@/schemas/auth.schema";

const authForm =
  "flex flex-col gap-4 [@media(max-height:768px)]:gap-2.5 [@media(max-height:640px)]:gap-2";
const formGroup = "flex flex-col gap-[0.35rem]";
const formLabel = "text-sm font-medium text-[#333]";
const formInput =
  "w-full rounded-xl border border-[#e0e0e0] bg-white px-[0.9rem] py-[0.6rem] font-[family-name:var(--font-body)] text-base text-[#333] outline-none transition placeholder:text-[#94a3b8] focus:border-[#0d2c4f] focus:shadow-[0_0_0_3px_rgba(13,44,79,0.12)] [@media(max-height:640px)]:px-[0.85rem] [@media(max-height:640px)]:py-[0.45rem] [@media(max-height:640px)]:text-sm";
const btnSubmit =
  "mt-2 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3 font-[family-name:var(--font-body)] text-base leading-none font-semibold text-[#060b18] no-underline transition duration-200 hover:-translate-y-px hover:bg-cyan-500 hover:shadow-[0_4px_16px_rgba(34,211,238,0.3)] active:translate-y-0 [@media(max-height:768px)]:mt-0 [@media(max-height:768px)]:px-5 [@media(max-height:768px)]:py-[0.6rem] [@media(max-height:640px)]:px-5 [@media(max-height:640px)]:py-2";

export default function RegisterForm() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setMessage(null);

    const response = await fetch("/api/auth/register", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      setMessage(result.message || "No se pudo crear la cuenta");
      return;
    }

    router.push("/login");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={authForm}>
      <div className={formGroup}>
        <label htmlFor="name" className={formLabel}>
          Nombre
        </label>

        <input
          id="name"
          {...register("name")}
          type="text"
          placeholder="Tu nombre"
          className={formInput}
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className={formGroup}>
        <label htmlFor="email" className={formLabel}>
          Correo electrónico
        </label>

        <input
          id="email"
          {...register("email")}
          type="email"
          placeholder="tu@email.com"
          className={formInput}
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className={formGroup}>
        <label htmlFor="password" className={formLabel}>
          Contraseña
        </label>

        <input
          id="password"
          {...register("password")}
          type="password"
          placeholder="••••••••"
          className={formInput}
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className={formGroup}>
        <label htmlFor="confirmPassword" className={formLabel}>
          Confirmar contraseña
        </label>

        <input
          id="confirmPassword"
          {...register("confirmPassword")}
          type="password"
          placeholder="••••••••"
          className={formInput}
        />

        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className={formGroup}>
        <label className="flex items-start gap-2 text-sm">
          <input
            id="terms"
            {...register("terms")}
            type="checkbox"
            className="mt-0.5 h-4 w-4"
          />
          <span>Acepto los términos y condiciones</span>
        </label>

        {errors.terms && (
          <p className="mt-1 text-sm text-red-500">{errors.terms.message}</p>
        )}
      </div>

      {message && <p className="text-sm text-red-500">{message}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className={btnSubmit}
      >
        {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
      </button>
    </form>
  );
}
