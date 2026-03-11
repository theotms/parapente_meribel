function openLightbox(src, alt) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    if (!lightbox || !lightboxImage || !lightboxCaption) {
        return;
    }

    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightboxCaption.textContent = alt;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) {
        return;
    }
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
}

function closeLightboxOnBackdrop(event) {
    if (event.target && event.target.id === 'lightbox') {
        closeLightbox();
    }
}

function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const toggle = element.querySelector('.faq-toggle');

    if (!answer || !toggle) {
        return;
    }

    if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        toggle.textContent = '+';
        faqItem.classList.remove('active');
    } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        toggle.textContent = '−';
        faqItem.classList.add('active');
    }
}

function initMobileMenu() {
    const nav = document.querySelector('.site-nav');
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelectorAll('.site-nav a');

    if (!nav || !toggle) {
        return;
    }

    toggle.addEventListener('click', function () {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!isExpanded));
        nav.classList.toggle('open', !isExpanded);
    });

    links.forEach(function (link) {
        link.addEventListener('click', function () {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 800) {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

initMobileMenu();

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeLightbox();
    }
});
