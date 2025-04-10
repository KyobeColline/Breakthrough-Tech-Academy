document.addEventListener('DOMContentLoaded', () => {
    // Dark mode functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Check for saved theme preference or default to light
    const getCurrentTheme = () => {
        return localStorage.getItem('theme') || 'light';
    };

    // Apply theme to document
    const applyTheme = (theme) => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    // Initialize theme
    const currentTheme = getCurrentTheme();
    applyTheme(currentTheme);

    // Toggle dark/light mode
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const newTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // Initialize responsive search functionality
    initializeResponsiveSearch();
});

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.testimonials-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.querySelector('.testimonial-dots');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    let currentIndex = 0;
    let slideInterval;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Update slide position
    function updateSlide() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlide();
    }

    // Previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlide();
    }

    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateSlide();
        resetInterval();
    }

    // Reset interval
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Event listeners
    prevButton.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            resetInterval();
        }
    }

    // Start automatic sliding
    resetInterval();

    // Mobile Menu Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        // Toggle aria-expanded for accessibility
        const isExpanded = navLinks.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isNavToggle = event.target.closest('#navToggle');
        const isNavLinks = event.target.closest('.nav-links');
        
        if (!isNavToggle && !isNavLinks) {
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close mobile menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                navLinks.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    });

    // Handle scroll behavior
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolling down
        if (currentScroll > 0) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        // Auto-hide navbar on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 73) {
            navbar.style.transform = 'translateY(-100%)';
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // Add accessibility attributes
    navToggle.setAttribute('aria-label', 'Toggle navigation menu');
    navToggle.setAttribute('aria-expanded', 'false');
    navLinks.setAttribute('role', 'navigation');
    navLinks.setAttribute('aria-label', 'Main navigation');

    // Hero Slider functionality
    const heroSlider = {
        slides: document.querySelectorAll('.hero-slider .slide'),
        prevBtn: document.querySelector('.hero-slider .prev-slide'),
        nextBtn: document.querySelector('.hero-slider .next-slide'),
        dotsContainer: document.querySelector('.hero-slider .slide-dots'),
        currentSlide: 0,
        slideInterval: null,
        intervalDuration: 5000, // 5 seconds between slides

        init() {
            // Create dots based on number of slides
            this.createDots();
            
            // Add event listeners
            this.prevBtn.addEventListener('click', () => this.changeSlide('prev'));
            this.nextBtn.addEventListener('click', () => this.changeSlide('next'));
            
            // Add hover pause functionality
            const sliderContainer = document.querySelector('.hero-slider');
            sliderContainer.addEventListener('mouseenter', () => this.pauseSlider());
            sliderContainer.addEventListener('mouseleave', () => this.startSlider());
            
            // Start automatic sliding
            this.startSlider();
        },

        createDots() {
            // Create a dot for each slide
            this.slides.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => this.goToSlide(index));
                this.dotsContainer.appendChild(dot);
            });
        },

        updateDots() {
            // Update active state of dots
            const dots = this.dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentSlide);
            });
        },

        changeSlide(direction) {
            // Remove active class from current slide
            this.slides[this.currentSlide].classList.remove('active');
            
            // Calculate new slide index
            if (direction === 'next') {
                this.currentSlide = (this.currentSlide + 1) % this.slides.length;
            } else {
                this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            }
            
            // Add active class to new slide
            this.slides[this.currentSlide].classList.add('active');
            
            // Update dots
            this.updateDots();
        },

        goToSlide(index) {
            // Remove active class from current slide
            this.slides[this.currentSlide].classList.remove('active');
            
            // Update current slide
            this.currentSlide = index;
            
            // Add active class to new slide
            this.slides[this.currentSlide].classList.add('active');
            
            // Update dots
            this.updateDots();
            
            // Reset interval
            this.resetInterval();
        },

        startSlider() {
            this.slideInterval = setInterval(() => {
                this.changeSlide('next');
            }, this.intervalDuration);
        },

        pauseSlider() {
            clearInterval(this.slideInterval);
        },

        resetInterval() {
            clearInterval(this.slideInterval);
            this.startSlider();
        }
    };

    // Initialize the slider
    heroSlider.init();

    // Course filtering functionality
    const courseSearch = {
        searchInput: document.querySelector('.search-bar input'),
        searchButton: document.querySelector('.search-bar button'),
        categoryFilter: document.getElementById('categoryFilter'),
        levelFilter: document.getElementById('levelFilter'),
        durationFilter: document.getElementById('durationFilter'),
        courseCards: document.querySelectorAll('.course-card'),
        categoryHeaders: document.querySelectorAll('.category-header'),
        searchTimeout: null,

        init() {
            if (!this.searchInput) return;

            // Search input event
            this.searchInput.addEventListener('input', () => {
                clearTimeout(this.searchTimeout);
                this.searchTimeout = setTimeout(() => {
                    this.filterCourses();
                }, 300);
            });

            // Search button click event
            this.searchButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.filterCourses();
            });

            // Filter change events
            [this.categoryFilter, this.levelFilter, this.durationFilter].forEach(filter => {
                if (filter) {
                    filter.addEventListener('change', () => this.filterCourses());
                }
            });

            // Enter key support
            this.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.filterCourses();
                }
            });
        },

        filterCourses() {
            const searchTerm = this.searchInput.value.toLowerCase().trim();
            const categoryValue = this.categoryFilter ? this.categoryFilter.value : '';
            const levelValue = this.levelFilter ? this.levelFilter.value : '';
            const durationValue = this.durationFilter ? this.durationFilter.value : '';

            let visibleCategories = new Set();

            this.courseCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const tags = Array.from(card.querySelectorAll('.tag'))
                    .map(tag => tag.textContent.toLowerCase());
                const category = card.dataset.category;
                const level = card.dataset.level;
                const duration = card.dataset.duration;

                // Check all conditions
                const matchesSearch = !searchTerm || 
                    title.includes(searchTerm) || 
                    description.includes(searchTerm) || 
                    tags.some(tag => tag.includes(searchTerm));

                const matchesCategory = !categoryValue || category === categoryValue;
                const matchesLevel = !levelValue || level === levelValue;
                const matchesDuration = !durationValue || duration === durationValue;

                // Show/hide card based on all conditions
                if (matchesSearch && matchesCategory && matchesLevel && matchesDuration) {
                    card.style.display = 'block';
                    visibleCategories.add(category);
                    // Animate card appearance
                    requestAnimationFrame(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
        setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });

            // Update category headers visibility
            this.categoryHeaders.forEach(header => {
                const nextCard = header.nextElementSibling;
                if (nextCard && nextCard.classList.contains('course-card')) {
                    const category = nextCard.dataset.category;
                    header.style.display = visibleCategories.has(category) ? 'flex' : 'none';
                }
            });

            // Show no results message if needed
            this.updateNoResultsMessage(visibleCategories.size === 0);
        },

        updateNoResultsMessage(show) {
            let noResultsMsg = document.querySelector('.no-results-message');
            
            if (show) {
                if (!noResultsMsg) {
                    noResultsMsg = document.createElement('div');
                    noResultsMsg.className = 'no-results-message';
                    noResultsMsg.innerHTML = `
                        <i class="fas fa-search"></i>
                        <p>No courses found matching your criteria.</p>
                        <button class="reset-filters">Reset Filters</button>
                    `;
                    
                    const resetButton = noResultsMsg.querySelector('.reset-filters');
                    resetButton.addEventListener('click', () => this.resetFilters());
                    
                    document.querySelector('.courses-grid').appendChild(noResultsMsg);
                }
                noResultsMsg.style.display = 'flex';
            } else if (noResultsMsg) {
                noResultsMsg.style.display = 'none';
            }
        },

        resetFilters() {
            this.searchInput.value = '';
            if (this.categoryFilter) this.categoryFilter.value = '';
            if (this.levelFilter) this.levelFilter.value = '';
            if (this.durationFilter) this.durationFilter.value = '';
            this.filterCourses();
        }
    };

    // Initialize course search
    courseSearch.init();
});

// Responsive Search Functionality
function initializeResponsiveSearch() {
    const searchInput = document.getElementById('courseSearch');
    const searchBtn = document.getElementById('searchBtn');
    const courses = document.querySelectorAll('.course-card');
    const categories = document.querySelectorAll('.category-section');
    const searchSection = document.querySelector('.search-section');
    
    if (!searchInput || !searchBtn) return;
    
    // Track if we're in mobile mode
    let isMobileMode = window.innerWidth <= 768;
    
    // Add event listeners for search
    searchBtn.addEventListener('click', () => handleSearch());
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Add input event for real-time search on larger screens
    if (!isMobileMode) {
        searchInput.addEventListener('input', handleInputChange);
    }
    
    // Handle window resize with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        // Clear previous timeout to prevent multiple executions
        clearTimeout(resizeTimeout);
        
        // Set a timeout to avoid excessive function calls during resize
        resizeTimeout = setTimeout(() => {
            const newIsMobileMode = window.innerWidth <= 768;
            
            // Only update if the mode has changed
            if (newIsMobileMode !== isMobileMode) {
                isMobileMode = newIsMobileMode;
                
                // Update event listeners based on screen size
                if (isMobileMode) {
                    // Remove input event listener for mobile
                    searchInput.removeEventListener('input', handleInputChange);
                    
                    // Reset search when switching to mobile
                    resetSearch();
                } else {
                    // Add input event listener for real-time search
                    searchInput.addEventListener('input', handleInputChange);
                }
                
                // Update search section styling based on screen size
                updateSearchSectionStyle();
            }
        }, 250);
    });
    
    // Update search section styling based on screen size
    function updateSearchSectionStyle() {
        if (isMobileMode) {
            searchSection.style.position = 'relative';
            searchSection.style.top = '0';
        } else {
            searchSection.style.position = 'sticky';
            searchSection.style.top = '70px';
        }
    }
    
    // Initialize search section style
    updateSearchSectionStyle();
    
    // Define the input change handler function
    function handleInputChange() {
        if (searchInput.value === '') {
            resetSearch();
        } else {
            handleSearch();
        }
    }
    
    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let hasResults = false;
        
        courses.forEach(course => {
            const content = {
                title: course.querySelector('h3')?.textContent.toLowerCase() || '',
                description: course.querySelector('p')?.textContent.toLowerCase() || '',
                tags: Array.from(course.querySelectorAll('.tag'))
                    .map(tag => tag.textContent.toLowerCase())
            };
            
            const isMatch = content.title.includes(searchTerm) || 
                           content.description.includes(searchTerm) || 
                           content.tags.some(tag => tag.includes(searchTerm));
            
            // Use display: flex for visible cards to maintain layout
            course.style.display = isMatch ? 'flex' : 'none';
            if (isMatch) hasResults = true;
        });
        
        updateCategoryVisibility();
        updateNoResultsMessage(hasResults);
    }
    
    function resetSearch() {
        courses.forEach(course => course.style.display = 'flex');
        categories.forEach(category => category.style.display = 'block');
        const noResults = document.querySelector('.no-results');
        if (noResults) noResults.style.display = 'none';
    }
    
    function updateCategoryVisibility() {
        categories.forEach(category => {
            const hasVisibleCourses = Array.from(category.querySelectorAll('.course-card'))
                .some(card => card.style.display === 'flex');
            category.style.display = hasVisibleCourses ? 'block' : 'none';
        });
    }
    
    function updateNoResultsMessage(hasResults) {
        let noResults = document.querySelector('.no-results');
        
        if (!noResults) {
            noResults = createNoResultsElement();
        }
        
        noResults.style.display = hasResults ? 'none' : 'block';
    }
    
    function createNoResultsElement() {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = `
            <i class="fas fa-search"></i>
            <h3>No Courses Found</h3>
            <p>Try different keywords or browse our categories</p>
        `;
        document.querySelector('.courses-grid').prepend(noResults);
        return noResults;
    }
}