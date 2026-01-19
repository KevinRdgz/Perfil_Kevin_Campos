// ===== INICIALIZACIÓN AL CARGAR LA PÁGINA =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 CV Profesional - Kevin Campos - Versión Optimizada');
    
    // Inicializar todos los componentes
    initTheme();
    initParticles();
    initScroll();
    initEvents();
    initPhoto();
    initFooterTime();
    initNavScroll();
    
    // Inicializar animaciones después de un breve retardo
    setTimeout(initAnimations, 500);
    
    console.log('✅ Todos los componentes inicializados correctamente');
});

// ===== GESTIÓN DEL TEMA (OSCURO/CLARO) =====
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Verificar tema guardado en localStorage
    const savedTheme = localStorage.getItem('cv-theme');
    
    // Verificar preferencia del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Aplicar tema inicial
    if (savedTheme) {
        if (savedTheme === 'light') {
            setLightTheme();
        } else {
            setDarkTheme();
        }
    } else {
        // Si no hay tema guardado, usar preferencia del sistema
        if (prefersDark) {
            setDarkTheme();
        } else {
            setLightTheme();
        }
    }
    
    // Evento del botón de cambio de tema
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            if (body.classList.contains('dark-theme')) {
                setLightTheme();
            } else {
                setDarkTheme();
            }
            // Efecto de animación en el botón
            this.style.transform = 'rotate(180deg) scale(1.2)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    }
    
    console.log('🎨 Gestión de tema inicializada');
}

function setDarkTheme() {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    localStorage.setItem('cv-theme', 'dark');
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggle.title = 'Cambiar a modo claro';
    }
}

function setLightTheme() {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    localStorage.setItem('cv-theme', 'light');
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.title = 'Cambiar a modo oscuro';
    }
}

// ===== PARTÍCULAS DE FONDO MEJORADAS =====
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-bg', {
            particles: {
                number: {
                    value: 60,
                    density: {
                        enable: true,
                        value_area: 1000
                    }
                },
                color: {
                    value: "#00a8ff"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 120,
                    color: "#00a8ff",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.4
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
        
        console.log('✨ Sistema de partículas mejorado inicializado');
    }
}

// ===== NAVEGACIÓN CON EFECTO SCROLL =====
function initNavScroll() {
    const navBar = document.querySelector('.nav-bar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navBar.classList.add('scrolled');
        } else {
            navBar.classList.remove('scrolled');
        }
    });
}

// ===== MENÚ MÓVIL MEJORADO =====
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
            
            // Efecto de animación
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
        
        // Cerrar menú al hacer clic en un enlace (en móviles)
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
        
        // Cerrar menú al redimensionar a pantalla grande
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    console.log('📱 Menú móvil mejorado configurado');
}

// ===== GESTIÓN DE LA FOTO DE PERFIL CON EFECTOS =====
function initPhoto() {
    const profilePhoto = document.getElementById('profilePhoto');
    
    if (!profilePhoto) return;
    
    // Cuando la imagen cargue, mostrar con efecto
    profilePhoto.onload = function() {
        profilePhoto.style.opacity = '0';
        profilePhoto.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            profilePhoto.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            profilePhoto.style.opacity = '1';
            profilePhoto.style.transform = 'scale(1)';
        }, 100);
    };
    
    // Manejar errores de carga
    profilePhoto.onerror = function() {
        console.log('❌ Error al cargar la foto, usando placeholder');
    };
}

// ===== SCROLL SUAVE Y NAVEGACIÓN MEJORADA =====
function initScroll() {
    // Crear botón "volver arriba"
    createScrollTopButton();
    
    // Navegación suave para enlaces internos
    initSmoothScroll();
    
    // Menú activo al hacer scroll
    initActiveMenu();
    
    console.log('🔧 Navegación suave mejorada configurada');
}

function createScrollTopButton() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #00a8ff, #0097e6);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(0, 168, 255, 0.3);
        transform: translateY(20px);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    // Mostrar/ocultar botón al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
            scrollTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
            scrollTopBtn.style.transform = 'translateY(20px)';
        }
    });
    
    // Evento click para volver arriba
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Efecto de animación
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.nav-bar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Efecto visual en el enlace clickeado
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            }
        });
    });
}

function initActiveMenu() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== EVENTOS Y FUNCIONALIDADES MEJORADAS =====
function initEvents() {
    // Modal de certificaciones
    initCertModal();
    
    // Efectos hover en tarjetas
    initCardHoverEffects();
    
    // Efectos en elementos interactivos
    initInteractiveEffects();
    
    // Menú móvil mejorado
    initMobileMenu();
    
    console.log('🎯 Eventos y efectos mejorados configurados');
}

function initCertModal() {
    const certModal = document.getElementById('certModal');
    const closeModalBtn = document.getElementById('closeModal');
    const certButtons = document.querySelectorAll('.btn-view-cert, .cert-item');
    
    // Mapeo de certificaciones a imágenes
    const certImages = {
        'scrum': 'scrum.png',
        'ccna': 'ccna.jpg',
        'liderazgo': 'liderazgo.jpg',
        'rh': 'rh.jpg',
        'inteligencia': 'inteligencia.jpg',
        'decisiones': 'decisiones.jpg',
        'computacion': 'computacion.jpg',
        'universidad': 'universidad.jpg',
        'bachiller': 'bachiller.jpg'
    };
    
    // Eventos para abrir modal
    certButtons.forEach(button => {
        button.addEventListener('click', function() {
            const certId = this.getAttribute('data-cert');
            const certImage = document.getElementById('certImage');
            
            if (certImages[certId]) {
                certImage.src = certImages[certId];
                certImage.alt = `Certificación ${certId}`;
                certModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Efecto de entrada para el modal
                certModal.querySelector('.modal-content').style.opacity = '0';
                certModal.querySelector('.modal-content').style.transform = 'translate(-50%, -50%) scale(0.9)';
                
                setTimeout(() => {
                    certModal.querySelector('.modal-content').style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    certModal.querySelector('.modal-content').style.opacity = '1';
                    certModal.querySelector('.modal-content').style.transform = 'translate(-50%, -50%) scale(1)';
                }, 10);
            }
        });
    });
    
    // Cerrar modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            closeModal();
        });
    }
    
    // Cerrar modal al hacer clic fuera
    const modalOverlay = certModal.querySelector('.modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function() {
            closeModal();
        });
    }
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && certModal.style.display === 'block') {
            closeModal();
        }
    });
    
    function closeModal() {
        const modalContent = certModal.querySelector('.modal-content');
        modalContent.style.opacity = '0';
        modalContent.style.transform = 'translate(-50%, -50%) scale(0.9)';
        
        setTimeout(() => {
            certModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            modalContent.style.opacity = '';
            modalContent.style.transform = '';
        }, 300);
    }
}

function initCardHoverEffects() {
    const cards = document.querySelectorAll('.profile-card, .experience-card, .skills-category, .education-card, .certifications-card, .document-card, .footer-card, .about-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 168, 255, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 168, 255, 0.1)';
        });
    });
}

function initInteractiveEffects() {
    // Efectos en botones
    const buttons = document.querySelectorAll('button:not(.theme-toggle):not(.modal-close):not(.mobile-menu-toggle)');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Efectos en enlaces
    const links = document.querySelectorAll('a:not(.nav-links a):not(.footer-social-icon):not(.document-card)');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Efectos en tags
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(15deg) scale(1.2)';
            }
        });
        
        tag.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
}

// ===== ACTUALIZAR HORA EN FOOTER =====
function initFooterTime() {
    const footerTimeElement = document.getElementById('footerCurrentTime');
    const footerDateElement = document.getElementById('footerUpdateDate');
    
    if (footerTimeElement) {
        function updateFooterTime() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            footerTimeElement.textContent = timeString;
        }
        
        // Actualizar cada segundo
        updateFooterTime();
        setInterval(updateFooterTime, 1000);
    }
    
    if (footerDateElement) {
        // Mostrar "Enero 2026" como última actualización
        footerDateElement.textContent = `Enero 2026`;
    }
}

// ===== ANIMACIONES MEJORADAS =====
function initAnimations() {
    // Observer para animar elementos al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Efecto escalonado para elementos en listas
                if (entry.target.querySelectorAll('li, .highlight-item, .position, .education-item, .cert-item')) {
                    const items = entry.target.querySelectorAll('li, .highlight-item, .position, .education-item, .cert-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 50);
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observar elementos para animar
    const animatedElements = document.querySelectorAll(
        '.profile-card, .experience-card, .skills-category, .education-card, .certifications-card, .document-card, .section-title, .footer-card, .about-card, .hero-container'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
        
        // Preparar elementos hijos para animación escalonada
        const listItems = el.querySelectorAll('li, .highlight-item, .position, .education-item, .cert-item');
        listItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
    });
    
    // Añadir clase animate-in cuando se carga
    setTimeout(() => {
        animatedElements.forEach(el => {
            el.classList.add('animate-in');
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 300);
}

console.log('🎉 CV completamente cargado y optimizado para máxima experiencia visual!');