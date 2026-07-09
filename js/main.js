// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // Initialize particles.js
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#00c8ff'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#7328ff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });

    // Initialize Typed.js
    const options = {
        strings: [
            'intelligent systems',
            'machine learning models',
            'Python applications',
            'data-driven solutions',
            'APIs and web services'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    };

    const typed = new Typed('.typed-text', options);

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Dark/Light theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light-theme');
        
        // Save user preference
        if (body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event from bubbling up
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const isClickInsideNav = navLinks.contains(e.target);
        const isClickOnHamburger = hamburger.contains(e.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Close mobile menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Project filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Make sure "All" filter is active by default
    const resetFilters = () => {
        filterBtns.forEach(btn => btn.classList.remove('active'));
        document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
        
        projectCards.forEach(card => {
            card.style.display = 'block';
            setTimeout(() => {
                card.setAttribute('data-aos', 'fade-up');
                AOS.refresh();
            }, 100);
        });
    };
    
    // Initialize with all projects visible
    resetFilters();
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the filter value
            const filter = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    // Trigger AOS animation
                    setTimeout(() => {
                        card.setAttribute('data-aos', 'fade-up');
                        AOS.refresh();
                    }, 100);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Blog/Books content switcher
    const contentSwitcherButtons = document.querySelectorAll('[data-content-target]');
    const contentPanels = document.querySelectorAll('[data-content-panel]');

    function setActiveContent(target) {
        contentSwitcherButtons.forEach(button => {
            const isActive = button.getAttribute('data-content-target') === target;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });

        contentPanels.forEach(panel => {
            panel.hidden = panel.getAttribute('data-content-panel') !== target;
        });

        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }

    contentSwitcherButtons.forEach(button => {
        button.addEventListener('click', function() {
            setActiveContent(this.getAttribute('data-content-target'));
        });
    });

    setActiveContent('books');

    // Project description toggle for expanded cards
    document.querySelectorAll('[data-project-toggle]').forEach(toggleButton => {
        toggleButton.addEventListener('click', function() {
            const targetId = this.getAttribute('aria-controls');
            const extraContent = document.getElementById(targetId);

            if (!extraContent) {
                return;
            }

            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            extraContent.hidden = isExpanded;
            this.setAttribute('aria-expanded', String(!isExpanded));
            this.textContent = isExpanded ? 'More' : 'Less';
        });
    });

    // Animate skill bars on scroll
    const skillLevels = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillLevels.forEach(level => {
            const width = level.style.width;
            level.style.width = '0';
            
            setTimeout(() => {
                level.style.width = width;
            }, 200);
        });
    }
    
    // Trigger animation when skills section is visible
    const skillsSection = document.querySelector('.skills');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(skillsSection);

    // Form validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (name && email && subject && message) {
                // Form valid - would normally submit the form or use AJAX here
                // For this example, just show a success message
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Certificate Carousel
    const certImages = [
        'certificate1.png',
        'certificate2.png',
        'certificate3.png',
        'certificate4.png',
        'certificate5.png',
        'certificate6.png',
        'certificate7.png',
        'certificate8.png',
        'certificate9.png'
    ];
    const certFolder = 'img/certificates/';
    let certIndex = 0;
    const certImage = document.getElementById('cert-image');
    const certLeft = document.getElementById('cert-left');
    const certRight = document.getElementById('cert-right');

    function updateCertImage() {
        certImage.src = certFolder + certImages[certIndex];
        certImage.alt = 'Certificate ' + (certIndex + 1);
    }
    if (certLeft && certRight && certImage) {
        certLeft.addEventListener('click', function() {
            certIndex = (certIndex - 1 + certImages.length) % certImages.length;
            updateCertImage();
        });
        certRight.addEventListener('click', function() {
            certIndex = (certIndex + 1) % certImages.length;
            updateCertImage();
        });
    }

    // Auto-play for Certificate Carousel (4s interval, pause on hover)
    const certCarousel = document.querySelector('.cert-carousel');
    let certAutoInterval = null;
    function stopCertAutoplay() {
        if (certAutoInterval) {
            clearInterval(certAutoInterval);
            certAutoInterval = null;
        }
    }
    function startCertAutoplay() {
        stopCertAutoplay();
        certAutoInterval = setInterval(function() {
            certIndex = (certIndex + 1) % certImages.length;
            updateCertImage();
        }, 4000);
    }
    startCertAutoplay();
    if (certCarousel) {
        certCarousel.addEventListener('mouseenter', stopCertAutoplay);
        certCarousel.addEventListener('mouseleave', startCertAutoplay);
    }

    // Certificate Zoom Modal
    const certModal = document.getElementById('cert-modal');
    const certModalImg = document.getElementById('cert-modal-img');
    const certModalClose = document.getElementById('cert-modal-close');
    if (certImage && certModal && certModalImg && certModalClose) {
        certImage.addEventListener('click', function() {
            certModal.classList.add('active');
            certModalImg.src = certImage.src;
            certModalImg.alt = certImage.alt;
        });
        certModalClose.addEventListener('click', function() {
            certModal.classList.remove('active');
            certModalImg.src = '';
        });
        certModal.addEventListener('click', function(e) {
            if (e.target === certModal) {
                certModal.classList.remove('active');
                certModalImg.src = '';
            }
        });
    }
});

// Final check after all resources are loaded
window.onload = function() {
    // Double-check project filtering
    const projectCards = document.querySelectorAll('.project-card');
    
    // Log all project categories for debugging
    console.log("Project Categories:");
    projectCards.forEach(card => {
        console.log(card.querySelector('h3').textContent + ": " + card.getAttribute('data-category'));
    });
    
    // Make sure all cards are visible initially
    projectCards.forEach(card => {
        card.style.display = 'block';
    });
    
    // Refresh AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}; 