document.addEventListener('DOMContentLoaded', () => {
    // Initialize UI elements
    initializeDarkMode();
    initializeMobileMenu();
    initializeAnimations();
    initializeFAQ();
    initializeEnrollment();
    initializeNavigation();
    addCustomStyles();
});

// Dark Mode functionality
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.setAttribute('data-theme', 
                document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
            );
        });
    }
}

// Mobile Menu functionality
function initializeMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        handleMobileMenuInteractions(navToggle, navLinks);
    }
}

function handleMobileMenuInteractions(navToggle, navLinks) {
    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        const isNavToggle = event.target.closest('#navToggle');
        const isNavLinks = event.target.closest('.nav-links');
        
        if (!isNavToggle && !isNavLinks) {
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking links
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
}

// Animation functionality
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.course-card, .category-header, .about-card, .stat-item')
        .forEach(el => observer.observe(el));
}

// FAQ functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Initially hide all answers
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = '0';
                    otherAnswer.style.opacity = '0';
                }
            });
            
            // Toggle current FAQ item
            const isActive = item.classList.contains('active');
            item.classList.toggle('active');
            
            // Show/hide answer with animation
            if (!isActive) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
            } else {
                answer.style.maxHeight = '0';
                answer.style.opacity = '0';
            }
        });
    });
}

// Enrollment functionality
function initializeEnrollment() {
    const elements = {
        buttons: document.querySelectorAll('.course-btn'),
        section: document.getElementById('enrollmentSection'),
        closeBtn: document.getElementById('closeEnrollment'),
        courseName: document.getElementById('selectedCourseName'),
        form: document.getElementById('enrollmentForm')
    };

    if (!elements.section) return;

    elements.buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const courseName = button.closest('.course-card').querySelector('h3').textContent;
            elements.courseName.textContent = courseName;
            elements.section.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    if (elements.closeBtn) {
        elements.closeBtn.addEventListener('click', () => closeEnrollmentForm(elements.section));
    }

    if (elements.form) {
        elements.form.addEventListener('submit', (e) => handleEnrollmentSubmit(e, elements));
    }
}

function closeEnrollmentForm(section) {
    section.style.display = 'none';
    document.body.style.overflow = '';
}

function handleEnrollmentSubmit(e, elements) {
    e.preventDefault();
    alert('Thank you for your enrollment! We will contact you shortly.');
    closeEnrollmentForm(elements.section);
    elements.form.reset();
}

// Navigation functionality
function initializeNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add custom styles
function addCustomStyles() {
    const styles = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
} 