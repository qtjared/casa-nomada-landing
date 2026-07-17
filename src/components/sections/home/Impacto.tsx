"use client";

import { m } from "framer-motion";

interface Metric {
  value: string;
  label: string;
}

const METRICS: Metric[] = [
  { value: "10+", label: "Marcas Transformadas" },
  { value: "+5.3M", label: "Alcance Digital" },
  { value: "+21K", label: "Interacciones" },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Impacto() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--text-primary)] text-white relative overflow-hidden">
      {/* Subtle accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <m.div variants={fadeUpVariants}>
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-white/40 mb-6">
              <span className="w-6 h-px bg-[var(--accent)]" />
              Nuestro impacto
            </span>
            <h2 className="font-bricolage font-extrabold text-3xl lg:text-5xl tracking-tight mb-6 leading-tight">
              Diseño que trasciende.{" "}
              <span className="text-white/40">Resultados que perduran.</span>
            </h2>
            <p className="text-white/60 text-base lg:text-lg leading-relaxed max-w-lg">
              No hacemos proyectos para llenar portafolios; construimos sistemas
              y estéticas que impulsan el crecimiento y conectan profundamente
              con tu audiencia.
            </p>
          </m.div>

          <div className="grid grid-cols-3 gap-6 lg:gap-8">
            {METRICS.map((metric, index) => (
              <m.div
                key={metric.label}
                variants={fadeUpVariants}
                className="flex flex-col border-l border-[var(--accent)]/30 pl-5 lg:pl-6"
              >
                <m.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + index * 0.1,
                  }}
                  className="font-bricolage font-bold text-3xl lg:text-5xl mb-2 text-[var(--accent)]"
                >
                  {metric.value}
                </m.span>
                <span className="text-xs font-medium uppercase tracking-[0.1em] text-white/40">
                  {metric.label}
                </span>
              </m.div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}
