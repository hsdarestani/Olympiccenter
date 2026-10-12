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
})();