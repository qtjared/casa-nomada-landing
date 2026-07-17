"use client";

import Image from "next/image";

const COLLABORATORS = [
  { id: "2ndfloor", name: "2nd Floor", src: "/cases/logos/2ndfloor-logo.png" },
  { id: "715", name: "715", src: "/cases/logos/715-logo.png" },
  { id: "laut", name: "Laut", src: "/cases/logos/laut-logo.png" },
  { id: "mardo", name: "Mardo", src: "/cases/logos/mardo-logo.png" },
  { id: "madan", name: "Madan", src: "/cases/logos/madan-logo.jpg.png" },
  { id: "unilabor", name: "Unilabor", src: "/cases/logos/unilabor-logo.png" },
  { id: "belafiori", name: "Belafiori", src: "/cases/logos/belafiori-logo.png" },
  { id: "edoarda", name: "Edoarda", src: "/cases/logos/edoarda-logo.png" },
  { id: "multitask", name: "Multitask", src: "/cases/logos/multitask.png" },
  { id: "caimito", name: "Caimito", src: "/cases/logos/caimito-logo.png" },
];

export default function CollaboratorsSlider() {
  return (
    <section className="w-full overflow-hidden py-10 border-y border-[var(--border)]">
      <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 animate-scroll whitespace-nowrap">
          {/* Duplicate for infinite scroll */}
          {[...COLLABORATORS, ...COLLABORATORS].map((collaborator, index) => (
            <li
              key={`${collaborator.id}-${index}`}
              className="relative w-28 h-14 md:w-36 md:h-16 flex-shrink-0"
            >
              <Image
                src={collaborator.src}
                alt={collaborator.name}
                fill
                sizes="(max-width: 768px) 112px, 144px"
                className="object-contain brightness-0 opacity-30 hover:opacity-60 transition-opacity duration-500"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
