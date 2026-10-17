"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { loginSchema, type LoginFormData } from "@/schemas/auth.schema";
import { useRouter } from "next/navigation";

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

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result.message)
        return;
      }

      console.log("Login exitoso:", result);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={authForm}>
      {/* Email */}
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

      {/* Password */}
      <div className={formGroup}>
        <div className="mb-1 flex justify-between">
          <label htmlFor="password" className={formLabel}>
            Contraseña
          </label>
{/* 
          <Link href="/forgot-password" className="auth-form__link">
            ¿Olvidaste tu contraseña?
          </Link> */}
        </div>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
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
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Remember */}
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" />

        <span>Recordarme</span>
      </label>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={btnSubmit}
      >
        {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200" />

        <span className="text-sm text-gray-400">o</span>

        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Google */}
      {/* <button type="button" className="btn btn--outline-dark w-full">
        Continuar con Google
      </button> */}

      {/* Register */}
      <p className={authFormAlt}>
        ¿No tienes una cuenta?{" "}
        <Link href="/register" className={authFormLink}>
          Crear una cuenta
        </Link>
      </p>
    </form>
  );
}
