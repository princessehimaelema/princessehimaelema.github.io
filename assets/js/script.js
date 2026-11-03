/* =========================================================
   Portfolio behaviour — vanilla JavaScript, no dependencies
   ========================================================= */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.remove("no-js");

  /* ---------- 1. Apply settings from data.js ---------- */
  var data = window.portfolioData || (typeof portfolioData !== "undefined" ? portfolioData : null);
  // Pages inside /projects need "../" in front of local paths
  var base = document.body.getAttribute("data-base") || "";

  function lookup(key) {
    if (!data) return null;
    return key.split(".").reduce(function (o, k) { return o && o[k]; }, data);
  }

  if (data) {
    document.querySelectorAll("[data-href]").forEach(function (el) {
      var key = el.getAttribute("data-href");
      var val = lookup(key);
      if (!val) return;
      if (key === "email") val = "mailto:" + val;
      else if (key === "resume") val = base + val;
      el.setAttribute("href", val);
    });
    document.querySelectorAll("[data-text]").forEach(function (el) {
      var val = lookup(el.getAttribute("data-text"));
      if (val) el.textContent = val;
    });
    var form = document.getElementById("contact-form");
    if (form && data.formspreeEndpoint) form.setAttribute("action", data.formspreeEndpoint);
  }

  /* ---------- 2. Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- 3. Theme (light / dark) ---------- */
  var toggle = document.querySelectorAll(".theme-toggle");
  function setTheme(t) {
    root.setAttribute("data-theme", t);
    try { localStorage.setItem("theme-v2", t); } catch (e) {}
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", t === "dark" ? "#0e1626" : "#faf8f5");
    toggle.forEach(function (b) {
      b.setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode");
    });
  }
  setTheme(root.getAttribute("data-theme") || "dark");
  toggle.forEach(function (b) {
    b.addEventListener("click", function () {
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  });

  /* ---------- 4. Navigation ---------- */
  var nav = document.querySelector(".nav");
  var menuBtn = document.querySelector(".menu-toggle");
  var links = document.querySelector(".nav-links");

  function onScroll() { if (nav) nav.classList.toggle("scrolled", window.scrollY > 8); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function closeMenu() {
    if (!links) return;
    links.classList.remove("open");
    document.body.classList.remove("menu-open");
    if (menuBtn) { menuBtn.setAttribute("aria-expanded", "false"); menuBtn.setAttribute("aria-label", "Open menu"); }
  }
  if (menuBtn && links) {
    menuBtn.addEventListener("click", function () {
      var open = !links.classList.contains("open");
      links.classList.toggle("open", open);
      document.body.classList.toggle("menu-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    links.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
    window.addEventListener("resize", function () { if (window.innerWidth > 960) closeMenu(); });
  }

  // Highlight the current section in the menu
  var sectionLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if ("IntersectionObserver" in window && sectionLinks.length) {
    var map = {};
    sectionLinks.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          sectionLinks.forEach(function (a) { a.classList.remove("active"); a.removeAttribute("aria-current"); });
          map[en.target.id].classList.add("active");
          map[en.target.id].setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ---------- 5. Reveal on scroll ---------- */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 6. Contact form (Formspree) ---------- */
  var cform = document.getElementById("contact-form");
  if (cform) {
    var status = document.getElementById("form-status");
    var submit = cform.querySelector('button[type="submit"]');
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function validateField(input) {
      var field = input.closest(".field");
      var v = input.value.trim();
      var ok = true;
      if (input.required && !v) ok = false;
      if (ok && input.type === "email" && !emailRe.test(v)) ok = false;
      if (ok && input.name === "message" && v.length < 10) ok = false;
      field.classList.toggle("invalid", !ok);
      input.setAttribute("aria-invalid", String(!ok));
      return ok;
    }

    cform.querySelectorAll("input[required], textarea[required]").forEach(function (inp) {
      inp.addEventListener("blur", function () { validateField(inp); });
      inp.addEventListener("input", function () {
        if (inp.closest(".field").classList.contains("invalid")) validateField(inp);
      });
    });

    function showStatus(type, msg) {
      status.className = "form-status show " + type;
      status.textContent = msg;
    }

    cform.addEventListener("submit", function (e) {
      e.preventDefault();
      var fields = cform.querySelectorAll("input[required], textarea[required]");
      var allOk = true, firstBad = null;
      fields.forEach(function (f) { if (!validateField(f)) { allOk = false; firstBad = firstBad || f; } });
      if (!allOk) {
        showStatus("error", "Please check the highlighted fields.");
        firstBad.focus();
        return;
      }
      if (cform.querySelector('[name="_gotcha"]').value) return; // spam bot

      submit.classList.add("loading");
      submit.querySelector(".label").textContent = "Sending…";
      status.className = "form-status";

      fetch(cform.action, {
        method: "POST",
        body: new FormData(cform),
        headers: { Accept: "application/json" }
      }).then(function (res) {
        if (res.ok) {
          cform.reset();
          showStatus("success", "Thank you, your message has been sent. I’ll get back to you soon.");
        } else {
          return res.json().then(function (d) {
            var m = d && d.errors ? d.errors.map(function (x) { return x.message; }).join(", ") : "";
            showStatus("error", "Sorry, something went wrong" + (m ? ": " + m : "") + ". Please try again or email me directly.");
          });
        }
      }).catch(function () {
        showStatus("error", "Sorry, the message could not be sent. Please check your connection or email me directly.");
      }).finally(function () {
        submit.classList.remove("loading");
        submit.querySelector(".label").textContent = "Send message";
      });
    });
  }
})();
