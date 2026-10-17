"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
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

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    console.log("Recuperar contraseña:", data);

    // Aquí después conectarás tu API
  };

  return (
    <main className={authCard}>
      <h1 className={authCardTitle}>Recuperar contraseña</h1>

      <p className={authCardSubtitle}>
        Te enviaremos un enlace para restablecerla
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className={authForm}>
        <div className={formGroup}>
          <label htmlFor="email" className={formLabel}>
            Correo electrónico
          </label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="nombre@correo.com"
            {...register("email")}
            className={formInput}
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={btnSubmit}
        >
          {isSubmitting ? "Enviando..." : "Enviar enlace"}
        </button>

        <p className={authFormAlt}>
          ¿Recordaste tu contraseña?{" "}
          <Link href="/login" className={authFormLink}>
            Inicia sesión
          </Link>
        </p>
      </form>
    </main>
  );
}
