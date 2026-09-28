"use strict";

// Progressive enhancement: navigation, text and every lab work without JS.
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const mobileViewport = window.matchMedia("(max-width: 860px)");
const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-nav");
const sectionLinks = [...navigation.querySelectorAll('a[href^="#"]')];

function setMenu(open, returnFocus = false) {
  menuButton.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("is-open", open);
  if (returnFocus) menuButton.focus();
}

menuButton.hidden = false;
header.classList.add("nav-ready");
menuButton.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton.getAttribute("aria-expanded") === "true"
  ) {
    setMenu(false, true);
  }
});
document.addEventListener("click", (event) => {
  if (!header.contains(event.target)) setMenu(false);
});
header.addEventListener("focusout", (event) => {
  if (!header.contains(event.relatedTarget)) setMenu(false);
});
mobileViewport.addEventListener("change", () => setMenu(false));
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});

// Keep native anchor/history behavior and move keyboard focus to the target.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    const target = document.getElementById(link.hash.slice(1));
    if (!target) return;
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  });
});

// A passive, frame-throttled listener tracks the section being read.
const sections = sectionLinks.map((link) => document.querySelector(link.hash));
const githubSection = document.querySelector("#github");
let scrollScheduled = false;
function updateNavigation() {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
  const readingLine = header.getBoundingClientRect().height + 90;
  let current = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= readingLine) current = section;
  }
  const onGitHubSection =
    githubSection.getBoundingClientRect().top <= readingLine;
  for (const link of sectionLinks) {
    if (!onGitHubSection && link.hash === `#${current.id}`)
      link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  }
  scrollScheduled = false;
}
window.addEventListener(
  "scroll",
  () => {
    if (scrollScheduled) return;
    scrollScheduled = true;
    window.requestAnimationFrame(updateNavigation);
  },
  { passive: true },
);
window.addEventListener("resize", updateNavigation);
updateNavigation();

// Reveal once. Hide content only after a working observer is available.
let revealObserver;
if ("IntersectionObserver" in window && !motionPreference.matches) {
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove("is-pending");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.08 },
  );
  document.querySelectorAll(".reveal").forEach((element) => {
    if (element.getBoundingClientRect().top >= window.innerHeight) {
      element.classList.add("is-pending");
      revealObserver.observe(element);
    }
  });
}

// A single short typing sequence inside the accessible terminal illustration.
const typedText = document.querySelector("[data-typewriter]");
const completeText = typedText.textContent;
let typingTimer;
if (!motionPreference.matches) {
  let position = 0;
  typedText.textContent = "";
  const typeNext = () => {
    position += 1;
    typedText.textContent = completeText.slice(0, position);
    if (position < completeText.length)
      typingTimer = window.setTimeout(typeNext, 65);
  };
  typingTimer = window.setTimeout(typeNext, 350);
}
motionPreference.addEventListener("change", (event) => {
  if (!event.matches) return;
  window.clearTimeout(typingTimer);
  typedText.textContent = completeText;
  revealObserver?.disconnect();
  document
    .querySelectorAll(".is-pending")
    .forEach((element) => element.classList.remove("is-pending"));
});

// Local filters; no API requests, invented repositories or account data.
const filters = [...document.querySelectorAll("[data-filter]")];
const labs = [...document.querySelectorAll(".lab-card")];
const count = document.querySelector("#lab-count");
document.querySelector(".lab-toolbar").hidden = false;
filters.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;
    filters.forEach((filter) =>
      filter.setAttribute("aria-pressed", String(filter === button)),
    );
    let visible = 0;
    labs.forEach((lab) => {
      lab.hidden = selected !== "all" && lab.dataset.status !== selected;
      lab.classList.remove("is-pending");
      revealObserver?.unobserve(lab);
      if (!lab.hidden) visible += 1;
    });
    const status = selected === "all" ? "" : ` · ${button.textContent.trim()}`;
    count.textContent = `${visible} ${visible === 1 ? "area" : "areas"}${status}`;
    updateNavigation();
  });
});
