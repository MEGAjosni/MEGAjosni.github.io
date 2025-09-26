document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-menu a");
    const headerOffset = 100; // adjust to your sticky menu height

    function setActiveLink() {
        let currentSection = "";
        sections.forEach((sec) => {
            const sectionTop = sec.offsetTop;
            const sectionHeight = sec.offsetHeight;

            if (window.scrollY >= sectionTop - sectionHeight / 3 - headerOffset) {
                currentSection = sec.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    }

    setActiveLink(); // Initial call

    window.addEventListener("scroll", setActiveLink);
});