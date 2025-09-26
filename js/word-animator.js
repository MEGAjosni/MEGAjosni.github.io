document.addEventListener("DOMContentLoaded", () => {
    const roles = ["Software Developer", "Machine Learning Engineer", "Mathematician", "Data Scientist", "Master of Science"];
    const roleElement = document.getElementById("role");
    let roleIndex = 0;
    let charIndex = 0;
    let typingInterval;

    function typeRole() {
        roleElement.style.opacity = 0;
        setTimeout(() => {
            roleElement.textContent = "";
            charIndex = 0;

            typingInterval = setInterval(() => {
                if (charIndex < roles[roleIndex].length) {
                    roleElement.textContent += roles[roleIndex].charAt(charIndex);
                    charIndex++;
                } else {
                    clearInterval(typingInterval);
                    setTimeout(() => {
                        roleIndex = (roleIndex + 1) % roles.length;
                        typeRole();
                    }, 1000); // Pause before starting the next word
                }
            }, 150); // Typing speed

            roleElement.style.opacity = 1;
        }, 500); // Fade out duration
    }
    // Start typing the first role
    typeRole();
});