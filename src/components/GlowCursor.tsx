"use client";

import { useEffect, useRef } from "react";

export default function GlowCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;

    if (!cursor || !trail) return;

    // Only activate glow cursor on devices with a fine pointer (not touch)
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasPointer) return;

    // Show the glow elements and hide the default cursor
    cursor.style.display = "block";
    trail.style.display = "block";
    document.documentElement.classList.add("glow-active");

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;
      trail.style.top = `${e.clientY}px`;
      trail.style.left = `${e.clientX}px`;
    };

    const onMouseEnterInteractive = () => {
      cursor.style.width = "36px";
      cursor.style.height = "36px";
    };

    const onMouseLeaveInteractive = () => {
      cursor.style.width = "24px";
      cursor.style.height = "24px";
    };

    document.addEventListener("mousemove", onMouseMove);

    const interactives = document.querySelectorAll(
      "a, button, input, textarea, select, [role='button']"
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.documentElement.classList.remove("glow-active");
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} id="glow-cursor" style={{ display: "none" }} />
      <div ref={trailRef} id="glow-trail" style={{ display: "none" }} />
    </>
  );
}
