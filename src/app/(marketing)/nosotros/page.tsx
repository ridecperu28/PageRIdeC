import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function Nosotros() {
  const [teamMembers, ods] = await Promise.all([
    prisma.teamMember.findMany({ orderBy: { order: "asc" } }),
    prisma.ods.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <div className="section-light__inner py-16 space-y-16">

      {/* QUIENES SOMOS */}
      <section
        id= "quienes-somos"
        className="quienes-somos"
        aria-labelledby="quienes-somos-titulo"
      >
        <div className="quienes-somos__contenido">
          <span className="quienes-somos__etiqueta">
            Conoce RIdeC
          </span>

          <h1 id="quienes-somos-titulo">
            ¿Quiénes somos?
          </h1>


          <p>
            Somos una red de estudiantes y profesionales que impulsa las ciencias básicas y afines en el Perú, conectando talento con oportunidades de investigación, formación y divulgación.
          </p>

          <p>
            Nuestra misión es integrar estudiantes con investigadores de diversos niveles y nuestra visión es servir de nexo entre grupos e institutos de investigación y comunidades de divulgación científica en el país.
          </p>
        </div>
      </section>

      {/* QUE TRABAJAMOS */}
      <section>
        <h2 className="section-header__title">¿Que trabajamos?</h2>
        <p className="text-slate-500 mt-2 mb-6">
          Alineamos nuestras acciones con los Objetivos de Desarrollo Sostenible (ODS):</p>

        <div className="grid-4">
          {ods.map((o) => (
            <div className="event-card" key={o.id}>
              <Image className="event-card__img" src={o.image} alt={`ODS ${o.number}`} width={400} height={200} />
              <div className="event-card__body">
                <h2 className="event-card__title">ODS {o.number} · {o.title}</h2>
                <p className="event-card__text">{o.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MISIÓN Y VISIÓN */}
      <section>
        <h2 className="section-header__title mb-4">Misión &amp; Visión</h2>
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
        <h2 className="section-header__title">¿Por qué fundamos RIdeC?</h2>
        <p className="text-slate-500 mt-2">
          En 2019 realizamos un estudio sobre cohortes de Física en tres universidades peruanas, identificando tasas de deserción elevadas (82.7%, 36.4% y 86.7%). Esta evidencia nos impulsó a abordar causas multidimensionales que afectan a carreras como Matemática,Física, Química y Biología, proponiendo rutas de acompañamiento, investigación temprana y comunidades de práctica.
        </p>
      </section>

      {/* MESA DIRECTIVA */}
      <section>
        <h2 className="section-header__title">Mesa Directiva</h2>

        <div className="grid-4 mt-8">
          {teamMembers.map((m) => (
            <div className="event-card" key={m.id}>
              <Image className="event-card__img" src={m.image} alt={m.name} width={400} height={200} />
              <div className="event-card__body">
                <h2 className="event-card__title">{m.name}</h2>
                <p className="event-card__text">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
