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
import {
  authCard,
  authCardSubtitle,
  authCardTitle,
  authForm,
  authFormAlt,
  authFormLink,
  btnSubmit,
  formGroup,
  formInput,
  formLabel,
} from "@/components/auth/ui";

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
