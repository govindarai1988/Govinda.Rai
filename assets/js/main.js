/* Portfolio behaviour — nav, scroll progress, reveals, counters, spotlight.
   No dependencies, no external requests. */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------ nav -- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* --------------------------------------------------- active nav link ----- */
  var path = window.location.pathname.split("/").pop() || "index.html";
  Array.prototype.forEach.call(document.querySelectorAll(".nav a"), function (a) {
    var href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      a.setAttribute("aria-current", "page");
    }
  });

  /* ------------------------------------------------------ scroll progress -- */
  var bar = document.querySelector(".progress");
  if (bar) {
    var ticking = false;
    var draw = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(draw); }
    }, { passive: true });
    draw();
  }

  /* ----------------------------------------------------- number counters --- */
  function countUp(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    if (isNaN(target)) { return; }
    if (reduced) { el.textContent = target + suffix; return; }

    var dur = 1100;
    var start = null;
    function step(ts) {
      if (start === null) { start = ts; }
      var p = Math.min((ts - start) / dur, 1);
      // easeOutCubic
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + (p === 1 ? suffix : "");
      if (p < 1) { window.requestAnimationFrame(step); }
    }
    window.requestAnimationFrame(step);
  }

  /* ------------------------------------------------------ scroll reveal ---- */
  var targets = document.querySelectorAll(".reveal");

  if (reduced || !("IntersectionObserver" in window)) {
    Array.prototype.forEach.call(targets, function (el) { el.classList.add("in"); });
    Array.prototype.forEach.call(document.querySelectorAll("[data-count]"), countUp);
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        entry.target.classList.add("in");
        var n = entry.target.querySelector("[data-count]");
        if (n && !n.dataset.done) { n.dataset.done = "1"; countUp(n); }
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.1 });

    Array.prototype.forEach.call(targets, function (el) { io.observe(el); });

    // counters that are visible immediately (above the fold)
    Array.prototype.forEach.call(document.querySelectorAll(".reveal.in [data-count]"),
      function (n) { if (!n.dataset.done) { n.dataset.done = "1"; countUp(n); } });
  }

  /* -------------------------------------------------- pointer spotlight ---- */
  if (!reduced && window.matchMedia("(hover: hover)").matches) {
    Array.prototype.forEach.call(document.querySelectorAll(".spot"), function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - r.left) + "px");
        card.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
  }

  /* --------------------------------------------------------- footer year --- */
  var year = document.querySelector("[data-year]");
  if (year) { year.textContent = new Date().getFullYear(); }
})();
