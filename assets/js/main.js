// Enhanced Dynamic JavaScript for Polish Auto Spa Pitesti

// Utility functions
const utils = {
    // Throttle function for performance
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    },
    
    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Dynamic loading animations
document.addEventListener('DOMContentLoaded', function() {
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Remove loading class after page loads
    window.addEventListener('load', function() {
        document.body.classList.remove('loading');
        initializeAnimations();
    });
});

// Initialize all animations
function initializeAnimations() {
    // Add entrance animations to elements
    const animatedElements = document.querySelectorAll('h1, h2, h3, .service-card, .package-card, .gallery-item');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Enhanced Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const menuIcon = mobileMenuButton ? mobileMenuButton.querySelector('i') : null;
    
    function openMobileMenu() {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenuOverlay.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
        
        // Animate menu items
        const menuItems = mobileMenu.querySelectorAll('a');
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100);
        });
        
        if (menuIcon) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
            menuIcon.style.transform = 'rotate(180deg)';
        }
    }
    
    function closeMobileMenu() {
        mobileMenu.classList.add('translate-x-full');
        mobileMenuOverlay.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
        
        if (menuIcon) {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
            menuIcon.style.transform = 'rotate(0deg)';
        }
    }
    
    if (mobileMenuButton && mobileMenu && mobileMenuOverlay) {
        mobileMenuButton.addEventListener('click', openMobileMenu);
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', closeMobileMenu);
        }
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
        
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('translate-x-full')) {
                closeMobileMenu();
            }
        });
    }
});

// Enhanced scroll animations
const scrollAnimations = {
    init: function() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Add special effects for different elements
                    if (entry.target.classList.contains('service-card')) {
                        entry.target.style.animationDelay = Math.random() * 0.5 + 's';
                    }
                    
                    if (entry.target.classList.contains('package-card')) {
                        setTimeout(() => {
                            entry.target.style.transform = 'translateY(0) scale(1)';
                        }, 200);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll('.service-card, .package-card, .gallery-item, .card-red-accent, h2, h3');
        animatedElements.forEach(el => {
            el.classList.add('scroll-animate');
            observer.observe(el);
        });
    }
};

// Dynamic navbar effects
const navbarEffects = {
    init: function() {
        const nav = document.querySelector('nav');
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', utils.throttle(() => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                nav.classList.add('shadow-lg', 'bg-white/95');
                nav.style.backdropFilter = 'blur(10px)';
            } else {
                nav.classList.remove('shadow-lg');
                nav.style.backdropFilter = 'blur(5px)';
            }
            
            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        }, 100));
    }
};

// Enhanced form validation with animations
function validateForm(formElement) {
    let isValid = true;
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            showError(input, 'Acest câmp este obligatoriu');
            input.style.animation = 'shake 0.5s ease-in-out';
        } else {
            clearError(input);
            input.style.animation = '';
            
            if (input.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    isValid = false;
                    showError(input, 'Vă rugăm să introduceți o adresă de email validă');
                    input.style.animation = 'shake 0.5s ease-in-out';
                }
            }
            
            if (input.type === 'tel') {
                const phoneRegex = /^\+?[\d\s-]{10,}$/;
                if (!phoneRegex.test(input.value)) {
                    isValid = false;
                    showError(input, 'Vă rugăm să introduceți un număr de telefon valid');
                    input.style.animation = 'shake 0.5s ease-in-out';
                }
            }
        }
    });
    
    return isValid;
}

function showError(input, message) {
    clearError(input);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-red-500 text-sm mt-1';
    errorDiv.textContent = message;
    errorDiv.style.opacity = '0';
    errorDiv.style.transform = 'translateY(-10px)';
    
    input.classList.add('border-red-500');
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
    
    // Animate error message
    setTimeout(() => {
        errorDiv.style.transition = 'all 0.3s ease';
        errorDiv.style.opacity = '1';
        errorDiv.style.transform = 'translateY(0)';
    }, 10);
}

function clearError(input) {
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.style.opacity = '0';
        existingError.style.transform = 'translateY(-10px)';
        setTimeout(() => existingError.remove(), 300);
    }
    input.classList.remove('border-red-500');
}

// Enhanced booking form with dynamic effects
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
    // Add focus effects to inputs
    const inputs = bookingForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 0 20px rgba(220, 38, 38, 0.2)';
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.style.transform = 'scale(1)';
            this.style.boxShadow = '';
        });
        
        // Add typing effect
        input.addEventListener('input', function() {
            this.style.borderColor = 'var(--primary-red)';
            setTimeout(() => {
                this.style.borderColor = '';
            }, 1000);
        });
    });
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Animate button
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Se trimite...';
            submitButton.style.transform = 'scale(0.95)';
            
            // Simulate form submission
            setTimeout(() => {
                // Success animation
                const successMessage = document.createElement('div');
                successMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4';
                successMessage.innerHTML = `
                    <strong class="font-bold">Succes!</strong>
                    <span class="block sm:inline"> Cererea dumneavoastră de programare a fost trimisă. Vă vom contacta în scurt timp.</span>
                `;
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'scale(0.8)';
                
                this.appendChild(successMessage);
                
                // Animate success message
                setTimeout(() => {
                    successMessage.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    successMessage.style.opacity = '1';
                    successMessage.style.transform = 'scale(1)';
                }, 10);
                
                // Reset form
                this.reset();
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                submitButton.style.transform = 'scale(1)';
                
                // Remove success message
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    successMessage.style.transform = 'scale(0.8)';
                    setTimeout(() => successMessage.remove(), 500);
                }, 5000);
            }, 1500);
        }
    });
}

// Enhanced gallery functionality
const galleryEffects = {
    init: function() {
        const filterButtons = document.querySelectorAll('[data-filter]');
        const galleryItems = document.querySelectorAll('.gallery-item');

        if (filterButtons.length && galleryItems.length) {
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const filterValue = this.getAttribute('data-filter');
                    
                    // Update button states with animation
                    filterButtons.forEach(btn => {
                        btn.classList.remove('active');
                        btn.style.transform = 'scale(1)';
                    });
                    this.classList.add('active');
                    this.style.transform = 'scale(1.1)';
                    
                    // Filter items with staggered animation
                    galleryItems.forEach((item, index) => {
                        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                            setTimeout(() => {
                                item.style.display = 'block';
                                item.style.opacity = '0';
                                item.style.transform = 'scale(0.8)';
                                
                                setTimeout(() => {
                                    item.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                                    item.style.opacity = '1';
                                    item.style.transform = 'scale(1)';
                                }, 50);
                            }, index * 100);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'scale(0.8)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });
        }

        // Enhanced lightbox
        const lightbox = document.getElementById('lightbox');
        const galleryImages = document.querySelectorAll('.gallery-item img');

        if (lightbox && galleryImages.length) {
            const lightboxImg = lightbox.querySelector('img');
            
            galleryImages.forEach(img => {
                img.addEventListener('click', function() {
                    lightboxImg.src = this.src;
                    lightboxImg.alt = this.alt;
                    
                    // Animate lightbox opening
                    lightbox.classList.remove('hidden');
                    lightbox.style.opacity = '0';
                    lightboxImg.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        lightbox.style.transition = 'opacity 0.3s ease';
                        lightboxImg.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                        lightbox.style.opacity = '1';
                        lightboxImg.style.transform = 'scale(1)';
                    }, 10);
                    
                    document.body.classList.add('overflow-hidden');
                });
            });

            // Close lightbox
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    this.style.opacity = '0';
                    lightboxImg.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        this.classList.add('hidden');
                        document.body.classList.remove('overflow-hidden');
                    }, 300);
                }
            });

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
                    lightbox.style.opacity = '0';
                    lightboxImg.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        lightbox.classList.add('hidden');
                        document.body.classList.remove('overflow-hidden');
                    }, 300);
                }
            });
        }
    }
};

// Enhanced particle background effect with toggle functionality
const particleEffect = {
    canvas: null,
    ctx: null,
    particles: [],
    animationFrame: null,
    enabled: true,

    init: function() {
        const hero = document.querySelector('.hero-section, section:first-of-type');
        if (!hero) return;
        
        // Create canvas if it doesn't exist
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.canvas.style.position = 'absolute';
            this.canvas.style.top = '0';
            this.canvas.style.left = '0';
            this.canvas.style.width = '100%';
            this.canvas.style.height = '100%';
            this.canvas.style.pointerEvents = 'none';
            this.canvas.style.zIndex = '1';
            this.canvas.classList.add('particle-canvas');
        
            hero.style.position = 'relative';
            hero.appendChild(this.canvas);
            
            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
        
            // Load saved preference
            const savedPreference = localStorage.getItem('particleEnabled');
            this.enabled = savedPreference === null ? true : savedPreference === 'true';
            
            // Update toggle button state
            const toggleBtn = document.getElementById('particle-toggle');
            if (toggleBtn) {
                toggleBtn.innerHTML = `<i class="fas fa-magic mr-1"></i> Particles: ${this.enabled ? 'On' : 'Off'}`;
            }
        }

        this.resizeCanvas();
        this.createParticles();
        if (this.enabled) {
            this.startAnimation();
        } else {
            this.stopAnimation();
        }

        window.addEventListener('resize', () => this.resizeCanvas());
    },

    resizeCanvas: function() {
        if (!this.canvas) return;
        const hero = document.querySelector('.hero-section, section:first-of-type');
        if (!hero) return;
        
        this.canvas.width = hero.offsetWidth;
        this.canvas.height = hero.offsetHeight;
    },
        
    createParticles: function() {
        this.particles = [];
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: `rgba(220, 38, 38, ${Math.random() * 0.5 + 0.2})`
            });
        }
    },
        
    animate: function() {
        if (!this.ctx || !this.canvas || !this.enabled) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
        });
        
        this.animationFrame = requestAnimationFrame(() => this.animate());
    },
        
    startAnimation: function() {
        this.enabled = true;
        localStorage.setItem('particleEnabled', 'true');
        if (this.canvas) {
            this.canvas.style.display = 'block';
            this.animate();
        }
        const toggleBtn = document.getElementById('particle-toggle');
        if (toggleBtn) {
            toggleBtn.innerHTML = '<i class="fas fa-magic mr-1"></i> Particles: On';
        }
    },

    stopAnimation: function() {
        this.enabled = false;
        localStorage.setItem('particleEnabled', 'false');
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        if (this.canvas) {
            this.canvas.style.display = 'none';
        }
        const toggleBtn = document.getElementById('particle-toggle');
        if (toggleBtn) {
            toggleBtn.innerHTML = '<i class="fas fa-magic mr-1"></i> Particles: Off';
        }
    },

    toggle: function() {
        if (this.enabled) {
            this.stopAnimation();
        } else {
            this.startAnimation();
        }
    }
};

// Enhanced hover effects
const hoverEffects = {
    init: function() {
        // Service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(220, 38, 38, 0.2)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
            });
        });
        
        // Social icons
        const socialIcons = document.querySelectorAll('.social-icon');
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.2) rotate(10deg)';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
            });
        });
    }
};

// Initialize all dynamic effects
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: false,
        mirror: true,
        offset: 50
    });

    scrollAnimations.init();
    navbarEffects.init();
    galleryEffects.init();
    hoverEffects.init();
    
    // Add particle effect only on desktop
    if (window.innerWidth > 768) {
        particleEffect.init();
        
        // Setup particle toggle button
        const particleToggleBtn = document.getElementById('particle-toggle');
        if (particleToggleBtn) {
            particleToggleBtn.addEventListener('click', () => {
                particleEffect.toggle();
            });
        }
    }

    // Add hover-pulse class to important elements
    const importantElements = document.querySelectorAll('.btn-primary, .service-card');
    importantElements.forEach(el => {
        el.classList.add('hover-pulse');
    });

    // Add float-shadow to cards
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        card.classList.add('float-shadow');
    });

    // Enhance scroll animations with intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                if (entry.target.classList.contains('shimmer')) {
                    entry.target.style.animationDelay = Math.random() * 0.5 + 's';
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.scroll-animate, .shimmer').forEach(el => {
        observer.observe(el);
    });
});

// Add CSS for shake animation
const shakeCSS = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}
`;

const style = document.createElement('style');
style.textContent = shakeCSS;
document.head.appendChild(style);

// Performance monitoring
const performanceMonitor = {
    init: function() {
        // Reduce animations on slower devices
        if (navigator.hardwareConcurrency < 4) {
            document.documentElement.style.setProperty('--animation-duration', '0.2s');
        }
        
        // Pause animations when tab is not visible
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                document.body.style.animationPlayState = 'paused';
            } else {
                document.body.style.animationPlayState = 'running';
            }
        });
    }
};

performanceMonitor.init();
