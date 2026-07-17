"use client";

import Image from "next/image";
import { m, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const textRevealVariants: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export default function Conocenos() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden py-28 lg:py-40 border-t border-[var(--border)]"
    >
      {/* Subtle accent glow */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-[var(--accent)]/[0.03] rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

      {/* Side label */}
      <div className="absolute left-4 lg:left-10 top-1/2 -translate-y-1/2 -rotate-90 hidden md:block origin-center">
        <span className="text-[10px] font-semibold tracking-[0.4em] text-[var(--text-muted)] uppercase">
          EST. 2024
        </span>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Text Column */}
          <m.div
            className="flex flex-col justify-center order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="overflow-hidden mb-4">
              <m.span
                variants={textRevealVariants}
                className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-[var(--text-muted)] mb-4 block"
              >
                <span className="w-6 h-px bg-[var(--accent)]" />
                Nuestra filosofía
              </m.span>
            </div>

            <div className="overflow-hidden mb-8">
              <m.h2
                variants={textRevealVariants}
                className="font-bricolage font-extrabold text-3xl md:text-4xl lg:text-5xl text-[var(--text-primary)] tracking-tight"
              >
                Creatividad con propósito
              </m.h2>
            </div>

            <div className="flex flex-col gap-5">
              <div className="overflow-hidden">
                <m.p
                  variants={textRevealVariants}
                  className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed"
                >
                  En Casa Nómada, creemos que el éxito de una marca no se mide
                  solo en métricas o likes, sino en su capacidad para generar
                  conversaciones genuinas y conexiones memorables con su
                  audiencia.
                </m.p>
              </div>
              <div className="overflow-hidden">
                <m.p
                  variants={textRevealVariants}
                  className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed"
                >
                  Combinamos análisis estratégico con dirección de arte premium
                  para crear ecosistemas digitales vivos, donde cada elemento
                  cuenta una historia cohesiva.
                </m.p>
              </div>
            </div>

            {/* Stats inline */}
            <m.div
              variants={textRevealVariants}
              className="mt-10 flex gap-10 border-t border-[var(--border)] pt-8"
            >
              <div>
                <p className="font-bricolage font-bold text-2xl lg:text-3xl text-[var(--accent)]">10+</p>
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-wide mt-1">Marcas</p>
              </div>
              <div>
                <p className="font-bricolage font-bold text-2xl lg:text-3xl text-[var(--accent)]">100%</p>
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-wide mt-1">Compromiso</p>
              </div>
            </m.div>
          </m.div>

          {/* Visual Column */}
          <m.div
            className="relative order-1 lg:order-2 w-full h-[450px] md:h-[550px] lg:h-[650px]"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden border border-[var(--border)]">
              <m.div
                style={{ y: yImage, scale: 1.15 }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src="/nosotros.jpg"
                  alt="Casa Nómada Filosofía"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </m.div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
