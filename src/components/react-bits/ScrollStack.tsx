"use client";

// Adapted from the user-supplied React Bits ScrollStack. See THIRD_PARTY_NOTICES.md.
import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import "./ScrollStack.css";

export function ScrollStackItem({ children, itemClassName = "", id }: { children: ReactNode; itemClassName?: string; id?: string }) {
  return <div className="scroll-stack-card-wrapper"><article id={id} className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</article></div>;
}

type ScrollStackProps = {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  enabled?: boolean;
  onStackComplete?: () => void;
};
const progress = (value: number, start: number, end: number) => Math.min(1, Math.max(0, (value - start) / Math.max(1, end - start)));
const pixels = (value: string, height: number) => value.endsWith("%") ? parseFloat(value) * height / 100 : parseFloat(value);

export default function ScrollStack({ children, className = "", itemDistance = 90, itemScale = 0.02, itemStackDistance = 18, stackPosition = "16%", scaleEndPosition = "8%", baseScale = 0.9, rotationAmount = 0, blurAmount = 0, enabled = true, onStackComplete }: ScrollStackProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const wrappers = Array.from(root.querySelectorAll<HTMLElement>(".scroll-stack-card-wrapper"));
    const cards = wrappers.map(wrapper => wrapper.querySelector<HTMLElement>(".scroll-stack-card")!);
    const end = root.querySelector<HTMLElement>(".scroll-stack-end")!;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let lenisFrame = 0;
    let lenis: Lenis | null = null;
    let near = false;
    let completed = false;
    let disposed = false;

    function stopSmoothScroll() {
      cancelAnimationFrame(lenisFrame);
      lenis?.destroy();
      lenis = null;
    }
    function startSmoothScroll() {
      if (lenis || !near || document.hidden) return;
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false, anchors: { offset: -100 }, prevent: node => !!node.closest('[role="dialog"]') || document.body.style.overflow === "hidden" });
      const tick = (time: number) => {
        if (!lenis) return;
        lenis.raf(time);
        lenisFrame = requestAnimationFrame(tick);
      };
      lenisFrame = requestAnimationFrame(tick);
    }
    function update() {
      frame = 0;
      const scrollTop = window.scrollY;
      const height = window.innerHeight;
      const pinPosition = Math.max(108, pixels(stackPosition, height));
      // Measure stable, untransformed wrappers; measuring transformed cards causes drift.
      const tops = wrappers.map(wrapper => wrapper.getBoundingClientRect().top + scrollTop);
      const tallest = Math.max(...cards.map(card => card.offsetHeight));
      const canStack = enabled && !preference.matches && height > tallest + pinPosition + itemStackDistance * (cards.length - 1) + 36;
      root!.dataset.stacking = String(canStack);
      if (!canStack) {
        stopSmoothScroll();
        cards.forEach(card => { card.style.transform = ""; card.style.filter = ""; });
        return;
      }
      startSmoothScroll();
      const pinStarts = tops.map((top, i) => top - pinPosition - itemStackDistance * i);
      const pinEnd = Math.max(pinStarts[pinStarts.length - 1], end.getBoundingClientRect().top + scrollTop - height / 2);
      let topCard = 0;
      pinStarts.forEach((start, i) => { if (scrollTop >= start) topCard = i; });
      cards.forEach((card, i) => {
        const amount = progress(scrollTop, pinStarts[i], tops[i] - pixels(scaleEndPosition, height));
        const scale = 1 - amount * (1 - Math.min(1, baseScale + i * itemScale));
        const y = Math.max(0, Math.min(scrollTop, pinEnd) - pinStarts[i]);
        card.style.transform = `translate3d(0,${y.toFixed(2)}px,0) scale(${scale.toFixed(4)}) rotate(${i * rotationAmount * amount}deg)`;
        card.style.filter = blurAmount && i < topCard ? `blur(${(topCard - i) * blurAmount}px)` : "";
      });
      const done = scrollTop >= pinStarts[pinStarts.length - 1] && scrollTop <= pinEnd;
      if (done && !completed) onStackComplete?.();
      completed = done;
    }
    function schedule() { if (!frame && !disposed) frame = requestAnimationFrame(update); }
    function visibility() { if (document.hidden) stopSmoothScroll(); else schedule(); }
    const observer = new ResizeObserver(schedule);
    observer.observe(root);
    wrappers.forEach(wrapper => observer.observe(wrapper));
    const intersection = new IntersectionObserver(([entry]) => {
      near = entry.isIntersecting;
      if (!near) stopSmoothScroll();
      schedule();
    }, { rootMargin: "150px 0px" });
    intersection.observe(root);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("visibilitychange", visibility);
    preference.addEventListener("change", schedule);
    document.fonts.ready.then(schedule);
    schedule();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      stopSmoothScroll();
      observer.disconnect();
      intersection.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", visibility);
      preference.removeEventListener("change", schedule);
      cards.forEach(card => { card.style.transform = ""; card.style.filter = ""; });
      delete root.dataset.stacking;
    };
  }, [enabled, itemScale, itemStackDistance, stackPosition, scaleEndPosition, baseScale, rotationAmount, blurAmount, onStackComplete]);
  return <div ref={rootRef} className={`scroll-stack-scroller ${className}`} style={{ "--stack-gap": `${itemDistance}px` } as CSSProperties}>
    <div className="scroll-stack-inner">{children}<div className="scroll-stack-end" aria-hidden="true" /></div>
  </div>;
}
