// Typewriter Effect
function typewriterEffect(elementId, speed = 50, pauseDuration = 500) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const text = element.textContent.trim();
    element.textContent = ""; // Use textContent to avoid HTML injection
    let index = 0;

    const typeCharacter = () => {
        if (index < text.length) {
            const char = text[index] === " " ? "\u00A0" : text[index]; // Non-breaking space
            element.innerHTML += char;
            index++;

            const isPause = text.slice(index - 3, index) === "...";
            setTimeout(typeCharacter, isPause ? pauseDuration : speed);
        }
    };

    typeCharacter();
}

// Reveal on Scroll
function revealOnScrollEffect(selector) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            if (el.classList.contains('reveal-from-top')) {
                el.classList.add('revealY');
            } else if (el.classList.contains('reveal-from-left')) {
                el.classList.add('revealX');
            }

            observer.unobserve(el);
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(el => observer.observe(el));
}

function startSlideshow(selector = ".slide", interval = 3000) {
    const slides = document.querySelectorAll(selector);
    if (!slides.length) return;

    let currentIndex = 0;
    slides[currentIndex].classList.add("active");

    setInterval(() => {
        slides[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add("active");
    }, interval);
}



// Init
window.addEventListener('load', () => {
    typewriterEffect('typewriter-caption', 50, 500);
    revealOnScrollEffect('.projects-heading, .project-title, .project-description, .video');
    startSlideshow(".slide", 4000);
});


document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.portrait-video-dropdown .dropdown-toggle');
    const content = document.querySelector('.portrait-video-dropdown .video-dropdown-content');

    if (toggle && content) {
        toggle.addEventListener('click', () => {
            const isExpanded = toggle.classList.toggle('active');

            // Toggle max-height for slide-down effect
            content.style.maxHeight = isExpanded ? content.scrollHeight + "px" : "0";

            if (isExpanded) {
                // Wait a bit for the animation, then scroll into view
                setTimeout(() => {
                    content.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'  // <-- this centers it vertically
                    });
                }, 300); // delay to match CSS transition
            }
        });
    }
});
