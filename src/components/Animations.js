// src/animations.js

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Fade Animations
export const fadeIn = (target) => {
  gsap.fromTo(target, { opacity: 0 }, { opacity: 1, duration: 1.5 });
};

export const fadeOut = (target) => {
  gsap.to(target, { opacity: 0, duration: 1 });
};

// Slide Animations
export const slideInFromLeft = (target) => {
  gsap.from(target, { x: -200, opacity: 0, duration: 1.5 });
};

export const slideInFromRight = (target) => {
  gsap.from(target, { x: 200, opacity: 0, duration: 1.5 });
};

export const slideInFromTop = (target) => {
  gsap.from(target, { y: -200, opacity: 0, duration: 1.5 });
};

export const slideInFromBottom = (target) => {
  gsap.from(target, { y: 200, opacity: 0, duration: 1.5 });
};

// Scale Animations
export const scaleUp = (target) => {
  gsap.from(target, { scale: 0, duration: 1 });
};

export const scaleDown = (target) => {
  gsap.to(target, { scale: 0, duration: 1 });
};

// Rotation Animations
export const rotateClockwise = (target) => {
  gsap.to(target, { rotation: 360, duration: 2 });
};

export const rotateCounterClockwise = (target) => {
  gsap.to(target, { rotation: -360, duration: 2 });
};

// Staggered Animations
export const staggerAnimation = (targets) => {
  gsap.from(targets, {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1,
  });
};

// Staggered Slide-In Animation from Left
export const staggerSlideInFromLeft = (targets, staggerTime = 0.2) => {
  gsap.fromTo(
    targets,
    { x: -100, opacity: 0 },
    { x: 0, opacity: 1, duration: 1, stagger: staggerTime, ease: "power3.out" }
  );
};

// Staggered Slide-In Animation from Right
export const staggerSlideInFromRight = (targets, staggerTime = 0.2) => {
  gsap.fromTo(
    targets,
    { x: 100, opacity: 0 },
    { x: 0, opacity: 1, duration: 1, stagger: staggerTime, ease: "power3.out" }
  );
};

// Staggered Slide-In Animation from Top
// export const staggerSlideInFromTop = (targets, staggerTime = 0.2) => {
//   gsap.from(targets, {
//     y: -50,
//     opacity: 0,
//     duration: 1,
//     stagger: staggerTime,
//     ease: "power3.out",
//   });
// };

export const staggerSlideInFromTop = (targets, staggerTime = 0.2) => {
  gsap.fromTo(
    targets,
    { y: -50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.8, stagger: staggerTime, ease: "power2.out" }
  );
};

// Scroll-triggered Animations
export const scrollTriggerFadeIn = (target) => {
  gsap.from(target, {
    opacity: 0,
    y: 100,
    scrollTrigger: {
      trigger: target,
      start: "top 80%",
      end: "top 50%",
      scrub: true,
    },
  });
};

// Looping Animation
export const loopAnimation = (target) => {
  gsap.to(target, {
    x: 100,
    duration: 2,
    repeat: -1,
    yoyo: true,
  });
};

// Text Reveal Animation (staggered)
export const revealText = (target) => {
  gsap.from(target, {
    opacity: 0,
    y: 50,
    stagger: 0.1,
    duration: 1.5,
  });
};

// Bounce Animation
export const bounceIn = (target) => {
  gsap.from(target, { y: -300, ease: "bounce.out", duration: 2 });
};

// Elastic Animation
export const elasticScale = (target) => {
  gsap.to(target, { scale: 1.5, ease: "elastic.out(1, 0.3)", duration: 2 });
};

// ScrollTrigger Animations with Locomotive Scroll integration
export const locomotiveScrollTrigger = (target, scroller) => {
  gsap.from(target, {
    opacity: 0,
    scrollTrigger: {
      trigger: target,
      scroller: scroller, // Connect with Locomotive's scroller
      start: "top 80%",
      scrub: true,
    },
  });
};

// Timeline Animation (sequenced)
export const timelineAnimation = (target) => {
  const tl = gsap.timeline();
  tl.from(target, { x: -200, opacity: 0, duration: 1.5 })
    .to(target, { rotation: 360, duration: 1 })
    .to(target, { scale: 1.5, duration: 1 });
};
