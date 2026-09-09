document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS Animation
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > 100) {
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

    // Phone mockup hover effect
    const phoneMockups = document.querySelectorAll('.phone-mockup, .screenshot-mockup');
    phoneMockups.forEach(phone => {
        phone.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('phone-mockup') ? 
                'rotateY(-5deg) rotateX(2deg) scale(1.02)' : 
                'translateY(-5px) scale(1.05)';
        });
        
        phone.addEventListener('mouseleave', function() {
            this.style.transform = this.classList.contains('phone-mockup') ? 
                'rotateY(-10deg) rotateX(5deg)' : 
                'translateY(0) scale(1)';
        });
    });

    // Feature cards hover effect
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon');
            icon.style.transform = 'scale(1.1) rotateY(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon');
            icon.style.transform = 'scale(1) rotateY(0deg)';
        });
    });

    // Floating animation for hero elements
    function createFloatingAnimation() {
        const heroElements = document.querySelectorAll('.hero-stats, .daily-word-card');
        heroElements.forEach((element, index) => {
            const delay = index * 0.5;
            element.style.animation = `float 6s ease-in-out infinite ${delay}s`;
        });
    }

    // Add floating animation CSS
    const floatingCSS = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            25% { transform: translateY(-5px); }
            50% { transform: translateY(0px); }
            75% { transform: translateY(-2px); }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = floatingCSS;
    document.head.appendChild(style);
    
    createFloatingAnimation();

    // Stats counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = counter.textContent;
                    
                    if (target.includes('K+')) {
                        animateNumber(counter, 0, 10, '+K');
                    } else if (target.includes('%')) {
                        animateNumber(counter, 0, 100, '%');
                    } else if (target.includes('⭐')) {
                        animateNumber(counter, 0, 4.9, '⭐', true);
                    }
                    
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    function animateNumber(element, start, end, suffix, isDecimal = false) {
        const duration = 2000;
        const increment = (end - start) / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            
            const displayValue = isDecimal ? current.toFixed(1) : Math.floor(current);
            element.textContent = displayValue + suffix;
        }, 16);
    }

    animateCounters();

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroSection && heroImage) {
            const rate = scrolled * -0.5;
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });

    // Mobile menu close on click
    const mobileNavLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                navbarCollapse.classList.remove('show');
            }
        });
    });

    // Loading effect for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        });
    });

    // Add subtle hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Add focus styles for keyboard navigation
    const focusCSS = `
        .keyboard-navigation *:focus {
            outline: 2px solid var(--primary-color) !important;
            outline-offset: 2px !important;
        }
    `;
    
    const focusStyle = document.createElement('style');
    focusStyle.textContent = focusCSS;
    document.head.appendChild(focusStyle);

    console.log('Berceste website loaded successfully! 🎉');

    // Cookie consent banner
    try {
        const consentKey = 'berceste_cookie_consent_v1';
        const existing = localStorage.getItem(consentKey);
        if (!existing) {
            // determine relative path to privacy page anchor
            const path = window.location.pathname;
            let prefix = '';
            if (path.includes('/pages/blog-yazilari/')) prefix = '../../';
            else if (path.includes('/pages/')) prefix = '../';
            else prefix = '';

            const detailsHref = `${prefix}gizlilik-politikasi.html#cerez-politikasi`;

            const cc = document.createElement('div');
            cc.className = 'cookie-consent';
            cc.innerHTML = `
                <button class="btn-close-cc" aria-label="Kapat">×</button>
                <h4>Çerez Kullanımı</h4>
                <p>Deneyiminizi iyileştirmek için çerezler kullanıyoruz. Detaylar için
                   <a class="link-cookie" href="${detailsHref}">Çerez Politikası</a> bölümüne göz atabilirsiniz.</p>
                <div class="cookie-actions">
                    <button class="btn-accept">Kabul Et</button>
                    <a class="link-cookie link-pref" href="#">Tercihler</a>
                </div>
            `;

            document.body.appendChild(cc);

            const acceptBtn = cc.querySelector('.btn-accept');
            const closeBtn = cc.querySelector('.btn-close-cc');
            const prefLink = cc.querySelector('.link-pref');

            const dismiss = () => {
                cc.remove();
            };

            acceptBtn.addEventListener('click', () => {
                localStorage.setItem(consentKey, 'accepted');
                dismiss();
            });
            closeBtn.addEventListener('click', () => {
                // store dismissed state to avoid flashing every visit; user can revisit policy
                localStorage.setItem(consentKey, 'dismissed');
                dismiss();
            });

            // Open preferences modal
            const openPreferences = () => {
                // overlay
                const overlay = document.createElement('div');
                overlay.className = 'cc-overlay';
                overlay.addEventListener('click', () => {
                    document.body.removeChild(overlay);
                    document.body.removeChild(modal);
                });

                // modal
                const modal = document.createElement('div');
                modal.className = 'cc-modal';
                modal.innerHTML = `
                  <div class="cc-header">
                    <h3 class="cc-title">Çerez Tercihleri</h3>
                    <button class="cc-close-x" aria-label="Kapat">×</button>
                  </div>
                  <div class="cc-body">
                    <p class="cc-desc">Hangi çerez kategorelerine izin vereceğinizi seçebilirsiniz. Zorunlu çerezler temel işlevler için gereklidir.</p>
                    <div class="cc-row">
                      <div>
                        <strong>Zorunlu Çerezler</strong>
                        <div class="text-muted" style="font-size:.9rem">Oturum ve güvenlik için gereklidir.</div>
                      </div>
                      <div>
                        <input type="checkbox" checked disabled>
                      </div>
                    </div>
                    <div class="cc-row">
                      <div>
                        <strong>Performans</strong>
                        <div class="text-muted" style="font-size:.9rem">Kullanım istatistikleri (anonim).</div>
                      </div>
                      <div>
                        <input type="checkbox" class="cc-pref" data-key="performance">
                      </div>
                    </div>
                    <div class="cc-row">
                      <div>
                        <strong>Fonksiyonel</strong>
                        <div class="text-muted" style="font-size:.9rem">Tercihlerinizi hatırlamak için.</div>
                      </div>
                      <div>
                        <input type="checkbox" class="cc-pref" data-key="functional">
                      </div>
                    </div>
                  </div>
                  <div class="cc-actions">
                    <button class="cc-btn cc-btn-outline cc-reject">Reddet</button>
                    <button class="cc-btn cc-btn-outline cc-save">Kaydet</button>
                    <button class="cc-btn cc-btn-primary cc-accept-all">Tümünü Kabul Et</button>
                  </div>
                `;

                document.body.appendChild(overlay);
                document.body.appendChild(modal);

                const closeX = modal.querySelector('.cc-close-x');
                const rejectBtn = modal.querySelector('.cc-reject');
                const saveBtn = modal.querySelector('.cc-save');
                const acceptAllBtn = modal.querySelector('.cc-accept-all');

                const closeModal = () => {
                    if (overlay.parentNode) document.body.removeChild(overlay);
                    if (modal.parentNode) document.body.removeChild(modal);
                };

                closeX.addEventListener('click', closeModal);
                overlay.addEventListener('click', closeModal);

                acceptAllBtn.addEventListener('click', () => {
                    localStorage.setItem(consentKey, 'accepted');
                    localStorage.setItem(consentKey + '_prefs', JSON.stringify({ performance: true, functional: true }));
                    closeModal();
                    dismiss();
                });

                saveBtn.addEventListener('click', () => {
                    const prefs = {};
                    modal.querySelectorAll('.cc-pref').forEach(cb => {
                        prefs[cb.dataset.key] = cb.checked;
                    });
                    localStorage.setItem(consentKey, 'custom');
                    localStorage.setItem(consentKey + '_prefs', JSON.stringify(prefs));
                    closeModal();
                    dismiss();
                });

                rejectBtn.addEventListener('click', () => {
                    localStorage.setItem(consentKey, 'rejected');
                    localStorage.setItem(consentKey + '_prefs', JSON.stringify({ performance: false, functional: false }));
                    closeModal();
                    dismiss();
                });
            };

            prefLink.addEventListener('click', (e) => {
                e.preventDefault();
                openPreferences();
            });
        }
    } catch (e) {
        console.warn('Cookie consent init error:', e);
    }
});