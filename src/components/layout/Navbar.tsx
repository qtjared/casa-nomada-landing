"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { m, AnimatePresence, Variants } from "framer-motion";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Clientes", href: "/clientes" },
  { label: "Contacto", href: "/contacto" },
];

// Mobile menu links animation variants
const menuVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const linkVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function Navbar() {
  const pathname = usePathname();

  const isScrolled = useSyncExternalStore(
    (callback) => {
      window.addEventListener("scroll", callback, { passive: true });
      return () => window.removeEventListener("scroll", callback);
    },
    () => window.scrollY > 20,
    () => false
  );

  const isMobile = useSyncExternalStore(
    (callback) => {
      window.addEventListener("resize", callback);
      return () => window.removeEventListener("resize", callback);
    },
    () => window.innerWidth < 768,
    () => false
  );

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile) {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else {
      handleLinkClick(e, "/");
    }
  };

  const handleMobileLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setIsOpen(false);
    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const bgClasses = isOpen
    ? "bg-transparent"
    : isScrolled
    ? "bg-[var(--bg-primary)]/95 backdrop-blur-md shadow-sm shadow-black/[0.03]"
    : "bg-transparent";

  return (
    <>
      <header className={`sticky top-0 left-0 w-full z-[1000] transition-all duration-300 ${bgClasses}`}>
        {/* iOS Notch/Overscroll Extender: Shoots upwards 150px to guarantee no gap ever appears above the navbar */}
        <div className={`absolute bottom-full left-0 w-full h-[150px] transition-all duration-300 ${bgClasses}`} aria-hidden="true" />
        
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl transition-all duration-300 ${isScrolled ? 'py-0' : 'py-2'}`}>
          <div className="flex items-center justify-between h-20">
            {/* Left: Logo/Name Text */}
            <div className="flex-1 flex justify-start">
              <Link
                href="/"
                onClick={(e) => {
                  if (isOpen) setIsOpen(false);
                  handleLinkClick(e, "/");
                }}
                className="text-lg font-bold tracking-tight text-[var(--text-primary)] font-sans"
              >
                Casa Nómada
              </Link>
            </div>

            {/* Center: The actual image logo */}
            <div className="flex-shrink-0 flex justify-center">
              <Link
                href="/"
                onClick={handleLogoClick}
                className="block select-none"
              >
                <m.div
                  animate={{ rotate: isOpen && isMobile ? -180 : 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative w-11 h-11 cursor-pointer active:scale-95 transition-transform"
                >
                  <Image
                    src="/logo.png"
                    alt="Casa Nómada Logo"
                    fill
                    sizes="44px"
                    className="object-contain"
                    priority
                  />
                </m.div>
              </Link>
            </div>

            {/* Right: Navigation Links (Desktop) */}
            <nav className="flex-1 hidden md:flex justify-end items-center gap-7">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`relative text-sm font-medium transition-colors py-1 group ${
                      isActive
                        ? "text-[var(--accent)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {link.label}

                    {/* Hover underline */}
                    {!isActive && (
                      <span className="absolute left-0 -bottom-1 w-0 h-[1.5px] bg-[var(--accent)] group-hover:w-full transition-all duration-300" />
                    )}

                    {/* Active underline */}
                    {isActive && (
                      <m.div
                        layoutId={isMobile ? undefined : "navbar-underline"}
                        className="absolute left-0 -bottom-1 w-full h-[1.5px] bg-[var(--accent)]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Overlay Menu */}
      <AnimatePresence>
        {isOpen && isMobile && typeof document !== 'undefined' && createPortal(
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 bottom-0 left-0 right-0 w-full bg-[var(--bg-primary)]/95 backdrop-blur-md z-[999] overflow-y-auto flex flex-col justify-center items-center"
          >
            <m.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex flex-col items-center gap-8 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] my-auto"
            >
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <m.div key={link.label} variants={linkVariants}>
                    <Link
                      href={link.href}
                      onClick={(e) => handleMobileLinkClick(e, link.href)}
                      className={`relative group font-bricolage text-4xl font-semibold tracking-tight transition-colors py-2 block ${
                        isActive
                          ? "text-[var(--accent)]"
                          : "text-[var(--text-primary)] hover:text-[var(--accent)]"
                      }`}
                    >
                      {link.label}

                      {/* Hover underline on mobile */}
                      {!isActive && (
                        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[var(--accent)] group-hover:w-full transition-all duration-300" />
                      )}

                      {/* Active underline on mobile */}
                      {isActive && (
                        <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[var(--accent)]" />
                      )}
                    </Link>
                  </m.div>
                );
              })}
            </m.div>
          </m.div>,
          document.body
        )}
      </AnimatePresence>
    </>
  );
}
