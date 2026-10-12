(() => {
  "use strict";
  const menuButton = document.querySelector(".mobile-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  function setMenu(open) {
    if (!menuButton || !mobileNav) return;
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
    mobileNav.hidden = !open;
    document.body.classList.toggle("menu-open", open);
  }
  menuButton?.addEventListener("click", () => {
    setMenu(menuButton.getAttribute("aria-expanded") !== "true");
  });
  mobileNav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => setMenu(false));
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") setMenu(false);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) setMenu(false);
  });

  // An inquiry is prepared locally, never sent to an unconfigured endpoint.
  const form = document.getElementById("request-form");
  const result = document.getElementById("form-result");
  const message = document.getElementById("message");
  const copy = document.getElementById("copy");
  const feedback = document.getElementById("copy-feedback");

  form?.addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("name")?.value.trim() || "";
    const sport = document.getElementById("sport")?.value || "Taekwondo";
    const age = document.getElementById("age")?.value || "Mich selbst (Erwachsene)";
    const salutation = name ? "Mein Name ist " + name + ". " : "";
    message.value = "Hallo Olympic Center Ebnoutalib! " + salutation +
      "Ich interessiere mich für ein Probetraining.\n" +
      "Sport: " + sport + "\n" +
      "Training für: " + age + "\n" +
      "Könnt ihr mir die aktuellen Trainingszeiten und die passende Gruppe mitteilen? Vielen Dank!";
    result.hidden = false;
    feedback.textContent = "";
    result.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
  });

  copy?.addEventListener("click", async () => {
    if (!message?.value) return;
    try {
      await navigator.clipboard.writeText(message.value);
      feedback.textContent = "✓ Nachricht kopiert. Jetzt Instagram öffnen und einfügen.";
    } catch {
      message.focus();
      message.select();
      feedback.textContent = "Bitte markierten Text manuell kopieren und auf Instagram senden.";
    }
  });

  // Sport-inspired scroll reveals, with graceful fallback for unsupported browsers.
  const motionAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealSelectors = [
    ".section-head", ".program-card", ".audiences > div",
    ".manifesto-picture", ".manifesto-text", ".medal-card", ".coach-bios article",
    ".schedule-grid > div", ".social-photo", ".insta-tile",
    ".faq-grid > div", ".faqs", ".contact-grid > div", ".contact-grid > form"
  ];
  if (motionAllowed && "IntersectionObserver" in window) {
    document.documentElement.classList.add("js-motion");
    const elements = document.querySelectorAll(revealSelectors.join(","));
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        instance.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px 40px 0px" });
    elements.forEach((element, index) => {
      element.classList.add("reveal");
      if (element.matches(".manifesto-picture")) element.classList.add("reveal-left");
      if (element.matches(".manifesto-text")) element.classList.add("reveal-right");
      if (element.matches(".program-card, .coach-bios article, .social-photo")) {
        element.style.setProperty("--reveal-delay", (index % 2) * 110 + "ms");
      }
      observer.observe(element);
    });
    requestAnimationFrame(() => {
      document.querySelector(".hero-visual")?.classList.add("is-visible");
    });
  }

  // Thin blue navigation progress line; passive scroll and rAF coalescing.
  let scrollFrame = 0;
  function updateScrollProgress() {
    scrollFrame = 0;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    document.documentElement.style.setProperty("--scroll", String(maxScroll > 0 ? Math.max(0, Math.min(1, window.scrollY / maxScroll)) : 0));
  }
  window.addEventListener("scroll", () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollProgress);
  }, { passive: true });
  updateScrollProgress();

  // Keep active navigation links synchronized with visible content.
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const navLinks = document.querySelectorAll(".links a[href^='#']");
  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          const isActive = link.getAttribute("href") === "#" + entry.target.id;
          if (isActive) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-20% 0px -55% 0px", threshold: 0 });
    sections.forEach(section => sectionObserver.observe(section));
  }

})();