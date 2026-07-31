// Initialize Lucide Icons
lucide.createIcons();

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const icon = menuBtn.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.setAttribute('data-lucide', 'x');
    } else {
        icon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
});

// Close mobile menu on click
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuBtn.querySelector('i').setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    });
});

// Scroll Reveal Animation
const reveals = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
};

window.addEventListener('scroll', revealOnScroll);
// Initial check
revealOnScroll();

// Active Link Highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Dynamic Copyright Year
const yearElement = document.getElementById('current-year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Custom Select Elements
const selectWrapper = document.getElementById('custom-select-container');
const selectTrigger = document.getElementById('custom-select-trigger');
const selectDisplayText = document.getElementById('custom-select-display-text');
const customOptions = document.querySelectorAll('.custom-option');
const nativeSelect = document.getElementById('client-plan');

// Toggle Dropdown open/close
if (selectTrigger && selectWrapper) {
    selectTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        selectWrapper.classList.toggle('open');
    });
}

// Close Dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (selectWrapper && selectWrapper.classList.contains('open')) {
        if (!selectWrapper.contains(e.target)) {
            selectWrapper.classList.remove('open');
        }
    }
});

// Update value helper function
function updateSelectedValue(value) {
    if (!nativeSelect) return;
    
    nativeSelect.value = value;
    
    // Trigger change event
    const event = new Event('change');
    nativeSelect.dispatchEvent(event);

    // Update active CSS state & update trigger display text
    customOptions.forEach(opt => {
        if (opt.getAttribute('data-value') === value) {
            opt.classList.add('selected');
            
            // Set trigger display text
            const nameEl = opt.querySelector('.option-name');
            const priceEl = opt.querySelector('.option-price-tag');
            if (selectDisplayText && nameEl) {
                let displayText = nameEl.textContent.trim();
                if (priceEl) {
                    displayText += ` — ${priceEl.textContent.trim()}`;
                }
                selectDisplayText.textContent = displayText;
                selectDisplayText.style.color = 'var(--text)';
            }
        } else {
            opt.classList.remove('selected');
        }
    });
}

// Option selection click triggers
customOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.stopPropagation();
        const value = option.getAttribute('data-value');
        updateSelectedValue(value);
        if (selectWrapper) {
            selectWrapper.classList.remove('open');
        }
    });
});

// Plan Selector & Scroll handler
const planButtons = [
    { btnId: 'btn-free-trial', planValue: 'monthly-premium' }, // Maps trial banner to monthly-premium
    { btnId: 'btn-plan-monthly-basic', planValue: 'monthly-basic' },
    { btnId: 'btn-plan-monthly-premium', planValue: 'monthly-premium' },
    { btnId: 'btn-plan-onetime', planValue: 'onetime' },
    { btnId: 'btn-plan-annual', planValue: 'annual' }
];

const contactSection = document.getElementById('contact');

planButtons.forEach(item => {
    const btn = document.getElementById(item.btnId);
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Select the option in dropdown
            updateSelectedValue(item.planValue);
            
            // Smooth scroll to contact
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// Form Submission Simulation
const leadForm = document.getElementById('lead-form');
const successMessage = document.getElementById('form-success-message');
const submitBtn = document.getElementById('btn-submit-form');
const successUser = document.getElementById('success-user-name');
const successPhone = document.getElementById('success-user-phone');
const resetBtn = document.getElementById('btn-success-reset');

if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get values
        const nameVal = document.getElementById('client-name').value;
        const phoneVal = document.getElementById('client-phone').value;

        // Visual loading feedback
        if (submitBtn) {
            submitBtn.disabled = true;
            const btnText = submitBtn.querySelector('span');
            if (btnText) btnText.textContent = "Traitement en cours...";
        }

        // Simulate API call delay
        setTimeout(() => {
            // Populate success text
            if (successUser) successUser.textContent = nameVal;
            if (successPhone) successPhone.textContent = phoneVal;

            // Toggle views
            leadForm.style.display = 'none';
            if (successMessage) {
                successMessage.style.display = 'flex';
            }
        }, 1200);
    });
}

// Reset form trigger
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        if (leadForm) {
            leadForm.reset();
            leadForm.style.display = 'flex';
        }
        if (successMessage) {
            successMessage.style.display = 'none';
        }
        if (submitBtn) {
            submitBtn.disabled = false;
            const btnText = submitBtn.querySelector('span');
            if (btnText) btnText.textContent = "Activer mon espace";
        }
        // Reset custom dropdown display
        if (selectDisplayText) {
            selectDisplayText.textContent = "Choisir une formule...";
            selectDisplayText.style.color = '';
        }
        customOptions.forEach(opt => opt.classList.remove('selected'));
    });
}
