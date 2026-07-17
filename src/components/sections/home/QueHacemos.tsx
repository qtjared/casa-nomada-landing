"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import {
  Briefcase,
  Camera,
  Sparkles,
  TrendingUp,
  Globe,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  mediaSrc: string;
  mediaType: "video" | "image";
  gridClass: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "estrategias",
    title: "Estrategias Digitales",
    description:
      "Alineamos objetivos de negocio con acciones tácticas para posicionar tu proyecto en el segmento premium.",
    icon: Briefcase,
    mediaSrc: "/work-media/work-1.jpg",
    mediaType: "image",
    gridClass: "col-span-1 md:col-span-4 row-span-2",
  },
  {
    id: "contenido",
    title: "Creación de Contenido",
    description:
      "Producimos narrativas visuales y editoriales impecables que capturan la atención y generan conversión.",
    icon: Camera,
    mediaSrc: "/work-media/work-3.mp4",
    mediaType: "video",
    gridClass: "col-span-1 md:col-span-2 row-span-1",
  },
  {
    id: "marketing",
    title: "Marketing Digital",
    description:
      "Conectamos tu marca con su audiencia ideal a través de campañas de posicionamiento orgánico.",
    icon: Sparkles,
    mediaSrc: "/work-media/work-2.jpg",
    mediaType: "image",
    gridClass: "col-span-1 md:col-span-2 row-span-1",
  },
  {
    id: "ads",
    title: "Campañas de Ads",
    description:
      "Maximizamos tu retorno de inversión con pauta digital ultra-segmentada y optimización continua.",
    icon: TrendingUp,
    mediaSrc: "/work-media/work-7.mp4",
    mediaType: "video",
    gridClass: "col-span-1 md:col-span-3 row-span-1",
  },
  {
    id: "sitios",
    title: "Páginas Web",
    description:
      "Diseñamos y desarrollamos plataformas web ultra rápidas, responsivas y de estética impecable.",
    icon: Globe,
    mediaSrc: "/work-media/services.png",
    mediaType: "image",
    gridClass: "col-span-1 md:col-span-3 row-span-1",
  },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function QueHacemos() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          {/* Header */}
          <m.div variants={cardVariants} className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-[var(--text-muted)] mb-4">
                <span className="w-6 h-px bg-[var(--accent)]" />
                Nuestros servicios
              </span>
              <h2 className="font-bricolage font-extrabold text-3xl lg:text-5xl text-[var(--text-primary)] tracking-tight">
                ¿Qué hace Casa Nómada?
              </h2>
            </div>
            <Link
              href="/servicios"
              prefetch={false}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:gap-3 transition-all duration-300"
            >
              Ver todos los servicios
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </m.div>

          {/* Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[280px] md:auto-rows-[240px] gap-4 lg:gap-5">
            {SERVICES.map((service, index) => (
              <BentoCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}

function BentoCard({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (service.mediaType === "video" && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (service.mediaType === "video" && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const Icon = service.icon;

  return (
    <m.div
      variants={cardVariants}
      custom={index}
      className={`relative rounded-2xl lg:rounded-3xl overflow-hidden cursor-pointer group ${service.gridClass} border transition-all duration-500 ease-out ${
        isHovered
          ? "border-[var(--accent)]/40 shadow-xl shadow-[var(--accent)]/5"
          : "border-[var(--border)] shadow-sm"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Media */}
      <div className="absolute inset-0 w-full h-full bg-white z-0 overflow-hidden">
        {service.mediaType === "video" ? (
          <video
            ref={videoRef}
            src={service.mediaSrc}
            aria-label={`Video descriptivo de ${service.title}`}
            loop
            muted
            playsInline
            className={`w-full h-full object-cover transition-all duration-700 ease-out ${
              isHovered ? "scale-105 opacity-100" : "scale-100 opacity-0"
            }`}
          />
        ) : (
          <Image
            src={service.mediaSrc}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`object-cover transition-all duration-700 ease-out ${
              isHovered ? "scale-105 opacity-100" : "scale-100 opacity-0"
            }`}
          />
        )}
      </div>

      {/* Overlay */}
      <div
        className={`absolute inset-0 transition-all duration-500 ease-out z-10 ${
          isHovered
            ? "bg-gradient-to-t from-black/80 via-black/40 to-black/10"
            : "bg-[var(--bg-card)]"
        }`}
      />

      {/* Card Content */}
      <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-between z-20 pointer-events-none">
        <div className="flex items-start justify-between">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ease-out ${
              isHovered
                ? "bg-[var(--accent)] shadow-md shadow-[var(--accent)]/20"
                : "bg-[var(--accent)]/10"
            }`}
          >
            <Icon
              className={`w-5 h-5 transition-colors duration-500 ${
                isHovered ? "text-white" : "text-[var(--accent)]"
              }`}
              strokeWidth={1.5}
            />
          </div>
          <ArrowRight
            className={`w-5 h-5 transition-all duration-500 ${
              isHovered
                ? "opacity-100 translate-x-0 text-white"
                : "opacity-0 -translate-x-2 text-[var(--text-primary)]"
            }`}
          />
        </div>

        <div className="space-y-2">
          <h3
            className={`font-bricolage font-bold text-xl lg:text-2xl transition-colors duration-500 ${
              isHovered ? "text-white" : "text-[var(--text-primary)]"
            }`}
          >
            {service.title}
          </h3>
          <p
            className={`text-sm leading-relaxed transition-all duration-500 line-clamp-3 ${
              isHovered
                ? "text-white/80 opacity-100"
                : "text-[var(--text-secondary)] opacity-80"
            }`}
          >
            {service.description}
          </p>
        </div>
      </div>
    </m.div>
  );
}
