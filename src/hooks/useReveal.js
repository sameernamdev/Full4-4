import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate, stagger } from "animejs";

gsap.registerPlugin(ScrollTrigger);

export function useReveal() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTargets = document.querySelectorAll("[data-anime-hero]");
      if (heroTargets.length) {
        animate(heroTargets, {
          translateY: [22, 0],
          opacity: [0, 1],
          scale: [0.96, 1],
          delay: stagger(70),
          duration: 520,
          ease: "outCubic",
        });
      }

      const pulseTargets = document.querySelectorAll("[data-anime-pulse]");
      if (pulseTargets.length) {
        animate(pulseTargets, {
          rotate: [0, 360],
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.9, 0.35],
          duration: 3600,
          loop: true,
          ease: "inOutSine",
        });
      }

      gsap.utils.toArray(".reveal, .reveal-left, .reveal-right").forEach((el) => {
        const fromX = el.classList.contains("reveal-left")
          ? -48
          : el.classList.contains("reveal-right")
            ? 48
            : 0;
        gsap.fromTo(
          el,
          { autoAlpha: 0.18, x: fromX, y: fromX ? 0 : 24, scale: 0.99 },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.42,
            ease: "power2.out",
            delay: Number.parseFloat(el.dataset.delay || "0"),
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              once: true,
            },
          }
        );
      });

      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        const distance = Number.parseFloat(el.dataset.parallax || "60");
        gsap.to(el, {
          y: distance,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      gsap.utils.toArray("[data-scroll-float]").forEach((el) => {
        const direction = Number.parseFloat(el.dataset.scrollFloat || "1");
        gsap.to(el, {
          y: direction * -28,
          rotate: direction * 1.2,
          scale: 1.015,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        });
      });

      gsap.utils.toArray("[data-tilt-3d]").forEach((el) => {
        gsap.fromTo(
          el,
          { rotateX: 8, rotateY: -10, z: -40 },
          {
            rotateX: -5,
            rotateY: 8,
            z: 24,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );
      });

      gsap.utils.toArray("[data-image-zoom]").forEach((el) => {
        gsap.to(el, {
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);
}
