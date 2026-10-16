"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { loginSchema, type LoginFormData } from "@/schemas/auth.schema";
import { useRouter } from "next/navigation";

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
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      {/* Email */}
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Correo electrónico
        </label>

        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="nombre@correo.com"
          {...register("email")}
          className="form-input"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="form-group">
        <div className="mb-1 flex justify-between">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>

          <Link href="/forgot-password" className="auth-form__link">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            {...register("password")}
            className="form-input pr-12"
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
        className="btn btn--primary auth-form__submit w-full"
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
      <button type="button" className="btn btn--outline-dark w-full">
        Continuar con Google
      </button>

      {/* Register */}
      <p className="auth-form__alt">
        ¿No tienes una cuenta?{" "}
        <Link href="/register" className="auth-form__link">
          Crear una cuenta
        </Link>
      </p>
    </form>
  );
}
