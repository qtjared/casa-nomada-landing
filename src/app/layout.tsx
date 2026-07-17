import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Providers } from "@/components/Providers";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Casa Nómada | Agencia Creativa de Élite",
  description:
    "Casa Nómada es una célula creativa en Villahermosa y Monterrey, estructurando marcas de hospitalidad y comercio premium con estrategias digitales, contenido y desarrollo web.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${bricolageGrotesque.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen relative noise-overlay">
        <Providers>
          <div className="relative z-10">
            <Navbar />
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}