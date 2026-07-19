"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { m } from "framer-motion";
import LazyVideo from "@/components/ui/LazyVideo";

/* ─── Case study data ─── */
interface CaseStudy {
  id: string;
  title: string;
  category: string;
  mediaSrc: string;
  mediaType: "video" | "image";
  logoSrc: string;
  logoAlt: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "laut",
    title: "Laut",
    category: "Branding & Identidad Visual",
    mediaSrc: "/cases/laut.mp4",
    mediaType: "video",
    logoSrc: "/cases/logos/laut-logo.png",
    logoAlt: "Logo de Laut",
  },
  {
    id: "madan",
    title: "Madan",
    category: "Estrategia & Contenido Premium",
    mediaSrc: "/cases/madan.mp4",
    mediaType: "video",
    logoSrc: "/cases/logos/madan-logo.jpg.png",
    logoAlt: "Logo de Madan",
  },
  {
    id: "unilabor",
    title: "Unilabor",
    category: "Branding & Desarrollo Web",
    mediaSrc: "/cases/unilabor.jpg",
    mediaType: "image",
    logoSrc: "/cases/logos/unilabor-logo.png",
    logoAlt: "Logo de Unilabor",
  },
  {
    id: "7quince",
    title: "7:Quince",
    category: "Contenido & Campañas de Ads",
    mediaSrc: "/cases/715.jpg",
    mediaType: "image",
    logoSrc: "/cases/logos/715-logo.png",
    logoAlt: "Logo de 7:Quince",
  },
];

/* ─── Framer Motion variants ─── */
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function CasosPreview() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-14 gap-6"
        >
          <m.div variants={fadeUpVariants}>
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-[var(--text-muted)] mb-4">
              <span className="w-6 h-px bg-[var(--accent)]" />
              Portafolio
            </span>
            <h2 className="font-bricolage font-extrabold text-3xl lg:text-5xl text-[var(--text-primary)] tracking-tight">
              Casos de Éxito
            </h2>
            <p className="text-[var(--text-secondary)] mt-3 max-w-md text-base lg:text-lg">
              Marcas que confiaron en nuestra visión para escalar al siguiente nivel.
            </p>
          </m.div>

          <m.div variants={fadeUpVariants}>
            <Link
              href="/clientes"
              prefetch={false}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:gap-3 transition-all duration-300 group"
            >
              Ver todos los proyectos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </m.div>
        </m.div>
      </div>

      {/* Horizontal scroll showcase */}
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
        className="mt-12 lg:mt-16"
      >
        <div className="horizontal-scroll flex gap-5 lg:gap-6 slider-align-padding pb-4">
          {CASE_STUDIES.map((study, index) => (
            <m.div
              key={study.id}
              variants={cardVariants}
              custom={index}
              className="scroll-snap-card flex-shrink-0 w-[80vw] sm:w-[65vw] md:w-[50vw] lg:w-[42vw] xl:w-[38vw]"
            >
              <Link
                href={`/clientes#${study.id}`}
                prefetch={false}
                className="group block"
              >
                {/* Media Container */}
                <div className="relative w-full aspect-[4/3] rounded-2xl lg:rounded-3xl overflow-hidden mb-5 bg-[var(--bg-secondary)] border border-[var(--border)] transition-all duration-500 group-hover:border-[var(--accent)]/30 group-hover:shadow-xl group-hover:shadow-[var(--accent)]/5">
                  {study.mediaType === "video" ? (
                    <LazyVideo
                      src={study.mediaSrc}
                      aria-label={`Video del caso de ${study.title}`}
                      className="absolute inset-0 w-full h-full"
                    />
                  ) : (
                    <Image
                      src={study.mediaSrc}
                      alt={`Caso de estudio: ${study.title}`}
                      fill
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 38vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Client logo badge — top right */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-sm border border-white/50">
                    <Image
                      src={study.logoSrc}
                      alt={study.logoAlt}
                      width={72}
                      height={24}
                      className="h-5 w-auto object-contain brightness-0"
                    />
                  </div>
                </div>

                {/* Card Info */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-muted)] mb-1.5">
                      {study.category}
                    </p>
                    <h3 className="font-bricolage font-bold text-xl lg:text-2xl text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300">
                      {study.title}
                    </h3>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all duration-300 mt-1 flex-shrink-0" />
                </div>
              </Link>
            </m.div>
          ))}
        </div>
      </m.div>
    </section>
  );
}
