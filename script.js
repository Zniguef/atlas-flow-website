// Initialize Lucide Icons
if (window.lucide) {
    lucide.createIcons();
}

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        if (icon) {
            if (mobileMenu.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            if (window.lucide) lucide.createIcons();
        }
    });

    // Close mobile menu on click
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                if (window.lucide) lucide.createIcons();
            }
        });
    });
}

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

if (reveals.length > 0) {
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
}

// Active Link Highlighting for Main Navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        if (current) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href && (href.includes(`#${current}`) || href === `#${current}`)) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Legal Table of Contents (TOC) Active Link on Scroll
const legalArticles = document.querySelectorAll('.legal-card[id]');
const tocLinks = document.querySelectorAll('.legal-toc-link');

if (legalArticles.length > 0 && tocLinks.length > 0) {
    const updateActiveToc = () => {
        let currentId = '';
        legalArticles.forEach(article => {
            const top = article.offsetTop;
            if (window.pageYOffset >= (top - 140)) {
                currentId = article.getAttribute('id');
            }
        });

        tocLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveToc);
    updateActiveToc();
}

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

// Form Submission Simulation -> Google Sheets Integration
const leadForm = document.getElementById('lead-form');
const successMessage = document.getElementById('form-success-message');
const submitBtn = document.getElementById('btn-submit-form');
const successUser = document.getElementById('success-user-name');
const successPhone = document.getElementById('success-user-phone');
const resetBtn = document.getElementById('btn-success-reset');


const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxkYn-mJbCiA8elrJAxcYIbwJSrUJjL5ZepQcEN0iH_8JyWuYhHmSVP995mfQh8xGTZ/exec';

if (leadForm) {
    leadForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Clear previous errors
        document.querySelectorAll('.error-text').forEach(el => el.remove());
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

        // Get values
        const nameVal = document.getElementById('client-name').value.trim();
        const phoneVal = document.getElementById('client-phone').value.trim();
        const companyVal = document.getElementById('client-company').value.trim();
        const planVal = document.getElementById('client-plan').value;

        // Validation
        let isValid = true;
        const showError = (inputId, message) => {
            const inputEl = document.getElementById(inputId);
            let wrapper = inputEl.closest('.input-wrapper');
            if (!wrapper && inputId === 'client-plan') {
                wrapper = document.getElementById('custom-select-trigger');
            }
            if (wrapper) {
                wrapper.classList.add('error');
                const errorEl = document.createElement('div');
                errorEl.className = 'error-text';
                errorEl.innerHTML = `<i data-lucide="alert-circle"></i> <span>${message}</span>`;
                wrapper.parentNode.appendChild(errorEl);
                if (window.lucide) window.lucide.createIcons({ root: errorEl });
            }
            isValid = false;
        };

        if (nameVal.length < 2) {
            showError('client-name', 'Veuillez entrer un nom valide.');
        }

        const phoneRegex = /^(0|\+212)[567]\d{8}$/;
        if (!phoneRegex.test(phoneVal.replace(/[\s.-]+/g, ''))) {
            showError('client-phone', 'Format invalide. Ex: 0612345678');
        }

        if (companyVal.length < 2) {
            showError('client-company', 'Veuillez entrer votre entreprise.');
        }

        if (!planVal) {
            showError('client-plan', 'Veuillez sélectionner une formule.');
        }

        if (!isValid) {
            return;
        }

        // Visual loading feedback
        if (submitBtn) {
            submitBtn.disabled = true;
            const btnText = submitBtn.querySelector('span');
            if (btnText) btnText.textContent = "Traitement en cours...";
        }

        try {
            // Create form data
            const formData = new FormData();
            formData.append('name', nameVal);
            formData.append('phone', phoneVal);
            formData.append('company', companyVal);
            formData.append('plan', planVal);

            // Send to Google Sheets
            if (GOOGLE_SCRIPT_URL !== 'VOTRE_URL_GOOGLE_APPS_SCRIPT_ICI') {
                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    body: formData
                });

                // Note: fetch with no-cors mode doesn't allow reading response.ok easily, 
                // but standard App Script deployment allows standard fetch.
                const result = await response.json();
                if (result.result !== 'success') {
                    throw new Error('Erreur API Google');
                }
            } else {
                // Simulation if URL is not set (for testing purposes before you set the URL)
                await new Promise(resolve => setTimeout(resolve, 1200));
                console.warn("L'URL Google Apps Script n'est pas configurée. Simulation d'envoi.");
            }

            // Populate success text
            if (successUser) successUser.textContent = nameVal;
            if (successPhone) successPhone.textContent = phoneVal;

            // Toggle views
            leadForm.style.display = 'none';
            if (successMessage) {
                successMessage.style.display = 'flex';
            }
        } catch (error) {
            console.error('Error!', error.message);
            alert("Une erreur s'est produite lors de l'envoi. Veuillez réessayer.");

            // Reset button on error
            if (submitBtn) {
                submitBtn.disabled = false;
                const btnText = submitBtn.querySelector('span');
                if (btnText) btnText.textContent = "Activer mon espace";
            }
        }
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
