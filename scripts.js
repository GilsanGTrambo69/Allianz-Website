document.addEventListener('DOMContentLoaded', function() {
    

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });
    
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });
    
    

    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkVisibility() {
        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    checkVisibility();
    
    window.addEventListener('scroll', checkVisibility);
    
    

    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        

        console.log('Datos del formulario:', formData);
        
        successMessage.classList.remove('hidden');
        
        contactForm.reset();
        
        setTimeout(function() {
            successMessage.classList.add('hidden');
        }, 5000);
    });
    
    

    const scrollTopBtn = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.remove('hidden');
        } else {
            scrollTopBtn.classList.add('hidden');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    

    const heroSection = document.getElementById('inicio');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        if (heroSection && scrolled <= heroSection.offsetHeight) {
            heroSection.style.transform = 'translateY(' + (scrolled * 0.5) + 'px)';
        }
    });
    
    

    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = 80;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16); // 60 FPS
        
        const timer = setInterval(function() {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }
    
    
    const navbar = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            navbar.classList.add('shadow-xl');
        } else {
            navbar.classList.remove('shadow-xl');
        }
    });
    
});