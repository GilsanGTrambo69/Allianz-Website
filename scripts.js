// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    /* ----- Menú Móvil ----- */
    // Obtener elementos del menú móvil
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Toggle del menú móvil al hacer click en el botón
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });
    
    // Cerrar menú móvil al hacer click en un enlace
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });
    
    
    /* ----- Animaciones de Fade-In al hacer scroll ----- */
    // Obtener todos los elementos con la clase fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Función para verificar si un elemento está visible en el viewport
    function checkVisibility() {
        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Si el elemento está visible en el viewport
            if (rect.top < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    // Verificar visibilidad al cargar la página
    checkVisibility();
    
    // Verificar visibilidad al hacer scroll
    window.addEventListener('scroll', checkVisibility);
    
    
    /* ----- Formulario de Contacto ----- */
    // Obtener elementos del formulario
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    
    // Manejar el envío del formulario
    contactForm.addEventListener('submit', function(e) {
        // Prevenir el envío por defecto del formulario
        e.preventDefault();
        
        // Obtener valores del formulario
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // Aquí iría la lógica para enviar los datos a un servidor
        // Por ahora solo mostraremos un mensaje de éxito
        console.log('Datos del formulario:', formData);
        
        // Mostrar mensaje de éxito
        successMessage.classList.remove('hidden');
        
        // Resetear el formulario
        contactForm.reset();
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(function() {
            successMessage.classList.add('hidden');
        }, 5000);
    });
    
    
    /* ----- Botón Scroll to Top ----- */
    // Obtener el botón de scroll to top
    const scrollTopBtn = document.getElementById('scroll-top');
    
    // Mostrar/ocultar botón según el scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.remove('hidden');
        } else {
            scrollTopBtn.classList.add('hidden');
        }
    });
    
    // Scroll suave al top al hacer click en el botón
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    
    /* ----- Efecto de Parallax Simple en Hero ----- */
    // Obtener la sección hero
    const heroSection = document.getElementById('inicio');
    
    // Aplicar efecto parallax al hacer scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        // Mover el fondo de la sección hero más lento que el scroll
        if (heroSection && scrolled <= heroSection.offsetHeight) {
            heroSection.style.transform = 'translateY(' + (scrolled * 0.5) + 'px)';
        }
    });
    
    
    /* ----- Smooth Scroll para Enlaces de Navegación ----- */
    // Obtener todos los enlaces de navegación
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    // Añadir evento click a cada enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener el destino del scroll
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calcular la posición considerando el header fijo
                const headerHeight = 80;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                // Hacer scroll suave a la sección
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    /* ----- Contador Animado (opcional, para estadísticas) ----- */
    // Esta función puede ser usada para animar números
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
    
    
    /* ----- Cambio de Color del Header al Hacer Scroll ----- */
    const navbar = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            navbar.classList.add('shadow-xl');
        } else {
            navbar.classList.remove('shadow-xl');
        }
    });
    
});

