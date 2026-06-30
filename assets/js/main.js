/* =========================================================================
   main.js — JavaScript vanilla mínimo
   - Menu mobile acessível (aria-expanded, Esc, foco)
   - Estado "scrolled" do cabeçalho
   - Ano dinâmico no rodapé
   O scroll suave é feito por CSS (scroll-behavior), respeitando
   prefers-reduced-motion. JS aqui é apenas progressivo: o site funciona sem ele.
   ========================================================================= */
(function () {
  "use strict";

  /* ---- Menu mobile ---- */
  var nav = document.querySelector("[data-nav]");
  var toggle = document.querySelector("[data-nav-toggle]");

  function fecharMenu() {
    if (!nav || !toggle) return;
    nav.setAttribute("data-aberto", "false");
    toggle.setAttribute("aria-expanded", "false");
  }
  function abrirMenu() {
    if (!nav || !toggle) return;
    nav.setAttribute("data-aberto", "true");
    toggle.setAttribute("aria-expanded", "true");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var aberto = toggle.getAttribute("aria-expanded") === "true";
      if (aberto) { fecharMenu(); } else { abrirMenu(); }
    });

    // Fechar ao clicar em um link do menu
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", fecharMenu);
    });

    // Fechar com Esc e devolver o foco ao botão
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        fecharMenu();
        toggle.focus();
      }
    });

    // Garantir estado correto ao redimensionar para desktop
    var mq = window.matchMedia("(min-width: 761px)");
    mq.addEventListener("change", function (ev) { if (ev.matches) fecharMenu(); });
  }

  /* ---- Estado "scrolled" do cabeçalho ---- */
  var cabecalho = document.querySelector("[data-cabecalho]");
  if (cabecalho) {
    var aoRolar = function () {
      cabecalho.classList.toggle("scrolled", window.scrollY > 12);
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
  }

  /* ---- Ano dinâmico ---- */
  var anoEl = document.querySelector("[data-ano]");
  if (anoEl) { anoEl.textContent = String(new Date().getFullYear()); }
})();
