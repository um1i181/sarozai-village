/* ==============================================================================
   SAROZAI VILLAGE — GALLERY CONTROLLER
   Category Filtering & Lightbox Integration
   ============================================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const filterTabs = document.querySelectorAll("#galleryFilterTabs .filter-tab");
    const galleryCards = document.querySelectorAll("#galleryGrid .gallery-card");

    // 1. Category Filtering
    filterTabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            // Remove active from all tabs
            filterTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const filterValue = tab.getAttribute("data-filter");

            galleryCards.forEach(function (card) {
                const cardCat = card.getAttribute("data-category");
                if (filterValue === "all" || cardCat === filterValue) {
                    card.style.display = "block";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";
                    }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.95)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 200);
                }
            });
        });
    });

});