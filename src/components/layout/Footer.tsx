import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  label: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const QUICK_LINKS: FooterLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Clientes", href: "/clientes" },
  { label: "Contacto", href: "/contacto" },
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/casanomadamx",
    icon: InstagramIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/casa-nomada-mx/",
    icon: LinkedinIcon,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[var(--border)] mt-0">
      {/* Monumental Brand Name */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-16 lg:pt-24 pb-12">
        <h2 className="font-bricolage font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem] tracking-tighter leading-none text-[var(--border)] select-none" aria-hidden="true">
          Casa Nómada
        </h2>
      </div>

      {/* Content Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-16 lg:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand */}
          <div>
            <Link href="/" prefetch={false} className="block relative w-10 h-10 mb-5">
              <Image
                src="/logo.png"
                alt="Casa Nómada Logo"
                fill
                sizes="40px"
                className="object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs text-[var(--text-secondary)]">
              Una célula creativa basada en Villahermosa y Monterrey, estructurando marcas de hospitalidad y comercio premium.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bricolage font-bold text-xs uppercase tracking-[0.2em] mb-5 text-[var(--text-primary)]">
              Navegación
            </h4>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    prefetch={false}
                    className="text-sm transition-colors inline-flex items-center gap-1 group text-[var(--text-secondary)] hover:text-[var(--accent)]"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-bricolage font-bold text-xs uppercase tracking-[0.2em] mb-5 text-[var(--text-primary)]">
              Contacto
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:info@casanomada.com.mx"
                  className="text-sm transition-colors text-[var(--text-secondary)] hover:text-[var(--accent)]"
                >
                  info@casanomada.com.mx
                </a>
              </li>
              <li className="text-sm text-[var(--text-secondary)]">
                Villahermosa, Tabasco
              </li>
              <li className="text-sm text-[var(--text-secondary)]">
                Monterrey, Nuevo León
              </li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div>
            <h4 className="font-bricolage font-bold text-xs uppercase tracking-[0.2em] mb-5 text-[var(--text-primary)]">
              Síguenos
            </h4>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center transition-all duration-300 text-[var(--text-secondary)] hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] hover:scale-105"
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            © {currentYear} Casa Nómada. Todos los derechos reservados.
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Villahermosa — Monterrey
          </p>
        </div>
      </div>
    </footer>
  );
}
