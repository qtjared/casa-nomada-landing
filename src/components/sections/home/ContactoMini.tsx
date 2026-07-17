"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { m } from "framer-motion";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function ContactoMini() {
  return (
    <section className="py-28 lg:py-40 relative overflow-hidden">
      {/* Subtle glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[500px] bg-[var(--accent)]/[0.04] blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.1 },
            },
          }}
        >
          <m.div variants={fadeUpVariants} className="relative">
            {/* Clean card */}
            <div className="bg-white rounded-3xl lg:rounded-[2.5rem] p-8 md:p-14 lg:p-16 shadow-xl shadow-black/[0.03] border border-[var(--border)] relative overflow-hidden group">
              {/* Accent top border */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-50" />

              <div className="relative z-10">
                <div className="text-center mb-10">
                  <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-[var(--text-muted)] mb-5">
                    <span className="w-6 h-px bg-[var(--accent)]" />
                    Contacto
                    <span className="w-6 h-px bg-[var(--accent)]" />
                  </span>
                  <h2 className="font-bricolage font-extrabold text-3xl md:text-4xl lg:text-5xl text-[var(--text-primary)] tracking-tight mb-4">
                    Iniciemos la conversación
                  </h2>
                  <p className="text-[var(--text-secondary)] max-w-lg mx-auto text-base md:text-lg">
                    El primer paso hacia una identidad extraordinaria comienza con un simple mensaje.
                  </p>
                </div>

                <form
                  className="flex flex-col gap-7 max-w-2xl mx-auto"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                    <div className="relative">
                      <input
                        type="text"
                        aria-label="Nombre completo"
                        placeholder="Nombre completo"
                        className="w-full bg-transparent border-b border-[var(--border)] py-4 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors text-sm"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="email"
                        aria-label="Correo electrónico"
                        placeholder="Correo electrónico"
                        className="w-full bg-transparent border-b border-[var(--border)] py-4 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <textarea
                      rows={3}
                      aria-label="Cuéntanos un poco sobre tu proyecto"
                      placeholder="Cuéntanos un poco sobre tu proyecto..."
                      className="w-full bg-transparent border-b border-[var(--border)] py-4 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none text-sm"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-3 bg-[var(--accent)] text-white px-10 py-4 rounded-full font-medium hover:brightness-110 hover:scale-[1.02] hover:shadow-lg hover:shadow-[var(--accent)]/20 transition-all duration-300 group/btn w-full sm:w-auto"
                    >
                      Enviar propuesta
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    <Link
                      href="/contacto"
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                    >
                      O visita la página de contacto →
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
