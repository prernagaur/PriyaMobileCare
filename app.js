// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const whatsappButton = document.getElementById('whatsappButton');
    const currentYearSpan = document.getElementById('currentYear');

    // Set current year in footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Mobile menu toggle functionality
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on nav links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!navMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }

    // WhatsApp button visibility based on touch device detection
    if (whatsappButton) {
        // Show WhatsApp button on touch devices or after a delay
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            whatsappButton.style.display = 'flex';
        } else {
            // Show after 3 seconds on non-touch devices
            setTimeout(() => {
                whatsappButton.style.display = 'flex';
            }, 3000);
        }
    }

    // Smooth scrolling for internal links (backup for CSS scroll-behavior)
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active state to navigation based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinksForScroll = document.querySelectorAll('.nav-link[href^="#"]');

    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100; // Offset for header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksForScroll.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }

    // Add scroll event listener for active nav highlighting
    window.addEventListener('scroll', updateActiveNavLink);

    // Call once on load
    updateActiveNavLink();

    // Add click tracking for Call Now buttons (optional analytics)
    const callButtons = document.querySelectorAll('a[href^="tel:"]');
    callButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Optional: Add analytics tracking here
            console.log('Call button clicked:', this.href);
        });
    });

    // Add click tracking for WhatsApp button
    if (whatsappButton) {
        whatsappButton.addEventListener('click', function () {
            // Optional: Add analytics tracking here
            console.log('WhatsApp button clicked');
        });
    }

    // Form submission handling (if forms are added later)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            // Add form validation or processing here if needed
            console.log('Form submitted:', form);
        });
    });

    // Add intersection observer for animations (optional enhancement)
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe service cards and other important elements
        const observeElements = document.querySelectorAll('.card, .hero-content, .about-text');
        observeElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Handle email clicks
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function () {
            console.log('Email link clicked:', this.href);
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function (e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        // Close mobile menu on resize to larger screen
        if (window.innerWidth > 768) {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }
    });

    // Add loading state management
    window.addEventListener('load', function () {
        // Remove any loading classes or add loaded class
        document.body.classList.add('loaded');

        // Optional: Add any post-load animations or functionality
        console.log('Website fully loaded');
    });

    // Add error handling for external resources
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        iframe.addEventListener('error', function () {
            console.log('Map failed to load');
            // Could show fallback content here
        });
    });

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Use debounced scroll handler for better performance
    const debouncedScrollHandler = debounce(updateActiveNavLink, 10);
    window.removeEventListener('scroll', updateActiveNavLink);
    window.addEventListener('scroll', debouncedScrollHandler);


    const services = {
        pan: {
            title: "💳 PAN Card Application & Updates",
            docs: ["Aadhaar Card", "2 Passport Size Photos", "Address Proof"]
        },
        voter: {
            title: "🗳️ Voter ID Card Services",
            docs: ["Aadhaar Card", "Date of Birth Proof", "Passport Size Photo"]
        },
        passport: {
            title: "🌐 Passport Application",
            docs: ["Aadhaar Card", "Birth Certificate", "Residence Proof", "Photos"]
        },
        labour: {
            title: "💼 Labour Registration & Employment Services",
            docs: ["Aadhaar Card", "Employer Details", "Passport Size Photo"]
        },
        caste: {
            title: "📄 Income, Caste (SC/ST/OBC), and Domicile Certificates",
            docs: ["Aadhaar Card/Pan Card", "ITR/Salary Slip (if applicable)", "For caste 1985 Record (Khasra Khatoni)", "Residence 15 Year Proof for Domicile", "Caste Proof (if applicable)", "Passport Size Photo"]
        },
        ayushman: {
            title: "🏥 Ayushman Card Services",
            docs: ["Aadhaar Card", "Family Ration Card", "Passport Size Photo"]
        },
        marriage: {
            title: "💍 Marriage Registration Assistance",
            docs: ["Aadhaar of Bride & Groom","Residential Proof Bill/Ayushman Card/Domicile ", "Age Proof Aadhar/Pan Card/Voter Id", "Marriage Photos", "Witness IDs"]
        },
        udyam: {
            title: "🏢 UDYAM (MSME) Registration",
            docs: ["Aadhaar Card", "Business Proof", "Bank Details"]
        },
        scholarship: {
            title: "🎓 Scholarship Forms For Students (10th/12th/UG/PG)",
            docs: ["Aadhaar Card", "Previous Exam Marksheet", "Bank Passbook Copy", "Passport Size Photo"]
        },
        jobs: {
            title: "📝 All Govt. & Private Job Application Forms",
            docs: ["Aadhaar Card", "Qualification Certificates", "Resume / CV", "Passport Size Photo"]
        },
        bill: {
            title: "💳 Online Bill Payments & Mobile Recharge",
            docs: ["Mobile Number / Consumer Number", "Payment Method (UPI/Bank)"]
        },
        pension: {
            title: "👵 Pension Scheme Application for Senior Citizens",
            docs: ["Aadhaar Card", "Age Proof", "Bank Passbook Copy", "Passport Size Photo"]
        },
        widow: {
            title: "🕊️ Widow Pension & Assistance Services",
            docs: ["Widow Certificate", "Aadhaar Card", "Bank Passbook Copy", "Passport Size Photo"]
        },
        disability: {
            title: "♿ Disability Pension Registration & Guidance",
            docs: ["Disability Certificate", "UDID Card", "Aadhaar Card", "Bank Passbook Copy", "Passport Size Photo"]
        }
    };

    const modal = document.getElementById("serviceModal");
    const serviceTitle = document.getElementById("serviceTitle");
    const serviceDocs = document.getElementById("serviceDocs");
    const closeBtn = document.querySelector(".close-btn");

    // Service click event
    document.querySelectorAll(".service-item").forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            let serviceKey = item.getAttribute("data-service");
            if (services[serviceKey]) {
                serviceTitle.innerText = services[serviceKey].title;
                serviceDocs.innerHTML = services[serviceKey].docs.map(doc => `<li>${doc}</li>`).join("");
                modal.style.display = "flex";
            }
        });
    });

    // Close modal
    closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }


});
