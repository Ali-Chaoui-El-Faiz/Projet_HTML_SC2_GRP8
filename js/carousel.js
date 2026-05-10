(function () {
    "use strict";
    const AUTO_PLAY= true;
    const AUTO_PLAY_DELAY= 4500;
    const slides    = document.querySelectorAll(".carousel-slide");
    const dotsWrap  = document.getElementById("carouselDots");
    const prevBtn   = document.getElementById("prevBtn");
    const nextBtn   = document.getElementById("nextBtn");
    if (!slides.length || !dotsWrap) return; 
    let current   = 0;
    let autoTimer = null;
    slides.forEach(function (_, i) {
        const dot = document.createElement("button");
        dot.className    = "carousel-dot" + (i === 0 ? " active" : "");
        dot.setAttribute("aria-label", "Aller à la slide " + (i + 1));
        dot.addEventListener("click", function () { goTo(i); });
        dotsWrap.appendChild(dot);

    });

    const dots = dotsWrap.querySelectorAll(".carousel-dot");
    function goTo(index) {
        if (index === current) return;
        slides[current].classList.remove("active");
        slides[current].classList.add("slide-out-left");
        dots[current].classList.remove("active");

        const outgoing = slides[current];
        setTimeout(function () {
            outgoing.classList.remove("slide-out-left");
        }, 520);
        current = (index + slides.length) % slides.length;
        slides[current].classList.add("active");
        dots[current].classList.add("active");
    }
    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    nextBtn.addEventListener("click", function () {
        next();
        resetAutoPlay();

    });
    prevBtn.addEventListener("click", function () {
        prev();
        resetAutoPlay();
    });
    function startAutoPlay() {
        if (!AUTO_PLAY) return;
        autoTimer = setInterval(next, AUTO_PLAY_DELAY);
    }
    function resetAutoPlay() {
        clearInterval(autoTimer);
        startAutoPlay();
    }
    startAutoPlay();
    document.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") { next(); resetAutoPlay(); }
        if (e.key === "ArrowLeft")  { prev(); resetAutoPlay(); }
    });
    let touchStartX = 0;

    document.getElementById("mainCarousel").addEventListener("touchstart", function (e) {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    document.getElementById("mainCarousel").addEventListener("touchend", function (e) {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {          // seuil de 50 px
            diff > 0 ? next() : prev();
            resetAutoPlay();
        }
    }, { passive: true });

})();
