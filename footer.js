document.addEventListener('DOMContentLoaded', function() {
    // Social media links functionality
    const socialLinks = document.querySelectorAll('.footer .social-link');
    
    socialLinks.forEach(link => {
        // Add hover animation
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Add click functionality
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('data-platform');
            const url = getSocialUrl(platform);
            
            // Open in new tab
            window.open(url, '_blank');
            
            // Add ripple effect on click
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
    
    // Function to get social media URLs
    function getSocialUrl(platform) {
        const urls = {
            'facebook': 'https://facebook.com/breakthroughtech',
            'twitter': 'https://twitter.com/breakthroughtech',
            'linkedin': 'https://linkedin.com/company/breakthroughtech',
            'instagram': 'https://instagram.com/breakthroughtech'
        };
        return urls[platform] || '#';
    }
}); 