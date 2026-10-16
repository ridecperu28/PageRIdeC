import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import EventsSection from "@/components/sections/EventsSection";
import OdsSection from "@/components/sections/OdsSection";
import JoinSection from "@/components/sections/JoinSection";
import ContactSection from "@/components/sections/ContactSection";

// src/data/features.ts

export interface Feature {
  icon: string;
  title: string;
  description: string;
  href?: string | null;
}

export const features: Feature[] = [
  {
    icon: "🔬",
    title: "Investigación",
    description: "Impulsamos las ciencias básicas.",
    href: null,
  },
  {
    icon: "🤝",
    title: "Comunidad",
    description: "Conectamos estudiantes y profesionales.",
    href: null,
  },
  {
    icon: "🚀",
    title: "Divulgación",
    description: "Acercamos la ciencia a la sociedad.",
    href: null,
  },
];

export const ods = [
  {
    number: 4,
    title: "Educación",
    description:
      "Programas abiertos y mentorías para elevar la educación científica.",
    image: "/images/ODS4.png",
    order: 1,
  },
  {
    number: 5,
    title: "Igualdad de género",
    description:
      "Fomentamos el liderazgo equitativo de mujeres en ciencia.",
    image: "/images/ODS5.png",
    order: 2,
  },
  {
    number: 9,
    title: "Innovación",
    description:
      "Proyectos de I+D que impulsan soluciones sostenibles.",
    image: "/images/ODS9.png",
    order: 3,
  },
  {
    number: 10,
    title: "Igualdad",
    description:
      "Acceso inclusivo a la educación científica para comunidades vulnerables.",
    image: "/images/ODS10.png",
    order: 4,
  },
];

export default async function Home() {
  const [stats, eventos] = await Promise.all([
    prisma.stat.findMany({ orderBy: { order: "asc" } }),
    prisma.evento.findMany({
      where: { featured: true },
      orderBy: { date: "desc" },
      take: 4,
    }),
  ]);

  


  const eventsForSlider = eventos.map((e) => ({
    title: e.title,
    description: e.description,
    date: e.date.toLocaleDateString("es-PE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    category: e.category as "ec" | "gl",
    tagLabel: e.tagLabel,
    image: e.image,
    location: e.location,
  }));

  return (
    <>
      <HeroSection />

      <div className="section-light">
        {/* <StatsSection stats={stats} /> */}
        <FeaturesSection features={features} />
        <EventsSection events={eventsForSlider} />
        <OdsSection ods={ods} />
        <JoinSection />
        <ContactSection />
      </div>
    </>
  );
}
