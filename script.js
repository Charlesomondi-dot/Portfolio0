// ========================================
// MOBILE MENU FUNCTIONALITY
// ========================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Reset menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ========================================
// SMOOTH SCROLL BEHAVIOR
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// SCROLL ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all project cards, skill categories, and contact cards
document.querySelectorAll('.project-card, .skill-category, .contact-card, .about-content, .service-card, .achievement-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// STATS COUNTER ANIMATION
// ========================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Observe stats section for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ========================================
// ACTIVE NAV LINK
// ========================================

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========================================
// ACTIVE NAV LINK STYLING
// ========================================

// Add CSS for active nav link styling
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-link.active {
        color: var(--primary-color);
        border-bottom: 2px solid var(--primary-color);
        padding-bottom: 5px;
    }
`;
document.head.appendChild(navStyle);

// ========================================
// CONTACT FORM HANDLING (if needed)
// ========================================

// You can add form handling here if you add a contact form
// For now, links are set up to open email and WhatsApp

// ========================================
// PDF VIEWER FALLBACK
// ========================================

// If PDF embedding doesn't work in some browsers, provide download links
document.addEventListener('DOMContentLoaded', () => {
    const pdfViewers = document.querySelectorAll('.pdf-viewer');
    pdfViewers.forEach(viewer => {
        const embed = viewer.querySelector('embed');
        if (embed && !embed.offsetHeight) {
            // PDF didn't load, create fallback
            const fallback = document.createElement('div');
            fallback.style.cssText = `
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 600px;
                background: #f5f5f5;
                color: #666;
                font-size: 1.1rem;
            `;
            fallback.innerHTML = `
                <i class="fas fa-file-pdf" style="font-size: 3rem; margin-bottom: 20px;"></i>
                <p>PDF Viewer not available</p>
                <p style="font-size: 0.9rem;">Please contact for direct access</p>
            `;
            viewer.replaceWith(fallback);
        }
    });
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Lazy load images if needed
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ========================================
// PDF MODAL VIEWER
// ========================================

function openCVModal() {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    viewer.setAttribute('data', 'Assets/Documents/CHARLES OMONDI cv.pdf');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function openTestimonialModal() {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    viewer.setAttribute('data', 'Assets/Documents/Testimonial STJTTID.pdf');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    modal.style.display = 'none';
    viewer.setAttribute('data', '');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('pdfModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// ========================================
// WHATSAPP FORM FUNCTIONALITY
// ========================================

function openWhatsAppForm() {
    const modal = document.getElementById('whatsappModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeWhatsAppForm() {
    const modal = document.getElementById('whatsappModal');
    modal.style.display = 'none';
    document.getElementById('whatsappForm').reset();
    document.body.style.overflow = 'auto';
}

// Handle WhatsApp form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('whatsappForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('clientName').value;
            const email = document.getElementById('clientEmail').value;
            const service = document.getElementById('serviceType').value;
            const message = document.getElementById('clientMessage').value;
            
            // Create WhatsApp message
            const whatsappMessage = `Hello, I'm ${name} (${email})\n\nI'm interested in: ${service}\n\n${message ? 'Details: ' + message : 'Please get back to me with more information.'}\n\nThank you!`;
            
            // Encode message for WhatsApp
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/254719501832?text=${encodedMessage}`;
            
            // Open WhatsApp
            window.open(whatsappURL, '_blank');
            
            // Close modal and reset form
            closeWhatsAppForm();
        });
    }
});

// Close WhatsApp modal when clicking outside
window.addEventListener('click', function(event) {
    const whatsappModal = document.getElementById('whatsappModal');
    if (event.target === whatsappModal) {
        closeWhatsAppForm();
    }
});

// Close on Escape key for WhatsApp form
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeWhatsAppForm();
    }
});

console.log('Portfolio site loaded successfully!');
