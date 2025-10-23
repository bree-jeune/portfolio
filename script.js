// This function runs when the entire page content has been loaded
document.addEventListener('DOMContentLoaded', () => {

    // Get the button element for toggling the theme
    const themeToggle = document.getElementById('theme-toggle');

    // Get the body element to apply the dark-theme class
    const body = document.body;

    // --- Check for Saved Theme Preference in localStorage ---
    // localStorage allows us to save data that persists even after closing the browser window.
    // We check if a theme was previously saved.
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        // If a theme preference is found, apply it.
        body.classList.add(savedTheme);
    }

    // --- Event Listener for the Theme Toggle Button ---
    // We listen for a 'click' event on our button.
    themeToggle.addEventListener('click', () => {
        // The classList.toggle() method adds the class if it's not present,
        // and removes it if it is. It's a perfect one-liner for this job.
        body.classList.toggle('dark-theme');

        // --- Save the Current Theme Preference ---
        // After toggling, we check if the 'dark-theme' class is now present on the body.
        if (body.classList.contains('dark-theme')) {
            // If it is, we save 'dark-theme' to localStorage.
            localStorage.setItem('theme', 'dark-theme');
        } else {
            // Otherwise, we remove the theme key from localStorage,
            // which effectively sets it back to the default (light) theme.
            localStorage.removeItem('theme');
        }
    });
});

// --- Glowing Card Effect Logic ---
// This function also runs after the page content is loaded.
document.addEventListener('DOMContentLoaded', () => {

    // Select all the elements we want to apply the effect to.
    const glowingCards = document.querySelectorAll('.work-card');

    // Add a mousemove event listener to the entire document.
    document.body.addEventListener('mousemove', (e) => {
        // Loop through each of the selected cards.
        for (const card of glowingCards) {
            // Get the position and size of the card relative to the viewport.
            const rect = card.getBoundingClientRect();

            // e.x and e.y are the mouse's coordinates on the page.
            // We subtract the card's top-left corner coordinates (rect.left, rect.top)
            // to get the mouse position *relative to the card*.
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // Update the --mouse-x and --mouse-y CSS custom properties on the card.
            // The CSS will use these values to position the gradient.
            card.style.setProperty('--mouse-x', `${mouseX}px`);
            card.style.setProperty('--mouse-y', `${mouseY}px`);
        }
    });
});
// --- Animate on Scroll Logic ---
document.addEventListener('DOMContentLoaded', () => {
    // Select all elements you want to animate
    const fadeInElements = document.querySelectorAll('.sticky-section, .footer-section');

    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        threshold: 0.1 // trigger when 10% of the element is visible
    };

    // The observer object
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is intersecting (visible)
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing the element once it's visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Attach the observer to each element
    fadeInElements.forEach(el => {
        el.classList.add('fade-in'); // Add initial class for styling
        observer.observe(el);
    });
});

// --- Interests Page Randomizer Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const interestsGrid = document.getElementById('interests-grid');

    if (interestsGrid) { // Only run if on the interests page
        const interests = [
            "Education and Teaching", "Instructional Design", "Cognitive Neuroscience",
            "Abnormal Psychology", "True Crime", "Graphic Design",
            "Fictional Writing", "Documentaries", "Perfectly Curated Playlists",
            "Healthcare Simulation Technology", "Machine Learning", "Ethical Hacking",
            "Music Theory", "YouTube", "Books", "Flight and Critical Care Medicine",
            "Health Informatics", "Parenting Hacks", "Self-Care", "Motherhood",
            "Video Editing", "Motion Graphics", "Special FX", "UX/UI Design",
            "Frontend Development", "Webflow Development", "Digital Consultant",
            "WordPress Development", "New Businesses", "Startups", "Pizza"
        ];

        // Shuffle the array to randomize order
        for (let i = interests.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [interests[i], interests[j]] = [interests[j], interests[i]]; // Swap elements
        }

        interests.forEach(interest => {
            const span = document.createElement('span');
            span.classList.add('interest-tag-chaos');
            span.textContent = interest;

            // Add a random rotation degree for chaotic look
            const randomRotation = Math.random() * 8 - 4; // Between -4 and 4 degrees
            span.style.setProperty('--random-rotate', randomRotation);

            interestsGrid.appendChild(span);
        });
    }
});