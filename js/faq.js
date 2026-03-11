(function initFAQ() {
    const items = document.querySelectorAll('.faq-item');
    if (!items.length) {
        return;
    }

    items.forEach(function (item) {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');

        if (!question || !answer || !toggle) {
            return;
        }

        question.addEventListener('click', function () {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            question.setAttribute('aria-expanded', String(!isExpanded));
            item.classList.toggle('active', !isExpanded);
            toggle.textContent = isExpanded ? '+' : '−';

            if (isExpanded) {
                answer.style.maxHeight = null;
                answer.hidden = true;
            } else {
                answer.hidden = false;
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
})();
