"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface UseGSAPOptions {
  scope?: React.RefObject<HTMLElement | null>;
  dependencies?: unknown[];
}

/**
 * Lightweight useGSAP-style hook. Runs the callback inside a gsap.context
 * scoped to the provided ref, and reverts every tween/ScrollTrigger on cleanup.
 */
export function useGSAP(
  callback: () => void,
  { scope, dependencies = [] }: UseGSAPOptions = {}
) {
  const saved = useRef(callback);
  saved.current = callback;

  useEffect(() => {
    const ctx = gsap.context(() => saved.current(), scope?.current ?? undefined);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
