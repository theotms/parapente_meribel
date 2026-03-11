(function initLightbox() {
    const triggers = document.querySelectorAll('[data-lightbox]');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeButton = lightbox ? lightbox.querySelector('.lightbox-close') : null;
    let currentIndex = -1;

    if (!triggers.length || !lightbox || !lightboxImage || !lightboxCaption || !closeButton) {
        return;
    }

    const prevButton = document.createElement('button');
    prevButton.type = 'button';
    prevButton.className = 'lightbox-nav lightbox-prev';
    prevButton.setAttribute('aria-label', 'Image précédente');
    prevButton.textContent = '‹';

    const nextButton = document.createElement('button');
    nextButton.type = 'button';
    nextButton.className = 'lightbox-nav lightbox-next';
    nextButton.setAttribute('aria-label', 'Image suivante');
    nextButton.textContent = '›';

    lightbox.appendChild(prevButton);
    lightbox.appendChild(nextButton);

    function renderByIndex(index) {
        const count = triggers.length;
        if (!count) {
            return;
        }

        currentIndex = (index + count) % count;
        const image = triggers[currentIndex];
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt || '';
        lightboxCaption.textContent = image.alt || '';
    }

    function openLightbox(index) {
        renderByIndex(index);
        lightbox.style.display = 'flex';
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        currentIndex = -1;
    }

    function showPrevious() {
        if (currentIndex === -1) {
            return;
        }
        renderByIndex(currentIndex - 1);
    }

    function showNext() {
        if (currentIndex === -1) {
            return;
        }
        renderByIndex(currentIndex + 1);
    }

    if (triggers.length < 2) {
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
    }

    triggers.forEach(function (image, index) {
        image.addEventListener('click', function () {
            openLightbox(index);
        });
    });

    closeButton.addEventListener('click', closeLightbox);
    prevButton.addEventListener('click', function (event) {
        event.stopPropagation();
        showPrevious();
    });
    nextButton.addEventListener('click', function (event) {
        event.stopPropagation();
        showNext();
    });

    lightbox.addEventListener('click', function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function (event) {
        const isOpen = lightbox.getAttribute('aria-hidden') === 'false';
        if (!isOpen) {
            return;
        }

        if (event.key === 'Escape') {
            closeLightbox();
        } else if (event.key === 'ArrowLeft') {
            showPrevious();
        } else if (event.key === 'ArrowRight') {
            showNext();
        }
    });
})();
