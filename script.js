/**
 * Profile Page JavaScript
 * Handles theme toggling and interactive features
 */

// ============================================
// THEME MANAGEMENT
// ============================================

class ThemeManager {
    constructor() {
        this.theme = this.getStoredTheme() || this.getPreferredTheme();
        this.themeToggleBtn = document.getElementById('themeToggle');
        this.init();
    }

    init() {
        // Set initial theme
        this.setTheme(this.theme);

        // Add event listener to toggle button
        this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!this.getStoredTheme()) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    getPreferredTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    getStoredTheme() {
        return localStorage.getItem('theme');
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Add animation class
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);

        // Add a subtle rotation animation to the button
        this.themeToggleBtn.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            this.themeToggleBtn.style.transform = '';
        }, 300);
    }
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

class AnimationObserver {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'none';
                }
            });
        }, this.observerOptions);

        // Observe all animated elements
        const animatedElements = document.querySelectorAll('.timeline-item, .project-card');
        animatedElements.forEach(el => observer.observe(el));
    }
}

// ============================================
// SMOOTH SCROLL ENHANCEMENT
// ============================================

class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Add smooth scrolling to anchor links (if any are added in the future)
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// ============================================
// INTERACTIVE CARD EFFECTS
// ============================================

class CardEffects {
    constructor() {
        this.init();
    }

    init() {
        const cards = document.querySelectorAll('.project-card, .timeline-content');

        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.addGlowEffect(e.currentTarget);
            });

            card.addEventListener('mouseleave', (e) => {
                this.removeGlowEffect(e.currentTarget);
            });

            // Add subtle parallax effect on mouse move
            card.addEventListener('mousemove', (e) => {
                this.addParallaxEffect(e, card);
            });
        });
    }

    addGlowEffect(element) {
        element.style.transition = 'all 0.3s ease';
    }

    removeGlowEffect(element) {
        element.style.transform = '';
    }

    addParallaxEffect(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }
}

// ============================================
// TYPING EFFECT FOR TAGLINE (Optional Enhancement)
// ============================================

class TypingEffect {
    constructor(element, text, speed = 50) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.currentIndex = 0;
    }

    type() {
        if (this.currentIndex < this.text.length) {
            this.element.textContent += this.text.charAt(this.currentIndex);
            this.currentIndex++;
            setTimeout(() => this.type(), this.speed);
        }
    }

    start() {
        this.element.textContent = '';
        this.type();
    }
}

// ============================================
// PROJECT LINK CLICK TRACKING (Optional)
// ============================================

class LinkTracker {
    constructor() {
        this.init();
    }

    init() {
        const projectLinks = document.querySelectorAll('.project-link:not(.disabled)');

        projectLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const projectName = e.currentTarget.closest('.project-card').querySelector('h3').textContent;
                console.log(`Project link clicked: ${projectName}`);

                // Add a subtle click animation
                e.currentTarget.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    e.currentTarget.style.transform = '';
                }, 150);
            });
        });
    }
}

// ============================================
// EASTER EGG: KONAMI CODE
// ============================================

class KonamiCode {
    constructor() {
        this.pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        this.current = 0;
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => {
            if (e.key === this.pattern[this.current]) {
                this.current++;
                if (this.current === this.pattern.length) {
                    this.activate();
                    this.current = 0;
                }
            } else {
                this.current = 0;
            }
        });
    }

    activate() {
        // Create confetti effect
        this.createConfetti();
        console.log('🎉 You found the secret! Keep coding, Mradul!');
    }

    createConfetti() {
        const colors = ['#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#3b82f6'];
        const confettiCount = 50;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.transition = 'all 3s ease-out';

            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.style.top = window.innerHeight + 'px';
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                confetti.style.opacity = '0';
            }, 10);

            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images if any are added in the future
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize typewriter animation
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const nameText = nameElement.textContent.trim();
        const typewriter = new Typewriter(nameElement, nameText, 150);
        typewriter.init();
    }

    // Initialize all other modules
    new ThemeManager();
    new AnimationObserver();
    new SmoothScroll();
    new CardEffects();
    new LinkTracker();
    new KonamiCode();
    new PerformanceOptimizer();

    // Optional: Add typing effect to tagline
    // const tagline = document.querySelector('.tagline');
    // const originalText = tagline.textContent;
    // const typingEffect = new TypingEffect(tagline, originalText, 50);
    // typingEffect.start();

    console.log('%c👋 Welcome to Mradul\'s Profile!', 'font-size: 20px; font-weight: bold; color: #8b5cf6;');
    console.log('%c🚀 Built with vanilla HTML, CSS, and JavaScript', 'font-size: 14px; color: #6b7280;');
    console.log('%cTry the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A', 'font-size: 12px; color: #9ca3af; font-style: italic;');
});

// ============================================
// TYPEWRITER CLASS
// ============================================

class Typewriter {
    constructor(element, text, speed = 150) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.currentIndex = 0;
        this.cursorVisible = true;
    }

    init() {
        // Store original text and clear element
        this.originalText = this.element.textContent;
        this.element.textContent = '';

        // Add cursor
        this.cursor = document.createElement('span');
        this.cursor.className = 'typewriter-cursor';
        this.cursor.textContent = '|';
        this.element.appendChild(this.cursor);

        // Start typing after a short delay
        setTimeout(() => this.type(), 800);
    }

    type() {
        if (this.currentIndex < this.text.length) {
            // Add next character before cursor
            const char = this.text.charAt(this.currentIndex);
            const textNode = document.createTextNode(char);
            this.element.insertBefore(textNode, this.cursor);
            this.currentIndex++;

            // Continue typing
            setTimeout(() => this.type(), this.speed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                if (this.cursor && this.cursor.parentNode) {
                    this.cursor.remove();
                }
            }, 1000);
        }
    }
}

// ============================================
// PAGE VISIBILITY API
// ============================================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = 'Come back! 👋 - Mradul';
    } else {
        document.title = 'Mradul - Developer Portfolio';
    }
});

// ============================================
// EXPORT FOR POTENTIAL MODULE USE
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeManager,
        AnimationObserver,
        CardEffects
    };
}
