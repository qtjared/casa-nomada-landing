"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useSyncExternalStore, useRef } from "react";
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

// Mobile menu animation variants
const menuVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const linkVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1], // fluid ease out
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.2,
      ease: "easeIn",
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

  const navRef = useRef<HTMLElement>(null);

  // Close menu on click outside or scroll
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (isOpen && navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      setTimeout(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
      }, 50);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  // Dynamically set theme-color meta tag
  useEffect(() => {
    let meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    // Always match the page background — the navbar floats below the notch
    meta.content = '#FAF8F5';
  }, [isOpen, isScrolled]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[1000] pointer-events-none"
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      {/* Floating Island Pill */}
      <div
        className={`
          pointer-events-auto relative
          mx-3 sm:mx-4 md:mx-auto mt-3 sm:mt-4
          md:max-w-3xl lg:max-w-4xl
          rounded-[22px]
          transition-all duration-300 ease-out
          ${isScrolled || isOpen
            ? 'bg-[#F4F1ED]/85 backdrop-blur-xl shadow-lg shadow-black/[0.06] border border-black/[0.04]'
            : 'bg-[#F4F1ED]/60 backdrop-blur-md shadow-md shadow-black/[0.03] border border-black/[0.03]'
          }
        `}
      >
        {/* Inner content with padding */}
        <div className="flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6">
          {/* Left: Brand Name */}
          <div className="flex-1 flex justify-start">
            <Link
              href="/"
              onClick={(e) => {
                if (isOpen) setIsOpen(false);
                handleLinkClick(e, "/");
              }}
              className="text-[15px] sm:text-base font-bold tracking-tight text-[var(--text-primary)] font-sans whitespace-nowrap"
            >
              Casa Nómada
            </Link>
          </div>

          {/* Center: Logo (opens mobile menu on tap) */}
          <div className="flex-shrink-0 flex justify-center">
            <Link
              href="/"
              onClick={handleLogoClick}
              className="block select-none"
            >
              <m.div
                animate={{ rotate: isOpen && isMobile ? -180 : 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative w-9 h-9 sm:w-10 sm:h-10 cursor-pointer active:scale-95 transition-transform"
              >
                <Image
                  src="/logo.png"
                  alt="Casa Nómada Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </m.div>
            </Link>
          </div>

          {/* Right: Desktop Navigation */}
          <nav className="flex-1 hidden md:flex justify-end items-center gap-6">
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

      {/* Floating Mobile Dropdown — detached from the pill */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.2, 0, 0.1, 1] }}
            className="pointer-events-auto mx-3 sm:mx-4 mt-2 rounded-[22px] bg-[#F4F1ED] shadow-xl shadow-black/[0.08] border border-black/[0.05] overflow-hidden"
          >
            <m.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex flex-col items-center gap-4 py-6 px-6"
            >
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <m.div key={link.label} variants={linkVariants} className="w-full">
                    <Link
                      href={link.href}
                      onClick={(e) => handleMobileLinkClick(e, link.href)}
                      className={`relative group font-bricolage text-2xl font-semibold tracking-tight transition-colors py-2 block text-center ${
                        isActive
                          ? "text-[var(--accent)]"
                          : "text-[var(--text-primary)] hover:text-[var(--accent)]"
                      }`}
                    >
                      {link.label}

                      {/* Active dot indicator */}
                      {isActive && (
                        <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                      )}
                    </Link>
                  </m.div>
                );
              })}
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
