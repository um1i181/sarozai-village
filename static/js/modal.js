/* ==============================================================================
   SAROZAI VILLAGE — UNIVERSAL MODAL & LIGHTBOX CONTROLLER
   Handles Explore Dialogs and Full-Size Image Viewer across all pages
   ============================================================================== */

document.addEventListener("DOMContentLoaded", function () {
    // -------------------------------------------------------------------------
    // 1. UNIVERSAL EXPLORE MODAL
    // -------------------------------------------------------------------------
    const exploreModal = document.getElementById("uniExploreModal");
    const exploreOverlay = document.getElementById("uniExploreOverlay");
    const closeExploreBtn = document.getElementById("uniCloseExplore");
    const exploreCategory = document.getElementById("uniExploreCategory");
    const exploreTitle = document.getElementById("uniExploreTitle");
    const exploreSubtitle = document.getElementById("uniExploreSubtitle");
    const exploreText = document.getElementById("uniExploreText");
    const exploreReadFull = document.getElementById("uniExploreReadFull");
    const exploreHero = document.getElementById("uniExploreHero");
    const exploreImage = document.getElementById("uniExploreImage");

    const exploreTriggers = document.querySelectorAll(
        ".btn-card-explore, .quick-explore-btn, .history-btn--explore, .education-btn--explore"
    );

    function openExploreModal(data) {
        if (!exploreModal) return;

        if (exploreCategory) exploreCategory.textContent = data.category || "Sarozai Village";
        if (exploreTitle) exploreTitle.textContent = data.title || "Topic Overview";
        
        if (exploreSubtitle) {
            if (data.subtitle) {
                exploreSubtitle.textContent = data.subtitle;
                exploreSubtitle.style.display = "block";
            } else {
                exploreSubtitle.style.display = "none";
            }
        }

        if (exploreText) {
            exploreText.innerHTML = `<p>${data.summary || data.description || "Detailed information will be added soon."}</p>`;
        }

        // Populate hero image when available
        if (exploreHero && exploreImage) {
            if (data.image) {
                exploreImage.src = data.image;
                exploreImage.alt = data.title || "";
                exploreHero.hidden = false;
            } else {
                exploreHero.hidden = true;
                exploreImage.src = "";
            }
        }

        if (exploreReadFull) {
            if (data.slug) {
                exploreReadFull.href = `/sarozai-village/article/${data.slug}`;
                exploreReadFull.style.display = "inline-flex";
            } else {
                exploreReadFull.style.display = "none";
            }
        }

        exploreModal.classList.add("active");
        exploreModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeExploreModal() {
        if (!exploreModal) return;
        exploreModal.classList.remove("active");
        exploreModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    exploreTriggers.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const data = {
                title: btn.dataset.title || btn.getAttribute("data-title") || "",
                subtitle: btn.dataset.subtitle || btn.getAttribute("data-subtitle") || "",
                category: btn.dataset.category || btn.getAttribute("data-category") || "Sarozai",
                summary: btn.dataset.summary || btn.getAttribute("data-summary") || btn.dataset.description || "",
                slug: btn.dataset.slug || btn.getAttribute("data-slug") || "",
                image: btn.dataset.image || btn.getAttribute("data-image") || ""
            };
            openExploreModal(data);
        });
    });

    if (closeExploreBtn) closeExploreBtn.addEventListener("click", closeExploreModal);
    if (exploreOverlay) exploreOverlay.addEventListener("click", closeExploreModal);

    // -------------------------------------------------------------------------
    // 2. UNIVERSAL FULL-SIZE LIGHTBOX IMAGE VIEWER
    // -------------------------------------------------------------------------
    const imageModal = document.getElementById("uniImageModal");
    const imageOverlay = document.getElementById("uniImageOverlay");
    const closeImageBtn = document.getElementById("uniCloseImage");
    const fullImage = document.getElementById("uniFullImage");
    const imageCaption = document.getElementById("uniImageCaption");

    const imageTriggers = document.querySelectorAll("[data-lightbox-image]");

    function openImageModal(imgSrc, captionText) {
        if (!imageModal || !fullImage) return;

        fullImage.src = imgSrc;
        if (imageCaption) imageCaption.textContent = captionText || "";

        imageModal.classList.add("active");
        imageModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeImageModal() {
        if (!imageModal) return;
        imageModal.classList.remove("active");
        imageModal.setAttribute("aria-hidden", "true");
        if (fullImage) fullImage.src = "";
        document.body.style.overflow = "";
    }

    imageTriggers.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const src = btn.dataset.image || btn.getAttribute("data-image") || btn.currentSrc || btn.src || "";
            const caption = btn.dataset.caption || btn.getAttribute("data-caption") || btn.dataset.alt || "";
            if (src) {
                openImageModal(src, caption);
            }
        });

        if (btn.matches("[data-lightbox-image]")) {
            btn.addEventListener("keydown", function (e) {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    btn.click();
                }
            });
        }
    });

    if (closeImageBtn) closeImageBtn.addEventListener("click", closeImageModal);
    if (imageOverlay) imageOverlay.addEventListener("click", closeImageModal);

    // -------------------------------------------------------------------------
    // 3. KEYBOARD SHORTCUTS (ESC TO CLOSE ANY MODAL)
    // -------------------------------------------------------------------------
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" || e.keyCode === 27) {
            closeExploreModal();
            closeImageModal();
        }
    });
});
