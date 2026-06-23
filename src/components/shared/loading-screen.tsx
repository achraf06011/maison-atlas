"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { RESTAURANT } from "@/lib/constants";

export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only show the cinematic intro once per browser session.
    if (typeof window !== "undefined" && sessionStorage.getItem("ma_loaded")) {
      setDone(true);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("ma_loaded", "1");
          setDone(true);
        },
      });

      tl.fromTo(
        ".loader-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.4, ease: "power3.inOut" }
      )
        .fromTo(
          ".loader-name span",
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.06,
            ease: "power4.out",
          },
          "-=1"
        )
        .fromTo(
          ".loader-tag",
          { opacity: 0, letterSpacing: "0.1em" },
          { opacity: 1, letterSpacing: "0.45em", duration: 0.9, ease: "power2.out" },
          "-=0.4"
        )
        .to(".loader-content", { opacity: 0, duration: 0.6, delay: 0.5 })
        .to(root.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
        });
    }, root);

    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-noir"
    >
      <div className="loader-content flex flex-col items-center px-6 text-center">
        <h1 className="loader-name overflow-hidden font-serif text-5xl text-ivory sm:text-7xl">
          {RESTAURANT.name.split("").map((char, i) => (
            <span key={i} className="inline-block">
              {char === " " ? " " : char}
            </span>
          ))}
        </h1>
        <div className="loader-line my-6 h-px w-40 origin-left bg-gold" />
        <p className="loader-tag text-xs uppercase tracking-[0.4em] text-gold">
          {RESTAURANT.tagline}
        </p>
      </div>
    </div>
  );
}
