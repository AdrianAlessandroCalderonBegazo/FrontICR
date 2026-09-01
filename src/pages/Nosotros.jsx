import { useState } from 'react'
import { Link } from 'react-router-dom'
import Carousel from '../components/Carousel'
import SectionHeading from '../components/SectionHeading'
import SceneIllustration from '../components/illustrations/SceneIllustration'
import { brand, history, values, hitos } from '../data/content'

export default function Nosotros() {
  // El video solo se hace visible cuando termina de cargar un frame real,
  // así la ilustración de respaldo se ve limpia mientras no exista el
  // archivo /public/videos/nosotros-hero.mp4.
  const [videoReady, setVideoReady] = useState(false)

  return (
    <div>
      {/* video1: video de fondo institucional — colocar en /public/videos/nosotros-hero.mp4 */}
      <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-icr-navy">
        <SceneIllustration sector="energia" className="absolute inset-0 h-full w-full" />
        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            videoReady ? 'opacity-70' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoReady(true)}
        >
          <source src="/videos/nosotros-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-icr-navy/50 via-icr-navy/55 to-icr-navy/85" />
        <div className="container-icr relative z-10 py-24 text-center text-white">
          <span className="section-eyebrow text-icr-mint">Nosotros</span>
          <p className="mx-auto mt-6 max-w-3xl font-black text-2xl leading-snug sm:text-3xl md:text-4xl">
            “{brand.purpose}”
          </p>
        </div>
      </section>

      {/* Nuestros valores */}
      <section className="bg-white py-20 md:py-28" id="valores">
        <div className="container-icr">
          <SectionHeading
            eyebrow="Nuestros valores"
            title="Lo que nos representa en cada proyecto"
            description="Cuatro principios que guían la manera en que diseñamos, ejecutamos y respaldamos cada solución energética."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <div
                key={value.id}
                className="flex flex-col gap-4 rounded-2xl border border-icr-navy/10 p-6 transition-colors hover:border-icr-cyan"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-icr-navy font-black text-white">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-bold text-lg text-icr-navy">{value.title}</h3>
                <p className="text-sm text-icr-navy/70">{value.summary}</p>
                <p className="border-t border-icr-navy/10 pt-3 text-sm font-medium text-icr-cyan">
                  {value.meaning}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestros hitos */}
      <section className="bg-[#f5f8fb] py-20 md:py-28" id="hitos">
        <div className="container-icr">
          <SectionHeading
            eyebrow="Nuestros hitos"
            title="Proyectos que marcan nuestra trayectoria"
            description="Minería, industria y desarrollo social: una muestra de los proyectos más representativos de Inversiones ICR."
          />
          <Carousel
            ariaLabel="Hitos de Inversiones ICR"
            autoPlay
            interval={5500}
            slidesToShowClassName="basis-full sm:basis-1/2 lg:basis-1/3"
          >
            {hitos.map((project) => (
              <article
                key={project.id}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-icr-navy/10 bg-white shadow-sm"
              >
                <SceneIllustration sector={project.sector} className="aspect-[16/10] w-full" />
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-bold uppercase tracking-wide text-icr-cyan">{project.location}</p>
                  <h3 className="mt-1 font-bold text-lg text-icr-navy">{project.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-icr-navy/70">{project.summary}</p>
                  <Link
                    to={`/experiencia/${project.id}`}
                    className="mt-4 font-bold text-icr-navy hover:text-icr-cyan"
                  >
                    Ver proyecto →
                  </Link>
                </div>
              </article>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Contexto de marca */}
      <section className="bg-white py-20 md:py-28" id="historia">
        <div className="container-icr grid grid-cols-1 gap-14 lg:grid-cols-2">
          <div>
            <span className="section-eyebrow">Contexto de marca</span>
            <h2 className="mt-4 font-black text-3xl text-icr-navy md:text-4xl">Quiénes somos</h2>
            <p className="mt-6 text-icr-navy/70 leading-relaxed">{brand.brandContext}</p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl bg-icr-navy p-7 text-white">
              <p className="section-eyebrow text-icr-mint">Misión</p>
              <p className="mt-3 leading-relaxed">{brand.mission}</p>
            </div>
            <div className="rounded-2xl bg-icr-gradient-soft p-7 text-white">
              <p className="section-eyebrow text-white">Visión</p>
              <p className="mt-3 leading-relaxed">{brand.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Historia y trayectoria */}
      <section className="bg-[#f5f8fb] py-20 md:py-28" id="trayectoria">
        <div className="container-icr grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="rounded-2xl border border-icr-navy/10 bg-white p-8">
            <span className="section-eyebrow">Historia</span>
            <h3 className="mt-3 font-bold text-xl text-icr-navy">Cómo nace Inversiones ICR</h3>
            <p className="mt-4 text-sm leading-relaxed text-icr-navy/70">{history.intro}</p>
          </div>
          <div className="rounded-2xl border border-icr-navy/10 bg-white p-8">
            <span className="section-eyebrow">Trayectoria</span>
            <h3 className="mt-3 font-bold text-xl text-icr-navy">De comercializar equipos a resolver energía crítica</h3>
            <p className="mt-4 text-sm leading-relaxed text-icr-navy/70">{history.trayectoria}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
