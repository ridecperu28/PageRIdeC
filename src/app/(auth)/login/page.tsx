import LoginForm from "@/components/auth/LoginForm";
import { authCard, authCardSubtitle, authCardTitle } from "@/components/auth/ui";

export default function LoginPage() {
  return (
    <main className={authCard}>
      <h1 className={authCardTitle}>Bienvenido</h1>

      <p className={authCardSubtitle}>Inicia sesión en tu cuenta</p>

      <LoginForm />
    </main>
  );
}
