/* ==============================================================================
   SAROZAI VILLAGE — GLOBAL INTERACTIVE SCRIPT
   Theme Management, Mobile Navigation, Flash Dismissal, and UI Polish
   ============================================================================== */

document.addEventListener("DOMContentLoaded", function () {
    // -------------------------------------------------------------------------
    // 1. DARK / LIGHT THEME TOGGLE WITH LOCALSTORAGE PERSISTENCE
    // -------------------------------------------------------------------------
    const themeToggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("sarozai_theme");

    function applyTheme(theme) {
        if (theme === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
            document.body.classList.add("dark-mode");
            if (themeToggle) themeToggle.textContent = "☀️";
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            document.body.classList.remove("dark-mode");
            if (themeToggle) themeToggle.textContent = "🌙";
        }
    }

    // Default to dark or saved preference
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme("light");
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            const currentTheme = document.body.classList.contains("dark-mode") ? "dark" : "light";
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            applyTheme(newTheme);
            localStorage.setItem("sarozai_theme", newTheme);
        });
    }

    // -------------------------------------------------------------------------
    // 2. MOBILE NAVIGATION DRAWER
    // -------------------------------------------------------------------------
    const menuToggle = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");
    const mobileNavClose = document.getElementById("mobileNavClose");

    // Create backdrop element
    let navBackdrop = document.querySelector(".mobile-nav-backdrop");
    if (!navBackdrop) {
        navBackdrop = document.createElement("div");
        navBackdrop.className = "mobile-nav-backdrop";
        document.body.appendChild(navBackdrop);
    }

    function openMobileMenu() {
        if (!mobileNav) return;
        mobileNav.classList.add("active");
        navBackdrop.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeMobileMenu() {
        if (!mobileNav) return;
        mobileNav.classList.remove("active");
        navBackdrop.classList.remove("active");
        document.body.style.overflow = "";
    }

    if (menuToggle) menuToggle.addEventListener("click", openMobileMenu);
    if (mobileNavClose) mobileNavClose.addEventListener("click", closeMobileMenu);
    if (navBackdrop) navBackdrop.addEventListener("click", closeMobileMenu);

    // Close mobile menu on clicking any navigation link
    if (mobileNav) {
        mobileNav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeMobileMenu);
        });
    }

    // -------------------------------------------------------------------------
    // 2b. NAV DROPDOWNS (CSS hover on desktop, click/tap and keyboard elsewhere)
    // -------------------------------------------------------------------------
    const navDropdowns = document.querySelectorAll(".nav-dropdown");

    function closeAllNavDropdowns(except) {
        navDropdowns.forEach(function (dropdown) {
            if (dropdown === except) return;
            dropdown.classList.remove("open");
            const toggle = dropdown.querySelector(".nav-dropdown-toggle");
            if (toggle) toggle.setAttribute("aria-expanded", "false");
        });
    }

    navDropdowns.forEach(function (dropdown) {
        const toggle = dropdown.querySelector(".nav-dropdown-toggle");
        if (!toggle) return;

        toggle.addEventListener("click", function (event) {
            event.stopPropagation();
            const isOpen = dropdown.classList.contains("open");
            closeAllNavDropdowns();
            dropdown.classList.toggle("open", !isOpen);
            toggle.setAttribute("aria-expanded", String(!isOpen));
        });

        dropdown.addEventListener("keydown", function (event) {
            if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                closeAllNavDropdowns(dropdown);
                dropdown.classList.add("open");
                toggle.setAttribute("aria-expanded", "true");
                const firstLink = dropdown.querySelector(".nav-dropdown-menu a");
                if (firstLink) firstLink.focus();
            }
        });
    });

    document.addEventListener("click", function () {
        closeAllNavDropdowns();
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") closeAllNavDropdowns();
    });

    // Reveal content once as it enters the viewport, with varied directions.
    const revealTargets = document.querySelectorAll(
        ".page-hero-container, .section-header-row, .hub-card, .article-card, .game-card, .feature-tile, .archive-card, .site-footer > *"
    );
    revealTargets.forEach(function (element, index) {
        const directions = ["reveal-up", "reveal-left", "reveal-right", "reveal-down"];
        element.classList.add(directions[index % directions.length]);
        const card = element.matches(".hub-card, .article-card, .game-card") ? element : null;
        if (card) {
            const image = card.querySelector(".hub-card-image, .article-card-image-wrap, .game-image");
            const content = card.querySelector(".hub-card-content, .article-card-body, .game-content");
            const reverse = index % 2 === 1;
            if (image) image.classList.add("public-card-image", reverse ? "public-card-from-right" : "public-card-from-left");
            if (content) content.classList.add("public-card-text", reverse ? "public-card-from-left" : "public-card-from-right");
            card.style.setProperty("--card-delay", (index % 4) * 80 + "ms");
        }
    });
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12 });
        revealTargets.forEach(function (element) { revealObserver.observe(element); });
    } else {
        revealTargets.forEach(function (element) { element.classList.add("is-visible"); });
    }

    // -------------------------------------------------------------------------
    // 3. AUTO-DISMISS FLASH ALERTS AFTER 6 SECONDS
    // -------------------------------------------------------------------------
    const alerts = document.querySelectorAll(".alert");
    if (alerts.length > 0) {
        setTimeout(function () {
            alerts.forEach(function (alert) {
                alert.style.transition = "opacity 0.5s ease, transform 0.5s ease";
                alert.style.opacity = "0";
                alert.style.transform = "translateY(-10px)";
                setTimeout(() => alert.remove(), 500);
            });
        }, 6000);
    }

    // -------------------------------------------------------------------------
    // 4. NAVBAR SCROLL EFFECT
    // -------------------------------------------------------------------------
    const mainNavbar = document.getElementById("mainNavbar");
    window.addEventListener("scroll", function () {
        if (!mainNavbar) return;
        if (window.scrollY > 30) {
            mainNavbar.classList.add("scrolled");
        } else {
            mainNavbar.classList.remove("scrolled");
        }
    }, { passive: true });

});