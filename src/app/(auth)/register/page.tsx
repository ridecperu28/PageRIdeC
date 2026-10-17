import RegisterForm from "@/components/auth/RegisterForm";
import { authCard, authCardSubtitle, authCardTitle } from "@/components/auth/ui";

export default function RegisterPage() {
  return (
    <main className={authCard}>
      <h1 className={authCardTitle}>Crear cuenta</h1>

      <p className={authCardSubtitle}>Regístrate para comenzar</p>

      <RegisterForm />
    </main>
  );
}
