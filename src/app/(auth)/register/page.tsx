import RegisterForm from "@/components/auth/RegisterForm";

const authCard =
  "m-auto w-full max-w-[440px] rounded-[20px] border border-[#e0e0e0] bg-white px-8 py-12 shadow-[0_4px_16px_rgba(0,0,0,0.1)] [@media(max-height:768px)]:p-6 [@media(max-height:640px)]:p-4";
const authCardTitle =
  "mt-0 mb-1 font-[family-name:var(--font-heading)] text-2xl font-bold text-[#333] [@media(max-height:768px)]:text-lg [@media(max-height:640px)]:text-lg";
const authCardSubtitle =
  "mt-0 mb-6 text-sm text-[#94a3b8] [@media(max-height:768px)]:mb-3";

export default function RegisterPage() {
  return (
    <main className={authCard}>
      <h1 className={authCardTitle}>Crear cuenta</h1>

      <p className={authCardSubtitle}>Regístrate para comenzar</p>

      <RegisterForm />
    </main>
  );
}
