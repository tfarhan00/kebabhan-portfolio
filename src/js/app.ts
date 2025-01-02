import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

const khButtonEl = document.querySelector("#kh-button");
const easterEggTextEls = gsap.utils.toArray("#easter-egg-text");

let isEasterEggOpen = false;
let isFlipAnimationRunning = false;
let isTextAnimationRunning = false;

function animateEasterEggText(isOpen: boolean) {
  isTextAnimationRunning = true;
  let tween = null;

  if (isOpen) {
    tween = gsap.to(easterEggTextEls, {
      y: "0%",
      opacity: 1,
      ease: "elastic",
      duration: 0.6,
      stagger: 0.1,
    });
  } else {
    tween = gsap.to(easterEggTextEls, {
      y: "100%",
      ease: "elastic.in",
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
    });
  }

  tween.then(() => {
    isTextAnimationRunning = false;
  });

  return tween;
}

let easterEggTextTween: gsap.core.Tween | null = null;

function toggleEasterEgg() {
  if (!khButtonEl) return;
  if (isFlipAnimationRunning) return;
  if (isTextAnimationRunning) return;

  isFlipAnimationRunning = true;
  isEasterEggOpen = !isEasterEggOpen;

  if (isEasterEggOpen) {
    const initialState = Flip.getState("#kh-button");

    khButtonEl.classList.add("kh-open");
    khButtonEl.classList.remove("kh-closed");

    Flip.from(initialState, {
      duration: 1,
      absolute: true,
      ease: "power2.inOut",
      onComplete: () => {
        isFlipAnimationRunning = false;
        easterEggTextTween = animateEasterEggText(isEasterEggOpen);
      },
    });
  } else {
    easterEggTextTween = animateEasterEggText(isEasterEggOpen);

    easterEggTextTween.then(() => {
      const initialState = Flip.getState("#kh-button");

      khButtonEl.classList.add("kh-closed");
      khButtonEl.classList.remove("kh-open");

      Flip.from(initialState, {
        duration: 1,
        absolute: true,
        ease: "power2.inOut",
        onComplete: () => {
          isFlipAnimationRunning = false;
          isTextAnimationRunning = false;
        },
      });
    });
  }
}

khButtonEl?.addEventListener("click", toggleEasterEgg);
