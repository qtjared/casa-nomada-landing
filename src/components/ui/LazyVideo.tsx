"use client";

import { useRef, useState, useEffect, type ComponentPropsWithoutRef } from "react";

interface LazyVideoProps extends Omit<ComponentPropsWithoutRef<"video">, "src"> {
  src: string;
  poster?: string;
  threshold?: number;
  rootMargin?: string;
}

export default function LazyVideo({
  src,
  poster,
  threshold = 0.1,
  rootMargin = "200px 0px",
  className,
  ...videoProps
}: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isInView]);

  return (
    <div ref={containerRef} className={className}>
      {isInView ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          {...videoProps}
        />
      ) : (
        <div
          className="w-full h-full bg-[var(--bg-secondary)]"
          style={poster ? { backgroundImage: `url(${poster})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
        />
      )}
    </div>
  );
}
