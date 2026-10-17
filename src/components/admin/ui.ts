export const btnPrimarySm =
  "inline-flex cursor-pointer items-center justify-center rounded-2xl bg-cyan-400 px-4 py-2 text-sm leading-none font-semibold text-[#060b18] transition duration-200 hover:-translate-y-px hover:bg-cyan-500 hover:shadow-[0_4px_16px_rgba(34,211,238,0.3)] active:translate-y-0";

export const btnPrimary =
  "inline-flex cursor-pointer items-center justify-center rounded-2xl bg-cyan-400 px-6 py-3 font-semibold leading-none text-[#060b18] transition duration-200 hover:-translate-y-px hover:bg-cyan-500 hover:shadow-[0_4px_16px_rgba(34,211,238,0.3)] active:translate-y-0";

export const btnGhost =
  "inline-flex cursor-pointer items-center justify-center rounded-2xl px-4 py-2 text-sm leading-none font-semibold text-gray-500 transition duration-200 hover:-translate-y-px hover:bg-slate-50 hover:text-[#0d2c4f] active:translate-y-0";

export const btnGhostPlain =
  "inline-flex cursor-pointer items-center justify-center rounded-2xl px-4 py-2 text-sm leading-none font-semibold transition duration-200 hover:-translate-y-px hover:bg-slate-50 active:translate-y-0";

export const badgeBase =
  "inline-block rounded-lg px-2 py-[0.2rem] text-[0.7rem] font-bold uppercase";

export const badgeVariants: Record<string, string> = {
  pending: "bg-yellow-500/15 text-yellow-400",
  colaborador: "bg-yellow-500/15 text-yellow-400",
  approved: "bg-green-500/15 text-green-400",
  rejected: "bg-red-500/15 text-red-400",
  admin: "bg-cyan-400/15 text-cyan-400",
  miembro: "bg-slate-400/15 text-slate-400",
};

export const tableClass = "w-full overflow-hidden rounded-2xl bg-white";

export const thClass =
  "px-4 py-3 text-left text-sm font-semibold tracking-[0.05em] text-slate-400 uppercase";

export const tdClass = "px-4 py-3 text-sm";

export const inputClass =
  "w-full rounded-xl border border-gray-200 px-[0.9rem] py-[0.6rem] outline-none transition placeholder:text-slate-400 focus:border-[#0d2c4f] focus:shadow-[0_0_0_3px_rgba(13,44,79,0.12)]";

export const formGroup = "flex flex-col gap-1.5";

export const formLabel = "text-sm font-medium";

export const modalOverlay =
  "fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto bg-black/60 p-6";

export const modalBox = "m-auto w-full max-w-[720px]";

export const adminForm = "rounded-2xl bg-white p-12";

export const adminFormTitle =
  "mb-8 font-[family-name:var(--font-heading)] text-lg font-bold text-[#0d2c4f]";

export const adminFormGrid = "grid grid-cols-2 gap-6 max-md:grid-cols-1";

export const adminFormActions = "mt-8 flex gap-2";
