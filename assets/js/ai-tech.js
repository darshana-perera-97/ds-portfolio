// AI Tech Portfolio JavaScript

$(document).ready(function() {
    
    // Hero Background Image Handling
    function initHeroBackground() {
        const heroImage = document.querySelector('.hero-bg-image');
        if (heroImage) {
            heroImage.addEventListener('load', function() {
                console.log('Hero background image loaded');
                $(this).fadeIn(1000);
            });
            
            heroImage.addEventListener('error', function() {
                console.log('Hero background image failed to load, using fallback');
                // Hide image and show matrix background as fallback
                $('.hero-image-bg').hide();
                $('.matrix-bg').css('opacity', '0.1');
            });
        }
    }
    
    // Initialize hero background
    initHeroBackground();
    
    // Typing Animation
    const typingText = [
        "Web Developer",
        "UI/UX Designer", 
        "Frontend Developer",
        "React Developer",
        "Full Stack Developer"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;
    
    function typeWriter() {
        const currentText = typingText[textIndex];
        const typedElement = $('.typed-text');
        
        if (isDeleting) {
            typedElement.text(currentText.substring(0, charIndex - 1));
            charIndex--;
        } else {
            typedElement.text(currentText.substring(0, charIndex + 1));
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => {
                isDeleting = true;
            }, pauseTime);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingText.length;
        }
        
        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(typeWriter, speed);
    }
    
    // Start typing animation after page load
    setTimeout(typeWriter, 1000);
    
    // Counter Animation
    function animateCounters() {
        $('.stat-number').each(function() {
            const $this = $(this);
            const countTo = $this.attr('data-count');
            const duration = 2000;
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: duration,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }
    
    // Scroll Animations
    function checkScroll() {
        const elements = $('.fade-in');
        
        elements.each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('visible');
            }
        });
    }
    
    // Parallax Effect for Floating Elements
    function parallaxEffect() {
        const scrolled = $(window).scrollTop();
        const elements = $('.floating-elements .element');
        
        elements.each(function() {
            const speed = $(this).data('speed') || 0.5;
            const yPos = -(scrolled * speed);
            $(this).css('transform', `translateY(${yPos}px)`);
        });
    }
    
    // Matrix Background Animation
    function animateMatrix() {
        const matrix = $('.matrix-bg');
        let offset = 0;
        
        setInterval(() => {
            offset += 1;
            matrix.css('transform', `translate(${offset}px, ${offset}px)`);
        }, 100);
    }
    
    // Neural Network Animation
    function animateNeuralNetwork() {
        const nodes = $('.node');
        
        nodes.each(function(index) {
            $(this).css('animation-delay', `${index * 0.2}s`);
        });
    }
    
    // Smooth Scrolling for Navigation Links
    $('.page-scroll').on('click', function(e) {
        e.preventDefault();
        
        const target = $(this).attr('href');
        const $target = $(target);
        
        if ($target.length) {
            $('html, body').animate({
                scrollTop: $target.offset().top - 80
            }, 1000, 'easeInOutQuart');
        }
    });
    
    // Active Navigation Highlighting
    function updateActiveNav() {
        const scrollPos = $(window).scrollTop();
        
        $('.page-scroll').each(function() {
            const currLink = $(this);
            const refElement = $(currLink.attr('href'));
            
            if (refElement.length) {
                const elementTop = refElement.offset().top - 100;
                const elementBottom = elementTop + refElement.outerHeight();
                
                if (scrollPos >= elementTop && scrollPos < elementBottom) {
                    $('.navbar-nav .nav-item').removeClass('active');
                    currLink.parent().addClass('active');
                }
            }
        });
    }
    
    // Hover Effects for Service Cards
    $('.single-service').hover(
        function() {
            $(this).find('.service-icon').addClass('pulse');
        },
        function() {
            $(this).find('.service-icon').removeClass('pulse');
        }
    );
    
    // Project Card Hover Effects
    $('.single-work').hover(
        function() {
            $(this).find('.work-overlay').css('opacity', '1');
        },
        function() {
            $(this).find('.work-overlay').css('opacity', '0.9');
        }
    );
    
    // Contact Form Enhancement
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        
        // Add loading state
        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.text();
        
        submitBtn.text('Sending...').prop('disabled', true);
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.text('Message Sent!').addClass('success');
            
            setTimeout(() => {
                submitBtn.text(originalText).prop('disabled', false).removeClass('success');
                $('#contact-form')[0].reset();
            }, 2000);
        }, 1500);
    });
    
    // Tech Stack Tags Animation
    $('.tech-tag').hover(
        function() {
            $(this).addClass('glow');
        },
        function() {
            $(this).removeClass('glow');
        }
    );
    
    // Back to Top Button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });
    
    $('.back-to-top').click(function() {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });
    
    // Preloader
    $(window).on('load', function() {
        $('.preloader').fadeOut(1000);
        
        // Start animations after preloader
        setTimeout(() => {
            animateCounters();
            animateNeuralNetwork();
            animateMatrix();
        }, 1000);
    });
    
    // Initialize scroll events
    $(window).scroll(function() {
        checkScroll();
        updateActiveNav();
        parallaxEffect();
    });
    
    // Initialize on page load
    checkScroll();
    updateActiveNav();
    
    // Add fade-in class to elements
    $('.single-service, .single-work, .contact-box, .stat-item').addClass('fade-in');
    
    // Easing function for smooth animations
    $.easing.easeInOutQuart = function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    };
    
    // Add CSS classes for animations
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .pulse {
                animation: pulse-animation 0.6s ease-in-out;
            }
            
            @keyframes pulse-animation {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            
            .glow {
                box-shadow: 0 0 20px var(--primary-color);
            }
            
            .success {
                background: var(--gradient-secondary) !important;
                color: white !important;
            }
            
            .fade-in {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .fade-in.visible {
                opacity: 1;
                transform: translateY(0);
            }
        `)
        .appendTo('head');
    
    // Add floating particles effect
    function createParticles() {
        const particleCount = 20;
        const container = $('.ai-background');
        
        for (let i = 0; i < particleCount; i++) {
            const particle = $('<div class="particle"></div>');
            particle.css({
                position: 'absolute',
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                background: 'var(--primary-color)',
                borderRadius: '50%',
                opacity: Math.random() * 0.5 + 0.2,
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animation: `float-particle ${Math.random() * 10 + 5}s infinite linear`
            });
            container.append(particle);
        }
    }
    
    // Add particle animation CSS
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            @keyframes float-particle {
                0% {
                    transform: translateY(0px) translateX(0px);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) translateX(50px);
                    opacity: 0;
                }
            }
        `)
        .appendTo('head');
    
    // Initialize particles
    createParticles();
    
    // Add intersection observer for better performance
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });
        
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }
    
    // Add cursor trail effect
    let mouseX = 0;
    let mouseY = 0;
    let trail = [];
    
    $(document).mousemove(function(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
        
        trail.push({
            x: mouseX,
            y: mouseY,
            timestamp: Date.now()
        });
        
        // Keep only last 10 positions
        if (trail.length > 10) {
            trail.shift();
        }
        
        // Create cursor trail effect
        if (trail.length > 1) {
            const lastPos = trail[trail.length - 1];
            const prevPos = trail[trail.length - 2];
            
            if (lastPos.timestamp - prevPos.timestamp > 16) { // 60fps
                const trailDot = $('<div class="cursor-trail"></div>');
                trailDot.css({
                    position: 'fixed',
                    width: '2px',
                    height: '2px',
                    background: 'var(--primary-color)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    left: lastPos.x + 'px',
                    top: lastPos.y + 'px',
                    opacity: 0.6
                });
                
                $('body').append(trailDot);
                
                setTimeout(() => {
                    trailDot.fadeOut(300, function() {
                        $(this).remove();
                    });
                }, 100);
            }
        }
    });
    
    // Add CSS for cursor trail
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .cursor-trail {
                animation: fade-out 0.3s ease-out;
            }
            
            @keyframes fade-out {
                to {
                    opacity: 0;
                    transform: scale(0);
                }
            }
        `)
        .appendTo('head');
    
    // Add typing sound effect (optional)
    function playTypingSound() {
        // Create audio context for typing sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
    
    // Add typing sound to form inputs
    $('input, textarea').on('keydown', function() {
        // Uncomment to enable typing sound
        // playTypingSound();
    });
    
    console.log('AI Tech Portfolio initialized successfully! 🚀');
}); 