// ===== INICIALIZACIÓN AL CARGAR LA PÁGINA =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Sitio Web - Kevin Campos - Versión Optimizada');
    
    // Inicializar todos los componentes
    initTheme();
    initParticles();
    initScroll();
    initEvents();
    initPhoto();
    initFooterTime();
    initNavScroll();
    
    // Inicializar animaciones después de un breve retardo
    setTimeout(initAnimations, 300);
    
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
                    value: 50, // Reducido para mejor rendimiento
                    density: {
                        enable: true,
                        value_area: 800 // Reducido para mejor rendimiento
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
                    value: 0.25, // Reducido para mejor visibilidad
                    random: true,
                    anim: {
                        enable: true,
                        speed: 0.8, // Reducido para mejor rendimiento
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 2.5, // Reducido ligeramente
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1.5, // Reducido para mejor rendimiento
                        size_min: 1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 100, // Reducido para mejor rendimiento
                    color: "#00a8ff",
                    opacity: 0.15, // Reducido para mejor visibilidad
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1, // Reducido para mejor rendimiento
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
                        distance: 120, // Reducido para mejor rendimiento
                        line_linked: {
                            opacity: 0.3 // Reducido
                        }
                    },
                    push: {
                        particles_nb: 3 // Reducido
                    }
                }
            },
            retina_detect: true
        });
        
        console.log('✨ Sistema de partículas optimizado inicializado');
    }
}

// ===== NAVEGACIÓN CON EFECTO SCROLL =====
function initNavScroll() {
    const navBar = document.querySelector('.nav-bar');
    
    if (!navBar) return;
    
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        // Usar debounce para mejor rendimiento
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            if (window.scrollY > 50) {
                navBar.classList.add('scrolled');
            } else {
                navBar.classList.remove('scrolled');
            }
        }, 10);
    });
}

// ===== GESTIÓN DE LA FOTO DE PERFIL CON EFECTOS =====
function initPhoto() {
    const profilePhoto = document.getElementById('profilePhoto');
    
    if (!profilePhoto) return;
    
    // Precargar la imagen
    const img = new Image();
    img.src = profilePhoto.src;
    
    img.onload = function() {
        profilePhoto.style.opacity = '0';
        profilePhoto.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            profilePhoto.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            profilePhoto.style.opacity = '1';
            profilePhoto.style.transform = 'scale(1)';
        }, 50);
    };
    
    // Manejar errores de carga
    profilePhoto.onerror = function() {
        console.log('ℹ️ Usando placeholder para la foto de perfil');
        this.style.opacity = '1';
        this.style.transform = 'scale(1)';
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
    
    console.log('🔧 Navegación suave configurada');
}

function createScrollTopButton() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 25px;
        right: 25px;
        width: 45px;
        height: 45px;
        background: linear-gradient(135deg, #00a8ff, #0097e6);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.1rem;
        cursor: pointer;
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0, 168, 255, 0.3);
        transform: translateY(20px);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    // Mostrar/ocultar botón al hacer scroll
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            if (window.scrollY > 300) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.visibility = 'visible';
                scrollTopBtn.style.transform = 'translateY(0)';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.visibility = 'hidden';
                scrollTopBtn.style.transform = 'translateY(20px)';
            }
        }, 10);
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
                const targetPosition = targetElement.offsetTop - headerHeight - 10; // Reducido de 20 a 10
                
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
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            let current = '';
            const scrollPosition = window.scrollY + 80; // Reducido de 100 a 80
            
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
        }, 10);
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
    
    console.log('🎯 Eventos y efectos configurados');
}

function initCertModal() {
    const certModal = document.getElementById('certModal');
    const closeModalBtn = document.getElementById('closeModal');
    const certButtons = document.querySelectorAll('.btn-view-cert, .cert-item');
    
    if (!certModal || !closeModalBtn) return;
    
    // Mapeo de certificaciones a imágenes
    const certImages = {
        'computacion': 'computacion.jpg',
        'liderazgo': 'liderazgo.jpg',
        'inteligencia': 'inteligencia.jpg',
        'decisiones': 'decisiones.jpg',
        'rh': 'rh.jpg',
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
                const modalContent = certModal.querySelector('.modal-content');
                modalContent.style.opacity = '0';
                modalContent.style.transform = 'translate(-50%, -50%) scale(0.95)';
                
                setTimeout(() => {
                    modalContent.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
                    modalContent.style.opacity = '1';
                    modalContent.style.transform = 'translate(-50%, -50%) scale(1)';
                }, 10);
            } else {
                console.log(`⚠️ Imagen no encontrada para certificación: ${certId}`);
            }
        });
    });
    
    // Cerrar modal
    closeModalBtn.addEventListener('click', function() {
        closeModal();
    });
    
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
        modalContent.style.transform = 'translate(-50%, -50%) scale(0.95)';
        
        setTimeout(() => {
            certModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            modalContent.style.opacity = '';
            modalContent.style.transform = '';
        }, 250);
    }
}

function initCardHoverEffects() {
    const cards = document.querySelectorAll('.profile-card, .experience-card, .skills-category, .education-card, .certifications-card, .document-card, .footer-card, .about-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-6px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 168, 255, 0.12)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(0, 168, 255, 0.08)';
        });
    });
}

function initInteractiveEffects() {
    // Efectos en botones
    const buttons = document.querySelectorAll('button:not(.theme-toggle):not(.modal-close):not(.mobile-menu-toggle)');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.96)';
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
            this.style.transform = 'translateY(-1px)';
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
                icon.style.transform = 'rotate(12deg) scale(1.15)';
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
                second: '2-digit',
                hour12: false
            });
            footerTimeElement.textContent = timeString;
        }
        
        // Actualizar cada segundo
        updateFooterTime();
        setInterval(updateFooterTime, 1000);
    }
    
    if (footerDateElement) {
        // Mostrar "Marzo 2026" como última actualización
        footerDateElement.textContent = `Marzo 2026`;
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
                        }, index * 30); // Reducido de 50ms a 30ms
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08, // Reducido de 0.1 a 0.08
        rootMargin: '0px 0px -40px 0px' // Reducido de -50px a -40px
    });
    
    // Observar elementos para animar
    const animatedElements = document.querySelectorAll(
        '.profile-card, .experience-card, .skills-category, .education-card, .certifications-card, .document-card, .section-title, .footer-card, .about-card, .hero-container'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)'; // Reducido de 30px a 25px
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; // Reducido de 0.8s a 0.6s
        observer.observe(el);
        
        // Preparar elementos hijos para animación escalonada
        const listItems = el.querySelectorAll('li, .highlight-item, .position, .education-item, .cert-item');
        listItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(8px)'; // Reducido de 10px a 8px
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease'; // Reducido de 0.5s a 0.4s
        });
    });
    
    // Añadir clase animate-in cuando se carga
    setTimeout(() => {
        animatedElements.forEach(el => {
            el.classList.add('animate-in');
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 200); // Reducido de 300ms a 200ms
}

// ===== OPTIMIZACIÓN PARA MÓVILES =====
function initMobileOptimizations() {
    // Detectar si es móvil
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Reducir animaciones en móviles
        document.documentElement.style.setProperty('--animation-speed', '0.5s');
        
        // Mejorar rendimiento táctil
        document.body.style.webkitTapHighlightColor = 'rgba(0, 168, 255, 0.1)';
    }
}

// Inicializar optimizaciones para móviles
initMobileOptimizations();

console.log('🎉 Sitio web completamente cargado y optimizado!');
