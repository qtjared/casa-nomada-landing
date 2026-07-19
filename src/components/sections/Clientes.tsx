"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { Sparkles, Users, TrendingUp, Eye, Music } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import HeroSection from "@/components/ui/hero-section-9";
import CollaboratorsSlider from "@/components/sections/home/CollaboratorsSlider";

interface Tag {
  label: string;
  icon: LucideIcon;
}

interface TextPhase {
  tags: Tag[];
  copy: React.ReactNode;
  secondaryCopy?: string;
  metrics?: {
    value: string;
    label: string;
  }[];
  subCopy?: string;
}

interface Business {
  id: string;
  name: string;
  logo: string;
  mediaType: "video" | "image";
  mediaSrc: string;
  bgColor: string;
  theme?: "dark" | "light";
  phases: TextPhase[];
}

const BUSINESSES: Business[] = [
  {
    id: "laut",
    name: "Laut",
    logo: "/cases/logos/laut-logo.png",
    mediaType: "video",
    mediaSrc: "/cases/laut.mp4",
    bgColor: "#FAF7F2",
    phases: [
      {
        tags: [
          { label: "Seasonal Content", icon: Sparkles }
        ],
        copy: "Reflejamos la experiencia de laut en lenguaje visual, conectando con su comunidad como nunca antes.",
        metrics: [
          { value: "+350 MIL", label: "visualizaciones" },
          { value: "+6 MIL", label: "interacciones" }
        ],
        subCopy: "logrando resultados sólidos con historias que reflejan el valor de la marca"
      }
    ]
  },
  {
    id: "715",
    name: "7:QUINCE",
    logo: "/cases/logos/715-logo.png",
    mediaType: "image",
    mediaSrc: "/cases/715.jpg",
    bgColor: "#EAE8E4",
    phases: [
      {
        tags: [
          { label: "Community Building", icon: Users }
        ],
        copy: "Fomentamos la comunidad digital de 7:QUINCE con contenido que incita la interacción."
      },
      {
        tags: [
          { label: "IRL community", icon: Music }
        ],
        copy: "Creamos sundaze, un evento que impulsa el sentido de comunidad y la cultura de la música house.",
        metrics: [
          { value: "+300", label: "personas en 3 ediciones" }
        ]
      }
    ]
  },
  {
    id: "madan",
    name: "Madan",
    logo: "/cases/logos/madan-logo.jpg.png",
    mediaType: "video",
    mediaSrc: "/cases/madan.mp4",
    bgColor: "#c7d6dcff",
    phases: [
      {
        tags: [
          { label: "High reach", icon: TrendingUp }
        ],
        copy: "Creamos desde 0 la comunidad de madan, logrando que la viralidad se convierta en ventas.",
        metrics: [
          { value: "+5M", label: "visualizaciones" },
          { value: "+15K", label: "seguidores" },
          { value: "4 Meses", label: "de crecimiento" }
        ]
      }
    ]
  },
  {
    id: "unilabor",
    name: "Unilabor",
    logo: "/cases/logos/unilabor-logo.png",
    mediaType: "image",
    mediaSrc: "/cases/unilabor.jpg",
    bgColor: "#F4F1ED",
    phases: [
      {
        tags: [
          { label: "Visual upgrade", icon: Eye }
        ],
        copy: "Definimos el rumbo visual de unilabor, construyendo una comunicación a la altura de su servicio.",
        secondaryCopy: "Traduciendo procesos de calidad a una imagen clara y profesional."
      }
    ]
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" as const },
  viewport: { once: false, amount: 0.2 }
};

export default function Clientes() {
  const router = useRouter();

  return (
    <>
      {/* 1. Mobile Stack Layout (block lg:hidden) */}
      <section className="block lg:hidden pt-0 pb-16 bg-transparent overflow-x-hidden">
        <m.div {...fadeInUp} className="-mt-8">
          <HeroSection
            className="w-full"
            title={<><span className="text-slate-500 text-sm font-semibold uppercase tracking-[0.25em] block mb-2 font-sans">Proyectos Recientes</span>Casos de Éxito</>}
            subtitle="Descubre cómo hemos transformado visiones estratégicas en marcas líderes que conectan, inspiran y venden."
            images={['/cases/715.jpg', '/cases/unilabor.jpg', '/cases/715.jpg']}
            actions={[
              { text: "Inicia tu proyecto", onClick: () => router.push('/contacto'), variant: 'default', className: "pointer-events-auto" }
            ]}
            stats={[
              { value: "+5.3M", label: "Visualizaciones", icon: <Eye className="w-5 h-5 text-slate-600" /> },
              { value: "+21K", label: "Interacciones", icon: <Users className="w-5 h-5 text-slate-600" /> }
            ]}
          />
        </m.div>
        
        {/* Nuestros Colaboradores en Móvil */}
        <m.div {...fadeInUp} className="container mx-auto px-4 sm:px-6 mb-12 text-center">
          <h2 className="font-bricolage font-extrabold text-2xl text-slate-900 tracking-tight mb-2">
            Nuestros colaboradores
          </h2>
          <p className="text-slate-600 max-w-md mx-auto text-sm mb-8 leading-relaxed">
            Las marcas y proyectos que han confiado en nuestro enfoque para destacar en el mercado premium.
          </p>
          <CollaboratorsSlider />
        </m.div>

        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="flex flex-col gap-8">
            {BUSINESSES.map((biz) => {
              return (
                <m.article key={biz.id} {...fadeInUp} className="flex flex-col gap-6 bg-white p-6 rounded-3xl shadow-sm border border-stone-200/50">
                  {/* Media container */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-stone-200 shadow-sm">
                    {biz.mediaType === "video" ? (
                      <video
                        src={biz.mediaSrc}
                        aria-label={`Video de ${biz.name}`}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={biz.mediaSrc}
                        alt={biz.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    )}
                  </div>

                  {/* Text Details Container */}
                  <div className="flex flex-col gap-8">
                    {/* Header */}
                    <div className="flex items-center gap-5 border-b border-stone-100 pb-4">
                      <div className="relative h-12 w-28 flex-shrink-0">
                        <Image
                          src={biz.logo}
                          alt={`${biz.name} logo`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-contain object-left brightness-0"
                        />
                      </div>
                      <h3 className="font-bricolage font-extrabold text-2xl tracking-tight text-slate-900 border-l-2 border-slate-200 pl-5">
                        {biz.name}
                      </h3>
                    </div>

                    {/* Render all phases linearly on mobile */}
                    <div className="flex flex-col gap-10">
                      {biz.phases.map((phase, idx) => (
                        <div key={idx} className="flex flex-col gap-4">
                          <PhaseBlock phase={phase} business={biz} isMobile={true} />
                        </div>
                      ))}
                    </div>
                  </div>
                </m.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Desktop Native Scroll Layout (hidden lg:block) */}
      <section className="hidden lg:block overflow-x-hidden pt-0">
        <div className="flex flex-col w-full">
          
          {/* Intro Cover */}
          <div className="w-full flex items-center justify-center -mt-12">
            <m.div {...fadeInUp} className="w-full max-w-7xl mx-auto px-4">
              <HeroSection
                className="w-full"
                title={<><span className="text-slate-500 text-2xl uppercase tracking-widest block mb-2 font-sans font-semibold">Proyectos Recientes</span>Casos de Éxito</>}
                subtitle="Descubre cómo hemos transformado visiones estratégicas en marcas líderes que conectan, inspiran y venden."
                images={['/cases/715.jpg', '/cases/unilabor.jpg', '/cases/715.jpg']}
                actions={[
                  { text: "Inicia tu proyecto", onClick: () => router.push('/contacto'), variant: 'default', className: "pointer-events-auto" }
                ]}
                stats={[
                  { value: "+5.3M", label: "Visualizaciones", icon: <Eye className="w-5 h-5 text-slate-600" /> },
                  { value: "+21K", label: "Interacciones", icon: <Users className="w-5 h-5 text-slate-600" /> }
                ]}
              />
            </m.div>
          </div>

          {/* Collaborators */}
          <div className="w-full py-20 pb-20 flex items-center justify-center">
            <m.div {...fadeInUp} className="w-full max-w-7xl mx-auto px-8 text-center flex flex-col items-center justify-center">
              <h2 className="font-bricolage font-extrabold text-3xl lg:text-4xl text-slate-900 tracking-tight mb-4">
                Nuestros colaboradores
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed mb-10">
                Las marcas y proyectos que han confiado en nuestro enfoque para destacar en el mercado premium.
              </p>
              <CollaboratorsSlider />
            </m.div>
          </div>

          {/* Businesses Flow */}
          <div className="flex flex-col w-full">
            {BUSINESSES.map((biz) => {
              return (
                <div key={biz.id} className="w-full h-screen flex items-center justify-center">
                  <div className="container mx-auto px-8 max-w-7xl">
                    <div className="grid grid-cols-12 gap-12 w-full items-center">
                      
                      {/* Left Column: Text content */}
                      <div className="col-span-5 flex flex-col h-full justify-center">
                        {/* Logo and Name */}
                        <m.div {...fadeInUp} className="flex items-center gap-6 mb-10 mt-4">
                          <div className="relative h-16 w-40 lg:h-20 lg:w-48 flex-shrink-0">
                            <Image 
                              src={biz.logo} 
                              alt={`${biz.name} logo`} 
                              fill 
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-contain object-left brightness-0" 
                            />
                          </div>
                          <h3 className="font-bricolage font-extrabold text-3xl lg:text-4xl tracking-tight border-l-2 pl-6 py-1 text-slate-900 border-slate-200">
                            {biz.name}
                          </h3>
                        </m.div>
                        
                        {/* Phases linearly */}
                        <div className="flex flex-col gap-12 w-full">
                          {biz.phases.map((phase, pIdx) => (
                            <m.div key={pIdx} {...fadeInUp}>
                              <PhaseBlock phase={phase} business={biz} isMobile={false} />
                            </m.div>
                          ))}
                        </div>
                      </div>

                      {/* Right Column: Large Media Showcase */}
                      <m.div {...fadeInUp} className="col-span-7 pl-8 h-full flex items-center">
                        <div className="relative w-full aspect-[16/10] rounded-[2rem] overflow-hidden bg-slate-200/50 shadow-2xl border border-slate-900/5">
                          {biz.mediaType === "video" ? (
                            <video
                              src={biz.mediaSrc}
                              aria-label={`Video de ${biz.name}`}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Image
                              src={biz.mediaSrc}
                              alt={`${biz.name} caso`}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover"
                            />
                          )}
                        </div>
                      </m.div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}

function PhaseBlock({ phase, business, isMobile }: { phase: TextPhase; business: Business; isMobile: boolean }) {
  // Theme styling is unified since it's no longer a fullscreen colored background
  const textColor = isMobile ? 'text-slate-800' : 'text-slate-900';
  const secondaryColor = 'text-slate-600';
  const tagBg = isMobile ? 'bg-slate-100 text-slate-700' : 'bg-slate-100 border-slate-900/5 text-slate-800';
  const borderTop = isMobile ? 'border-slate-100' : 'border-slate-900/10';
  const metricVal = 'text-slate-900';
  const metricLab = 'text-slate-500';
  const subColor = 'text-slate-500';

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-3">
        <p className={`font-bricolage font-extrabold ${isMobile ? 'text-lg leading-relaxed font-medium' : 'text-3xl xl:text-4xl leading-snug tracking-tight text-balance'} ${textColor}`}>
          {phase.copy}
        </p>
        {phase.secondaryCopy && (
          <p className={`${isMobile ? 'text-base font-medium mt-1' : 'text-xl font-medium tracking-normal mt-2'} ${secondaryColor}`}>
            {phase.secondaryCopy}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {phase.tags.map((tag, idx) => {
          const TagIcon = tag.icon;
          return (
            <span key={idx} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${isMobile ? '' : 'border'} ${tagBg}`}>
              <TagIcon className="w-3.5 h-3.5" />
              {tag.label}
            </span>
          );
        })}
      </div>

      {phase.metrics && (
        <div className={`grid grid-cols-2 ${isMobile ? 'gap-4 mt-2' : 'gap-6 mt-auto pt-6 border-t'} ${borderTop}`}>
          {phase.metrics.map((metric, i) => (
            <div key={i} className={`flex flex-col ${isMobile ? 'bg-slate-50 p-4 rounded-xl border border-slate-100' : ''}`}>
              <span className={`font-bricolage font-bold ${isMobile ? 'text-2xl' : 'text-3xl'} ${metricVal}`}>
                {metric.value}
              </span>
              <span className={`text-[10px] uppercase tracking-wider ${isMobile ? 'mt-1' : ''} ${metricLab}`}>
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {phase.subCopy && (
        <p className={`text-xs italic ${isMobile ? 'mt-2' : 'text-sm leading-relaxed'} ${subColor}`}>
          {phase.subCopy}
        </p>
      )}
    </div>
  );
}
