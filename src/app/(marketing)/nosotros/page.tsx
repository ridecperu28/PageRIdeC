import Image from "next/image";
import { ods } from "@/data/ods";
export const teamMembers = [
  {
    name: "Jorge Medina",
    role: "Vicepresidente",
    image: "/images/people/Jorge-Medina-photo.jpg",
    order: 1,
  },
  {
    name: "Carla Pérez",
    role: "Directora de Innovación",
    image: "/images/people/carla-photo.png",
    order: 2,
  },
  {
    name: "Camila Suárez Díaz",
    role: "Miembro",
    image: "/images/people/Camila_Suarez_Díaz-photo.jpeg",
    order: 3,
  },
];

export default async function Nosotros() {

  return (
    <div className="mx-auto max-w-[1200px] space-y-16 px-4 py-16 md:px-8">

      {/* QUIENES SOMOS */}
      <section
        id= "quienes-somos"
        className="relative isolate flex min-h-[620px] items-center justify-end scroll-mt-[120px] overflow-hidden rounded-[20px] bg-[#edf6ff] px-[5%] py-16 before:absolute before:inset-0 before:z-[-1] before:bg-[linear-gradient(to_right,transparent_30%,rgba(237,246,255,0.78)_58%,rgba(237,246,255,0.97)_100%),url('/images/quienes-somos-AI.png')] before:bg-cover before:bg-center before:bg-no-repeat before:content-[''] max-[900px]:block max-[900px]:min-h-0 max-[900px]:p-0 max-[900px]:before:relative max-[900px]:before:inset-auto max-[900px]:before:block max-[900px]:before:aspect-video max-[900px]:before:w-full max-[900px]:before:bg-[url('/images/quienes-somos-AI.png')] max-[900px]:before:bg-center"
        aria-labelledby="quienes-somos-titulo"
      >
        <div className="w-[43%] max-w-[500px] max-[900px]:w-full max-[900px]:max-w-none max-[900px]:box-border max-[900px]:px-6 max-[900px]:py-8">
          <span className="mb-4 block text-[13px] font-bold tracking-[0.16em] text-[#265a78]">
            Conoce RIdeC
          </span>

          <h1
            id="quienes-somos-titulo"
            className="m-0 font-[family-name:var(--font-heading)] text-[clamp(32px,4vw,54px)] font-extrabold leading-[1.12] text-[#102d46]"
          >
            ¿Quiénes somos?
          </h1>


          <p className="m-0 text-[17px] leading-[1.8] text-[#304b60] max-[900px]:text-base">
            Somos una red de estudiantes y profesionales que impulsa las ciencias básicas y afines en el Perú, conectando talento con oportunidades de investigación, formación y divulgación.
          </p>

          <p className="m-0 mt-5 text-[17px] leading-[1.8] text-[#304b60] max-[900px]:text-base">
            Nuestra misión es integrar estudiantes con investigadores de diversos niveles y nuestra visión es servir de nexo entre grupos e institutos de investigación y comunidades de divulgación científica en el país.
          </p>
        </div>
      </section>

      {/* QUE TRABAJAMOS */}
      <section>
        <h2 className="mb-2 font-[family-name:var(--font-heading)] text-[1.25rem] font-bold text-[#0d2c4f] md:text-[1.75rem]">¿Que trabajamos?</h2>
        <p className="text-slate-500 mt-2 mb-6">
          Alineamos nuestras acciones con los Objetivos de Desarrollo Sostenible (ODS):</p>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {ods.map((o, id) => (
            <div
              className="w-full overflow-hidden rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
              key={id}
            >
              <Image className="h-[180px] w-full object-cover" src={o.image} alt={`ODS ${o.number}`} width={400} height={200} />
              <div className="p-6">
                <h2 className="mb-2 font-[family-name:var(--font-heading)] text-base font-bold text-[#0d2c4f]">ODS {o.number} · {o.title}</h2>
                <p className="text-sm leading-[1.5] text-[#6c757d]">{o.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MISIÓN Y VISIÓN */}
      <section>
        <h2 className="mb-4 font-[family-name:var(--font-heading)] text-[1.25rem] font-bold text-[#0d2c4f] md:text-[1.75rem]">Misión &amp; Visión</h2>
        <h4 className="font-semibold">Misión</h4>
        <p className="text-slate-500 mt-1">
          Integrar estudiantes y profesionales a través de comunidades, proyectos y mentorías; conectar grupos e institutos de investigación para catalizar una cultura de innovación abierta.
        </p>

        <h4 className="font-semibold mt-4">Visión</h4>
        <p className="text-slate-500 mt-1">
          Ser la red referente que articula actores científicos en el Perú, creando trayectorias de formación e investigación sostenibles con impacto medible.
        </p>
      </section>

      {/* PORQUE FUNDAMOS RIDEC */}
      <section>
        <h2 className="mb-2 font-[family-name:var(--font-heading)] text-[1.25rem] font-bold text-[#0d2c4f] md:text-[1.75rem]">¿Por qué fundamos RIdeC?</h2>
        <p className="text-slate-500 mt-2">
          En 2019 realizamos un estudio sobre cohortes de Física en tres universidades peruanas, identificando tasas de deserción elevadas (82.7%, 36.4% y 86.7%). Esta evidencia nos impulsó a abordar causas multidimensionales que afectan a carreras como Matemática,Física, Química y Biología, proponiendo rutas de acompañamiento, investigación temprana y comunidades de práctica.
        </p>
      </section>

      {/* MESA DIRECTIVA */}
      <section>
        <h2 className="mb-2 font-[family-name:var(--font-heading)] text-[1.25rem] font-bold text-[#0d2c4f] md:text-[1.75rem]">Mesa Directiva</h2>

        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          {teamMembers.map((m, id) => (
            <div
              className="w-full overflow-hidden rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
              key={id}
            >
              <Image className="h-[180px] w-full object-cover" src={m.image} alt={m.name} width={400} height={200} />
              <div className="p-6">
                <h2 className="mb-2 font-[family-name:var(--font-heading)] text-base font-bold text-[#0d2c4f]">{m.name}</h2>
                <p className="text-sm leading-[1.5] text-[#6c757d]">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
