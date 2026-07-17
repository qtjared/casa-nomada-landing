"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { m } from "framer-motion";
import { InteractiveImageAccordion } from "@/components/ui/interactive-image-accordion";

/* ─── Title lines for staggered reveal ─── */
const titleLines = [
  { text: "Creatividad", highlight: false },
  { text: "que transforma", highlight: false },
  { text: "marcas.", highlight: true },
];

/* ─── Framer Motion variants ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const lineVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const fadeUpVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const descriptionWords =
  "Una célula creativa basada en Villahermosa y Monterrey, estructurando marcas de hospitalidad y comercio premium.".split(
    " "
  );

const wordContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.5,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center pt-24 pb-16 lg:pt-0 lg:pb-0 overflow-hidden">
      {/* Subtle accent glow */}
      <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[var(--accent)]/[0.04] blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[var(--accent)]/[0.03] blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 min-h-[85vh]">
          {/* Left Side: Text Content */}
          <div className="w-full lg:w-1/2 relative z-20 flex flex-col justify-center text-center lg:text-left mt-10 lg:mt-0">
            <m.div variants={containerVariants} initial="hidden" animate="visible">

              {/* Main headline */}
              <h1 className="font-bricolage font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[6rem] tracking-tighter text-[var(--text-primary)] leading-[0.95] mb-8">
                {titleLines.map((line, index) => (
                  <span key={index} className="block overflow-hidden py-1">
                    <m.span
                      variants={lineVariants}
                      className={`block ${
                        line.highlight
                          ? "text-[var(--accent)] italic"
                          : ""
                      }`}
                    >
                      {line.text}
                    </m.span>
                  </span>
                ))}
              </h1>

              {/* Staggered word-by-word description */}
              <m.p
                variants={wordContainerVariants}
                initial="hidden"
                animate="visible"
                className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10"
              >
                {descriptionWords.map((word, i) => (
                  <m.span key={i} variants={wordVariants} className="inline-block mr-[0.3em]">
                    {word}
                  </m.span>
                ))}
              </m.p>

              {/* CTAs */}
              <m.div variants={fadeUpVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start sm:items-center">
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center gap-3 bg-[var(--accent)] text-white px-8 py-4 rounded-full font-medium hover:brightness-110 hover:shadow-lg hover:shadow-[var(--accent)]/20 hover:scale-[1.02] transition-all duration-300 group"
                >
                  Iniciar proyecto
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>

                <Link
                  href="/clientes"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full font-medium text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300"
                >
                  Ver portafolio
                </Link>
              </m.div>
            </m.div>
          </div>

          {/* Right Side: Image Accordion */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0">
            <m.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[500px] lg:max-w-none"
            >
              <InteractiveImageAccordion />
            </m.div>
          </div>

        </div>
      </div>
    </section>
  );
}
