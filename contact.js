document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const sendAnother = document.getElementById('sendAnother');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => {
                el.style.display = 'none';
            });
            
            let isValid = true;
            
            // Validate name
            const nameInput = document.getElementById('name');
            if (!nameInput.value.trim()) {
                document.getElementById('nameError').textContent = 'Please enter your name';
                document.getElementById('nameError').style.display = 'block';
                isValid = false;
            }
            
            // Validate email
            const emailInput = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address';
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            }
            
            // Validate message
            const messageInput = document.getElementById('message');
            if (!messageInput.value.trim() || messageInput.value.length < 10) {
                document.getElementById('messageError').textContent = 'Please enter a message with at least 10 characters';
                document.getElementById('messageError').style.display = 'block';
                isValid = false;
            }
            
            // If valid, process form
            if (isValid) {
                // Collect form data
                const formData = {
                    name: nameInput.value,
                    email: emailInput.value,
                    subject: document.getElementById('subject').value,
                    message: messageInput.value,
                    date: new Date().toISOString()
                };
                
                // Store in localStorage for demo purposes
                // In a real application, you would send this to a server
                const contacts = JSON.parse(localStorage.getItem('contactMessages') || '[]');
                contacts.push(formData);
                localStorage.setItem('contactMessages', JSON.stringify(contacts));
                
                // Show success message
                formSuccess.classList.add('active');
                
                // Reset form
                contactForm.reset();
            }
        });
    }
    
    // Send another message button
    if (sendAnother) {
        sendAnother.addEventListener('click', function() {
            formSuccess.classList.remove('active');
        });
    }
    
    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            item.classList.toggle('active');
        });
    });
    
    // Floating labels for form
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    
    formInputs.forEach(input => {
        // Check if input has value on page load
        if (input.value) {
            input.classList.add('has-value');
        }
        
        input.addEventListener('focus', () => {
            input.classList.add('has-value');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.classList.remove('has-value');
            }
        });
    });
});
