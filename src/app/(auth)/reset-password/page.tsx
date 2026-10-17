"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/schemas/auth.schema";

const authCard =
  "m-auto w-full max-w-[440px] rounded-[20px] border border-[#e0e0e0] bg-white px-8 py-12 shadow-[0_4px_16px_rgba(0,0,0,0.1)] [@media(max-height:768px)]:p-6 [@media(max-height:640px)]:p-4";
const authCardTitle =
  "mt-0 mb-1 font-[family-name:var(--font-heading)] text-2xl font-bold text-[#333] [@media(max-height:768px)]:text-lg [@media(max-height:640px)]:text-lg";
const authCardSubtitle =
  "mt-0 mb-6 text-sm text-[#94a3b8] [@media(max-height:768px)]:mb-3";
const authForm =
  "flex flex-col gap-4 [@media(max-height:768px)]:gap-2.5 [@media(max-height:640px)]:gap-2";
const formGroup = "flex flex-col gap-[0.35rem]";
const formLabel = "text-sm font-medium text-[#333]";
const formInput =
  "w-full rounded-xl border border-[#e0e0e0] bg-white px-[0.9rem] py-[0.6rem] font-[family-name:var(--font-body)] text-base text-[#333] outline-none transition placeholder:text-[#94a3b8] focus:border-[#0d2c4f] focus:shadow-[0_0_0_3px_rgba(13,44,79,0.12)] [@media(max-height:640px)]:px-[0.85rem] [@media(max-height:640px)]:py-[0.45rem] [@media(max-height:640px)]:text-sm";
const btnSubmit =
  "mt-2 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3 font-[family-name:var(--font-body)] text-base leading-none font-semibold text-[#060b18] no-underline transition duration-200 hover:-translate-y-px hover:bg-cyan-500 hover:shadow-[0_4px_16px_rgba(34,211,238,0.3)] active:translate-y-0 [@media(max-height:768px)]:mt-0 [@media(max-height:768px)]:px-5 [@media(max-height:768px)]:py-[0.6rem] [@media(max-height:640px)]:px-5 [@media(max-height:640px)]:py-2";
const authFormAlt = "m-0 text-center text-sm text-[#94a3b8]";
const authFormLink =
  "font-medium text-[#0d2c4f] no-underline transition-colors hover:text-[#005a9c] hover:underline";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    console.log("Restablecer contraseña:", data);

    // Aquí después conectarás tu API
  };

  return (
    <main className={authCard}>
      <h1 className={authCardTitle}>Nueva contraseña</h1>

      <p className={authCardSubtitle}>
        Elige una nueva contraseña para tu cuenta
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className={authForm}>
        <div className={formGroup}>
          <label htmlFor="password" className={formLabel}>
            Contraseña
          </label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="••••••••"
              {...register("password")}
              className={`${formInput} pr-12`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className={formGroup}>
          <label htmlFor="confirmPassword" className={formLabel}>
            Confirmar contraseña
          </label>

          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="••••••••"
            {...register("confirmPassword")}
            className={formInput}
          />

          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={btnSubmit}
        >
          {isSubmitting ? "Guardando..." : "Restablecer contraseña"}
        </button>

        <p className={authFormAlt}>
          <Link href="/login" className={authFormLink}>
            ← Volver al inicio de sesión
          </Link>
        </p>
      </form>
    </main>
  );
}
