/* =========================================
   ANIMATED PARTICLE BACKGROUND
========================================= */

const canvas = document.getElementById("background");

if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];

    const mouse = {
        x: null,
        y: null,
        radius: 160
    };

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createParticles();
    }

    window.addEventListener("resize", resizeCanvas);

    window.addEventListener("mousemove", (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });

    window.addEventListener("mouseleave", () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.35;
            this.speedY = (Math.random() - 0.5) * 0.35;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) {
                this.speedX *= -1;
            }

            if (this.y < 0 || this.y > canvas.height) {
                this.speedY *= -1;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(80, 170, 255, 0.75)";
            ctx.fill();
        }
    }

    function createParticles() {
        particles = [];

        const number = Math.floor(
            (canvas.width * canvas.height) / 8000
        );

        for (let i = 0; i < number; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticlesToMouse() {
        if (mouse.x === null || mouse.y === null) {
            return;
        }

        for (const particle of particles) {
            const dx = particle.x - mouse.x;
            const dy = particle.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                const opacity = 1 - distance / mouse.radius;

                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = `rgba(50, 150, 255, ${opacity * 0.65})`;
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }
    }

    function drawMouseCircle() {
        if (mouse.x === null || mouse.y === null) {
            return;
        }

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 12, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const particle of particles) {
            particle.update();
            particle.draw();
        }

        connectParticlesToMouse();
        drawMouseCircle();
        requestAnimationFrame(animate);
    }

    resizeCanvas();
    animate();
}

/* =========================================
   NAVIGATION ELEMENTS
========================================= */

const navbar = document.querySelector(".navbar");
const navMenu = document.getElementById("navMenu");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

if (navbar) {
    const updateNavbar = () => {
        navbar.classList.toggle("scrolled", window.scrollY > 40);
    };

    window.addEventListener("scroll", updateNavbar, { passive: true });
    updateNavbar();
}

/* =========================================
   MOBILE MENU
========================================= */

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("active");
        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("menu-open", isOpen);
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            document.body.classList.remove("menu-open");
        });
    });
}

/* =========================================
   ACTIVE SECTION DETECTION
========================================= */

function updateActiveSection() {
    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${currentSection}`
        );
    });
}

window.addEventListener("scroll", updateActiveSection, { passive: true });
window.addEventListener("load", updateActiveSection);

/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
    ".section, .project-card, .skill-card, .highlight-card, .focus-box, .education-card, .contact-box"
);

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("show");
    });
}

/* =========================================
   CURRENT YEAR
========================================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

/* =========================================
   PORTFOLIO V3 — INTERACTIVE DETAILS
========================================= */

(() => {
    /* Small 3D tilt on desktop cards — disabled on touch devices */
    const interactiveCards = document.querySelectorAll(
        ".skill-card, .project-card, .learning-card, .experience-card, .highlight-card"
    );

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (finePointer) {
        interactiveCards.forEach((card) => {
            card.addEventListener("mousemove", (event) => {
                const rect = card.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                const rotateY = ((x / rect.width) - 0.5) * 3;
                const rotateX = ((y / rect.height) - 0.5) * -3;

                card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "";
            });
        });
    }

    /* Animated number counters for numeric quick stats */
    const statValues = document.querySelectorAll(".stat-item strong");

    if ("IntersectionObserver" in window && statValues.length) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const element = entry.target;
                const original = element.textContent.trim();
                const match = original.match(/^(\d+(?:\.\d+)?)(.*)$/);

                if (!match) {
                    observer.unobserve(element);
                    return;
                }

                const target = Number(match[1]);
                const suffix = match[2];
                const duration = 900;
                const start = performance.now();

                const animateCounter = (now) => {
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const value = target < 10
                        ? (target * eased).toFixed(1)
                        : Math.round(target * eased);

                    element.textContent = `${value}${suffix}`;

                    if (progress < 1) {
                        requestAnimationFrame(animateCounter);
                    } else {
                        element.textContent = original;
                    }
                };

                requestAnimationFrame(animateCounter);
                observer.unobserve(element);
            });
        }, { threshold: 0.6 });

        statValues.forEach((stat) => counterObserver.observe(stat));
    }

    /* Scroll progress indicator without adding another visible component */
    const updateScrollProgress = () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
        document.documentElement.style.setProperty("--scroll-progress", `${progress * 100}%`);
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    updateScrollProgress();

    /* Smoothly close the mobile menu when Escape is pressed */
    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;

        const menu = document.getElementById("navMenu");
        const toggle = document.getElementById("menuToggle");

        menu?.classList.remove("active");
        menu?.classList.remove("open");
        toggle?.classList.remove("active");
        toggle?.classList.remove("open");
        document.body.classList.remove("menu-open");
    });
})();
