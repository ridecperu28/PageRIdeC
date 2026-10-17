export interface Ods {
  number: number;
  title: string;
  description: string;
  image: string;
  order: number;
}

export const ods: Ods[] = [
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
