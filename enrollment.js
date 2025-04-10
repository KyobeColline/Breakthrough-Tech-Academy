document.addEventListener('DOMContentLoaded', () => {
    // Enrollment Form Functionality
    const enrollmentManager = {
        section: document.getElementById('enrollmentSection'),
        form: document.getElementById('enrollmentForm'),
        closeBtn: document.getElementById('closeEnrollment'),
        courseNameSpan: document.getElementById('selectedCourseName'),
        
        init() {
            // Add click handlers to all enroll buttons
            document.querySelectorAll('.course-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const courseCard = e.target.closest('.course-card');
                    const courseName = courseCard.querySelector('h3').textContent;
                    
                    // Add animation to the clicked card
                    courseCard.style.transform = 'scale(0.98)';
                    setTimeout(() => courseCard.style.transform = 'scale(1)', 150);
                    
                    this.openEnrollmentForm(courseName);
                });
            });

            // Close form handlers
            this.closeBtn.addEventListener('click', () => this.closeEnrollmentForm());
            this.section.addEventListener('click', (e) => {
                if (e.target === this.section) this.closeEnrollmentForm();
            });

            // Form submission
            this.form.addEventListener('submit', (e) => this.handleEnrollment(e));

            // Add input animations
            this.setupInputAnimations();
            
            // Add escape key listener
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.section.style.display !== 'none') {
                    this.closeEnrollmentForm();
                }
            });
        },

        setupInputAnimations() {
            // Add focus animations to all form inputs
            this.form.querySelectorAll('input, select').forEach(input => {
                input.addEventListener('focus', () => {
                    input.parentElement.classList.add('focused');
                });

                input.addEventListener('blur', () => {
                    if (!input.value) {
                        input.parentElement.classList.remove('focused');
                    }
                });

                // Add validation styling
                input.addEventListener('input', () => {
                    if (input.checkValidity()) {
                        input.classList.add('valid');
                        input.classList.remove('invalid');
                    } else {
                        input.classList.remove('valid');
                        input.classList.add('invalid');
                    }
                });
            });
        },

        openEnrollmentForm(courseName) {
            this.courseNameSpan.textContent = courseName;
            this.section.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            
            // Trigger animation
            requestAnimationFrame(() => {
                this.section.classList.add('active');
                this.animateFormElements();
            });
        },

        closeEnrollmentForm() {
            this.section.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
            
            // Reset form with animation
            setTimeout(() => {
                this.section.style.display = 'none';
                this.form.reset();
                this.form.querySelectorAll('.focused').forEach(el => {
                    el.classList.remove('focused');
                });
                this.form.querySelectorAll('.valid, .invalid').forEach(el => {
                    el.classList.remove('valid', 'invalid');
                });
            }, 300);
        },

        animateFormElements() {
            const elements = this.form.querySelectorAll('.form-group, button');
            elements.forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    el.style.transition = 'all 0.3s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100); // Stagger the animations
            });
        },

        handleEnrollment(e) {
            e.preventDefault();
            const submitBtn = this.form.querySelector('.enroll-btn');
            
            // Add loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span>Processing...</span>
                <i class="fas fa-spinner fa-spin"></i>
            `;

            // Simulate form submission
            setTimeout(() => {
                const enrollmentData = {
                    courseName: this.courseNameSpan.textContent,
                    studentName: this.form.studentName.value,
                    studentEmail: this.form.studentEmail.value,
                    phoneNumber: this.form.phoneNumber.value,
                    education: this.form.education.value,
                    experience: this.form.experience.value,
                    enrollmentDate: new Date().toISOString()
                };

                // Save to localStorage
                const existingEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
                existingEnrollments.push(enrollmentData);
                localStorage.setItem('enrollments', JSON.stringify(existingEnrollments));

                // Show success message
                this.showNotification('Enrollment submitted successfully!', 'success');
                
                // Close form
                this.closeEnrollmentForm();
            }, 1500);
        },

        showNotification(message, type = 'success') {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.innerHTML = `
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            `;
            
            document.body.appendChild(notification);
            
            // Trigger animation
            requestAnimationFrame(() => {
                notification.classList.add('show');
            });

            // Remove notification
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }
    };

    // FAQ Functionality
    const faqManager = {
        init() {
            document.querySelectorAll('.faq-question').forEach(question => {
                question.addEventListener('click', () => {
                    const faqItem = question.parentElement;
                    const isActive = faqItem.classList.contains('active');
                    
                    // Close all other FAQs
                    document.querySelectorAll('.faq-item').forEach(item => {
                        item.classList.remove('active');
                    });

                    // Toggle current FAQ
                    if (!isActive) {
                        faqItem.classList.add('active');
                    }
                });
            });
        }
    };

    // Initialize both managers
    enrollmentManager.init();
    faqManager.init();
});