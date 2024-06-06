"use strict";
window.reveal = ScrollReveal({ reset: true });

const elementsToRevealSlowly = [".skills", ".aboute", ".projects", ".contacts"];
const revealSlowlyConfig = {
  duration: 1000,
  distance: "90px",
  delay: 400,
};
elementsToRevealSlowly.forEach((e) => reveal.reveal(e, revealSlowlyConfig));

const elemetsToRevealFast = [".me", ".project-preview-contain"];
const revealFastConfig = {
  duration: 1000,
  distance: "90px",
  delay: 600,
};
elemetsToRevealFast.forEach((e) => reveal.reveal(e, revealFastConfig));
