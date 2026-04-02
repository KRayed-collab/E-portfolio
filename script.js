// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Animate hamburger lines
    const spans = mobileToggle.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth Scroll for Anchor Links (fallback if CSS doesn't work out of the box)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Simulate Form Submission
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent real submission

        // Change button text to simulate loading
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Transmitting...';
        submitBtn.disabled = true;

        // Simulate network delay using Timeout
        setTimeout(() => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Show Success Message
            formStatus.classList.remove('hidden');

            // Clear inputs
            contactForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                formStatus.classList.add('hidden');
            }, 5000);

        }, 1500);
    });
}

// Intersect Observer for fade-in animations on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeUp 0.8s forwards cubic-bezier(0.1, 1, 0.3, 1)`;
            entry.target.style.opacity = '1'; /* fallback */
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach((section) => {
    // Reset opacity initially for intersection observer to work dynamically
    section.style.opacity = '0';
    observer.observe(section);
});
