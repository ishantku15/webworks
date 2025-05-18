document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Floating labels enhancement
        const formGroups = document.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            const input = group.querySelector('input, select, textarea');
            
            if (input) {
                // Check if input has value on page load
                if (input.value) {
                    group.querySelector('label').style.top = '-20px';
                    group.querySelector('label').style.fontSize = '14px';
                    group.querySelector('label').style.color = 'var(--primary-color)';
                    group.querySelector('.underline').style.width = '100%';
                }
                
                // Add focus and blur events
                input.addEventListener('focus', function() {
                    group.querySelector('label').style.top = '-20px';
                    group.querySelector('label').style.fontSize = '14px';
                    group.querySelector('label').style.color = 'var(--primary-color)';
                    group.querySelector('.underline').style.width = '100%';
                });
                
                input.addEventListener('blur', function() {
                    if (!this.value) {
                        group.querySelector('label').style.top = '15px';
                        group.querySelector('label').style.fontSize = '16px';
                        group.querySelector('label').style.color = 'var(--gray-color)';
                        group.querySelector('.underline').style.width = '0';
                    }
                });
            }
        });

        // Form submission handler
        contactForm.addEventListener('submit', function(e) {
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            let isValid = true;
            const errorMessages = [];
            
            if (!name) {
                errorMessages.push('Name is required');
                isValid = false;
            }
            
            if (!email) {
                errorMessages.push('Email is required');
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                errorMessages.push('Please enter a valid email address');
                isValid = false;
            }
            
            if (!service) {
                errorMessages.push('Please select a service');
                isValid = false;
            }
            
            if (!message) {
                errorMessages.push('Message is required');
                isValid = false;
            }
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fix the following errors:\n\n' + errorMessages.join('\n'));
                return;
            }
            
            // If validation passes, let it submit to FormSubmit.co
            // You can add additional processing here if needed
            
            // Optional: Show sending message
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Optional: Add a small delay to show the loading state
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, 2000);
            
            // The form will now submit to FormSubmit.co automatically
        });
        
        // Optional: Add honeypot field dynamically
        const honeyPot = document.createElement('input');
        honeyPot.type = 'text';
        honeyPot.name = '_honey';
        honeyPot.style.display = 'none';
        contactForm.appendChild(honeyPot);
        
        // Optional: Add additional FormSubmit parameters
        const templateInput = document.createElement('input');
        templateInput.type = 'hidden';
        templateInput.name = '_template';
        templateInput.value = 'table';
        contactForm.appendChild(templateInput);
        
        const captchaInput = document.createElement('input');
        captchaInput.type = 'hidden';
        captchaInput.name = '_captcha';
        captchaInput.value = 'false';
        contactForm.appendChild(captchaInput);
        
        // Make sure to set your _next page in the HTML form itself
    }
});