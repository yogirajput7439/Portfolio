/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");


menuToggle.addEventListener("click", () => {

    menuToggle.classList.toggle("active");

    navMenu.classList.toggle("open");

    document.body.classList.toggle("menu-open");

});


/* Close mobile menu after clicking a link */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        menuToggle.classList.remove("active");

        navMenu.classList.remove("open");

        document.body.classList.remove("menu-open");

    });

});


/* =========================================
   ACTIVE NAVIGATION LINK
========================================= */

const sections = document.querySelectorAll("section[id]");


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
    ".section, .project-card, .skill-card, .highlight-card, .focus-box, .education-card, .contact-box"
);


const revealObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================
   CURRENT YEAR
========================================= */

const currentYear = document.getElementById("currentYear");

currentYear.textContent = new Date().getFullYear();
