function typewriterEffect(elementId, speed, pauseDuration) {
    const element = document.getElementById(elementId);
    const text = element.textContent.trim();
    element.innerHTML = "";

    let index = 0;

    function typeCharacter() {
        if (index < text.length) {
            // &nbsp; is Non-Breaking Space 
            let char = text[index] === " " ? "&nbsp;" : text[index];
            element.innerHTML += char;
            index++;

            // pasue at '...' 
            if (text.slice(index - 3, index) === "..." && index >= 3) {
                setTimeout(typeCharacter, pauseDuration); 
            } else {
                setTimeout(typeCharacter, speed);
            }
        }
    }

    typeCharacter();
}

function revealOnScrollEffect(selector) {
    const elementsToReveal = document.querySelectorAll(selector);

    const options = {
        root: null, 
        threshold: 0.1, // Trigger the reveal when 10% of the element is visible
    };

    // Function to handle the reveal
    const revealOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('reveal-from-top')) {
                    entry.target.classList.add('revealY');
                } else if (entry.target.classList.contains('reveal-from-left')) {
                    entry.target.classList.add('revealX');
                }
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(revealOnScroll, options);

    elementsToReveal.forEach(element => {
        observer.observe(element);
    });
}

window.addEventListener('load', () => {
    typewriterEffect('typewriter-caption', 50, 500); 
    revealOnScrollEffect('.projects-heading, .project-title, .project-description, .video');
});
