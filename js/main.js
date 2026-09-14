// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // Initialize particles.js with twinkling stars and constellation network
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 110,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#10b981', '#059669', '#047857', '#d1fae5']
            },
            shape: {
                type: ['circle', 'star'],
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.65,
                random: true,
                anim: {
                    enable: true,
                    speed: 1.5,
                    opacity_min: 0.12,
                    sync: false
                }
            },
            size: {
                value: 3.2,
                random: true,
                anim: {
                    enable: true,
                    speed: 2.2,
                    size_min: 0.6,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#047857',
                opacity: 0.25,
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

    // Project filters & Show More toggle
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectsShowMoreBtn = document.getElementById('projects-show-more-btn');
    const projectsMoreContainer = document.querySelector('.projects-more-container');
    const MAX_VISIBLE_PROJECTS = 5;
    let isProjectsExpanded = false;

    function updateProjectsDisplay() {
        const activeFilterBtn = document.querySelector('.filter-btn.active');
        const currentFilter = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';

        let matchingCount = 0;
        let visibleCount = 0;

        projectCards.forEach(card => {
            const categories = (card.getAttribute('data-category') || '').split(' ');
            const isMatch = (currentFilter === 'all' || categories.includes(currentFilter));

            if (isMatch) {
                matchingCount++;
                // In "all" filter, limit to top 5 projects unless expanded
                if (currentFilter === 'all' && !isProjectsExpanded) {
                    if (visibleCount < MAX_VISIBLE_PROJECTS) {
                        card.classList.remove('project-hidden');
                        card.style.display = 'flex';
                        visibleCount++;
                    } else {
                        card.classList.add('project-hidden');
                        card.style.display = 'none';
                    }
                } else {
                    card.classList.remove('project-hidden');
                    card.style.display = 'flex';
                    visibleCount++;
                }
                card.setAttribute('data-aos', 'fade-up');
            } else {
                card.classList.add('project-hidden');
                card.style.display = 'none';
            }
        });

        window.updateProjectsDisplay = updateProjectsDisplay;

        // Toggle "Show More" button container
        if (projectsMoreContainer && projectsShowMoreBtn) {
            const btnText = projectsShowMoreBtn.querySelector('.btn-text');
            if (currentFilter === 'all' && matchingCount > MAX_VISIBLE_PROJECTS) {
                projectsMoreContainer.style.display = 'flex';
                projectsShowMoreBtn.setAttribute('aria-expanded', String(isProjectsExpanded));
                if (btnText) {
                    btnText.textContent = isProjectsExpanded ? 'Show Less' : 'Show More Projects';
                }
            } else {
                projectsMoreContainer.style.display = 'none';
            }
        }

        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }

    // Filter button click listeners
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateProjectsDisplay();
        });
    });

    // Show More / Show Less button listener
    if (projectsShowMoreBtn) {
        projectsShowMoreBtn.addEventListener('click', function() {
            isProjectsExpanded = !isProjectsExpanded;
            updateProjectsDisplay();

            // Smooth scroll back to top of projects if user collapsed
            if (!isProjectsExpanded) {
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    }

    // Initial render
    updateProjectsDisplay();

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

    // Image Zoom Modal & Certificate Scroll Navigation
    const certModal = document.getElementById('cert-modal');
    const certModalImg = document.getElementById('cert-modal-img');
    const certModalClose = document.getElementById('cert-modal-close');
    const certModalPrev = document.getElementById('cert-modal-prev');
    const certModalNext = document.getElementById('cert-modal-next');
    const certModalCaption = document.getElementById('cert-modal-caption');
    let isCertMode = false;

    function updateModalCertDisplay() {
        if (!certModalImg) return;
        certModalImg.style.opacity = '0.3';
        certModalImg.style.transform = 'scale(0.96)';
        setTimeout(() => {
            certModalImg.src = certFolder + certImages[certIndex];
            certModalImg.alt = 'Certificate ' + (certIndex + 1);
            certModalImg.style.opacity = '1';
            certModalImg.style.transform = 'scale(1)';
        }, 120);

        if (certModalCaption) {
            certModalCaption.textContent = `Certificate ${certIndex + 1} of ${certImages.length}`;
        }
        updateCertImage();
    }

    function openImageModal(imageElement, isCertificate = false) {
        if (!certModal || !certModalImg) {
            return;
        }

        isCertMode = isCertificate;
        certModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        if (isCertMode) {
            if (certModalPrev) certModalPrev.style.display = 'flex';
            if (certModalNext) certModalNext.style.display = 'flex';
            if (certModalCaption) {
                certModalCaption.style.display = 'block';
                certModalCaption.textContent = `Certificate ${certIndex + 1} of ${certImages.length}`;
            }
            certModalImg.src = certFolder + certImages[certIndex];
            certModalImg.alt = 'Certificate ' + (certIndex + 1);
        } else {
            if (certModalPrev) certModalPrev.style.display = 'none';
            if (certModalNext) certModalNext.style.display = 'none';
            if (certModalCaption) certModalCaption.style.display = 'none';
            certModalImg.src = imageElement.src;
            certModalImg.alt = imageElement.alt;
        }
    }

    function closeImageModal() {
        if (!certModal || !certModalImg) return;
        certModal.classList.remove('active');
        document.body.style.overflow = '';
        certModalImg.src = '';
    }

    if (certModal && certModalImg) {
        if (certImage) {
            certImage.addEventListener('click', function() {
                openImageModal(certImage, true);
            });
        }

        if (certModalPrev) {
            certModalPrev.addEventListener('click', function(e) {
                e.stopPropagation();
                certIndex = (certIndex - 1 + certImages.length) % certImages.length;
                updateModalCertDisplay();
            });
        }

        if (certModalNext) {
            certModalNext.addEventListener('click', function(e) {
                e.stopPropagation();
                certIndex = (certIndex + 1) % certImages.length;
                updateModalCertDisplay();
            });
        }

        document.querySelectorAll('.project-img img, .blog-img img').forEach(image => {
            image.addEventListener('click', function() {
                openImageModal(this, false);
            });
        });

        if (certModalClose) {
            certModalClose.addEventListener('click', closeImageModal);
        }

        certModal.addEventListener('click', function(e) {
            if (e.target === certModal) {
                closeImageModal();
            }
        });

        // Keyboard navigation for modal
        window.addEventListener('keydown', function(e) {
            if (certModal.classList.contains('active')) {
                if (e.key === 'Escape') {
                    closeImageModal();
                } else if (isCertMode && e.key === 'ArrowLeft') {
                    certIndex = (certIndex - 1 + certImages.length) % certImages.length;
                    updateModalCertDisplay();
                } else if (isCertMode && e.key === 'ArrowRight') {
                    certIndex = (certIndex + 1) % certImages.length;
                    updateModalCertDisplay();
                }
            }
        });

        // Interactive Cursor Spotlight
        const spotlight = document.getElementById('cursor-spotlight');
        if (spotlight && window.matchMedia('(pointer: fine)').matches) {
            let mouseX = -1000;
            let mouseY = -1000;
            let currentX = -1000;
            let currentY = -1000;
            let isMoving = false;
            let rafId = null;

            function animateSpotlight() {
                currentX += (mouseX - currentX) * 0.18;
                currentY += (mouseY - currentY) * 0.18;

                spotlight.style.setProperty('--mouse-x', `${currentX.toFixed(1)}px`);
                spotlight.style.setProperty('--mouse-y', `${currentY.toFixed(1)}px`);

                if (Math.abs(mouseX - currentX) > 0.1 || Math.abs(mouseY - currentY) > 0.1) {
                    rafId = requestAnimationFrame(animateSpotlight);
                } else {
                    isMoving = false;
                    rafId = null;
                }
            }

            window.addEventListener('mousemove', function(e) {
                mouseX = e.clientX;
                mouseY = e.clientY;

                if (!spotlight.classList.contains('active')) {
                    currentX = mouseX;
                    currentY = mouseY;
                    spotlight.style.setProperty('--mouse-x', `${currentX}px`);
                    spotlight.style.setProperty('--mouse-y', `${currentY}px`);
                    spotlight.classList.add('active');
                }

                if (!isMoving) {
                    isMoving = true;
                    rafId = requestAnimationFrame(animateSpotlight);
                }
            }, { passive: true });

            document.addEventListener('mouseleave', function() {
                spotlight.classList.remove('active');
            });
        }
    }
});

// Final check after all resources are loaded
window.onload = function() {
    // Ensure project filtering state is respected after all assets load
    if (typeof window.updateProjectsDisplay === 'function') {
        window.updateProjectsDisplay();
    }
    
    // Refresh AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}; 