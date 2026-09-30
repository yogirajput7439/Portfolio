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


    /* =========================================
       CANVAS RESIZE
    ========================================= */

    function resizeCanvas() {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        createParticles();
    }

    window.addEventListener("resize", resizeCanvas);


    /* =========================================
       MOUSE TRACKING
    ========================================= */

    window.addEventListener("mousemove", function(event) {

        mouse.x = event.clientX;
        mouse.y = event.clientY;

    });


    window.addEventListener("mouseleave", function() {

        mouse.x = null;
        mouse.y = null;

    });


    /* =========================================
       PARTICLE CLASS
    ========================================= */

    class Particle {

        constructor() {

            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;

            this.size = Math.random() * 1.5 + 0.5;

            this.speedX =
                (Math.random() - 0.5) * 0.35;

            this.speedY =
                (Math.random() - 0.5) * 0.35;
        }


        update() {

            this.x += this.speedX;
            this.y += this.speedY;


            /* Bounce from edges */

            if (
                this.x < 0 ||
                this.x > canvas.width
            ) {
                this.speedX *= -1;
            }


            if (
                this.y < 0 ||
                this.y > canvas.height
            ) {
                this.speedY *= -1;
            }

        }


        draw() {

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                "rgba(80, 170, 255, 0.75)";

            ctx.fill();

        }

    }


    /* =========================================
       CREATE PARTICLES
    ========================================= */

    function createParticles() {

        particles = [];

        const number =
            Math.floor(
                (canvas.width * canvas.height) / 8000
            );


        for (let i = 0; i < number; i++) {

            particles.push(
                new Particle()
            );

        }

    }


    /* =========================================
       CONNECT PARTICLES TO MOUSE
    ========================================= */

    function connectParticlesToMouse() {

        if (
            mouse.x === null ||
            mouse.y === null
        ) {
            return;
        }


        for (let particle of particles) {

            const dx =
                particle.x - mouse.x;

            const dy =
                particle.y - mouse.y;


            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (distance < mouse.radius) {

                const opacity =
                    1 - distance / mouse.radius;


                ctx.beginPath();

                ctx.moveTo(
                    particle.x,
                    particle.y
                );

                ctx.lineTo(
                    mouse.x,
                    mouse.y
                );


                ctx.strokeStyle =
                    `rgba(50, 150, 255, ${opacity * 0.65})`;

                ctx.lineWidth = 2;


                ctx.stroke();

            }

        }

    }


    /* =========================================
       MOUSE CIRCLE
    ========================================= */
    function drawMouseCircle() {

        if (
            mouse.x === null ||
            mouse.y === null
        ) {
            return;
        }

        ctx.beginPath();

        ctx.arc(
            mouse.x,
            mouse.y,
            12,
            0,
            Math.PI * 2
        );

        ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
        ctx.lineWidth = 1;

        ctx.stroke();
    }


    /* =========================================
       ANIMATION
    ========================================= */

    function animate() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        for (let particle of particles) {

            particle.update();
            particle.draw();

        }


        connectParticlesToMouse();

        drawMouseCircle();

        requestAnimationFrame(animate);

    }


    /* =========================================
       START BACKGROUND
    ========================================= */

    resizeCanvas();

    animate();

}


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");

const navLinks =
    document.querySelectorAll(".nav-link");


if (menuToggle && navMenu) {

    menuToggle.addEventListener(
        "click",
        function() {

            menuToggle.classList.toggle("active");

            navMenu.classList.toggle("open");

            document.body.classList.toggle(
                "menu-open"
            );

        }
    );

}


navLinks.forEach(function(link) {

    link.addEventListener(
        "click",
        function() {

            if (menuToggle) {
                menuToggle.classList.remove("active");
            }

            if (navMenu) {
                navMenu.classList.remove("open");
            }

            document.body.classList.remove(
                "menu-open"
            );

        }
    );

});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll("section[id]");


window.addEventListener(
    "scroll",
    function() {

        let currentSection = "";


        sections.forEach(function(section) {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(function(link) {

            link.classList.remove("active");


            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }
);


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".section, " +
        ".project-card, " +
        ".skill-card, " +
        ".highlight-card, " +
        ".focus-box, " +
        ".education-card, " +
        ".contact-box"
    );


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            function(entries, observer) {

                entries.forEach(function(entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "show"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        function(element) {

            revealObserver.observe(element);

        }
    );

}
else {

    /* Fallback for older browsers */

    revealElements.forEach(
        function(element) {

            element.classList.add("show");

        }
    );

}


/* =========================================
   CURRENT YEAR
========================================= */

const currentYear =
    document.getElementById("currentYear");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}
