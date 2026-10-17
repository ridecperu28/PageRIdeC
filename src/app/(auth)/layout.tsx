import Image from "next/image";
import Link from "next/link";

import { authBranding } from "@/config/auth";

const blob = "pointer-events-none absolute rounded-full opacity-35 blur-[90px]";
const brand =
  "relative hidden w-1/2 min-h-0 flex-col items-center overflow-hidden bg-[linear-gradient(160deg,#060b18_0%,#0d2c4f_60%,#005a9c_130%)] px-12 py-16 text-white lg:flex [@media(max-height:768px)]:p-8 [@media(max-height:640px)]:p-6";
const brandLogo =
  "mx-auto mb-8 h-20 w-20 rounded-xl object-cover [@media(max-height:768px)]:mb-4 [@media(max-height:768px)]:h-16 [@media(max-height:768px)]:w-16 [@media(max-height:640px)]:mb-2 [@media(max-height:640px)]:h-14 [@media(max-height:640px)]:w-14";
const brandTitle =
  "mb-4 font-[family-name:var(--font-heading)] text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-[1.15] [@media(max-height:768px)]:text-[clamp(1.5rem,3vw,2.25rem)] [@media(max-height:640px)]:text-2xl";
const brandSubtitle =
  "mx-auto mb-8 max-w-[460px] text-lg leading-[1.6] text-[#94a3b8] [@media(max-height:768px)]:mb-4 [@media(max-height:768px)]:text-base";
const brandFeatures =
  "m-0 flex list-none flex-col items-center gap-2 p-0 text-sm text-[#cbd5e1] [@media(max-height:768px)]:gap-1";
const brandCheck =
  "mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400/15 text-[0.7rem] font-bold text-[#22d3ee]";
const panel =
  "flex min-h-0 flex-1 flex-col bg-[#f7f9fc] p-8 [@media(max-height:768px)]:p-3 [@media(max-height:640px)]:p-2";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[100dvh] overflow-x-hidden">
      {/* Left side - Branding */}
      <aside className={brand}>
        <div
          className={`${blob} -top-[120px] -left-[120px] h-[420px] w-[420px] bg-[#22d3ee]`}
        />
        <div
          className={`${blob} -right-[100px] -bottom-[120px] h-[380px] w-[380px] bg-[#ff6b6b] [@media(max-height:640px)]:hidden`}
        />
        <div
          className={`${blob} top-[45%] left-1/2 h-[280px] w-[280px] bg-[#2563eb] [@media(max-height:768px)]:hidden`}
        />

        <div className="relative z-[1] m-auto max-w-[480px] text-center">
          <Image
            src={authBranding.logo}
            alt={authBranding.name}
            width={80}
            height={80}
            className={brandLogo}
          />

          <h1 className={brandTitle}>
            {authBranding.tagline}{" "}
            <span className="text-[#22d3ee]">{authBranding.taglineAccent}</span>
          </h1>

          <p className={brandSubtitle}>{authBranding.subtitle}</p>

          <ul className={brandFeatures}>
            {authBranding.features.map((feature) => (
              <li key={feature}>
                <span className={brandCheck}>✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Right side - Form */}
      <section className={panel}>
        <Link
          href={authBranding.backHref}
          className="self-start text-sm text-[#6c757d] no-underline transition-colors hover:text-[#0d2c4f]"
        >
          ← {authBranding.backLabel}
        </Link>

        <main className="flex min-h-0 flex-1 overflow-y-auto">{children}</main>
      </section>
    </div>
  );
}
