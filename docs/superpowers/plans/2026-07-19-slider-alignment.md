# Slider Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the "Casos de Éxito" slider to the left margin of the section title on all viewports by placing it inside the main container.

**Architecture:** Modify the container layout in `CasosPreview.tsx`. Move the horizontal scroll wrapper inside the container div and clean up the old responsive padding calculations.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, Framer Motion

## Global Constraints
- Must align perfectly with the "Casos de Éxito" title left margin across all screen sizes (mobile, tablet, desktop).
- No console or compilation errors.

---

### Task 1: Update CasosPreview.tsx Layout

**Files:**
- Modify: `src/components/sections/home/CasosPreview.tsx:86-196`

**Interfaces:**
- Consumes: Existing `CasosPreview.tsx`
- Produces: Updated layout for `CasosPreview`

- [ ] **Step 1: Modify layout in CasosPreview.tsx**
  Edit `src/components/sections/home/CasosPreview.tsx`. Move the horizontal scroll `<m.div>` inside the main `<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">` wrapper and remove the custom padding classes.

  Here is the code block to modify:
  ```tsx
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

          {/* Horizontal scroll showcase */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={sectionVariants}
            className="mt-12 lg:mt-16"
          >
            <div className="horizontal-scroll flex gap-5 lg:gap-6 pb-4">
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
        </div>
      </section>
    );
  }
  ```

- [ ] **Step 2: Build and verify compilation**
  Run build command to verify no typescript/linting issues are introduced.
  Run: `npm run build`
  Expected: Successful compilation without errors.

- [ ] **Step 3: Commit changes**
  Run:
  ```bash
  git add src/components/sections/home/CasosPreview.tsx
  git commit -m "feat: align cases slider within main container"
  ```
