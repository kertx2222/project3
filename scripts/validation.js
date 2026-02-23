document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        document.querySelectorAll('.field.error').forEach(field => {
            field.classList.remove('error');
        });
        document.querySelectorAll('.ui.basic.red.pointing.label').forEach(label => {
            label.remove();
        });

        let isValid = true;

        const fullname = document.getElementById('fullname');
        const fullnameValue = fullname.value.trim();
        if (fullnameValue === '') {
            showError(fullname, 'Введите ваше имя');
            isValid = false;
        } else if (fullnameValue.split(' ').length < 2) {
            showError(fullname, 'Введите фамилию и имя');
            isValid = false;
        }

        const email = document.getElementById('email');
        const emailValue = email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailValue === '') {
            showError(email, 'Введите email');
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
            showError(email, 'Введите корректный email');
            isValid = false;
        }

        const phone = document.getElementById('phone');
        const phoneValue = phone.value.trim();
        const phoneDigits = phoneValue.replace(/\D/g, '');
        if (phoneValue === '') {
            showError(phone, 'Введите номер телефона');
            isValid = false;
        } else if (phoneDigits.length < 10) {
            showError(phone, 'Введите минимум 10 цифр');
            isValid = false;
        }

        const agreement = document.getElementById('agreement');
        if (!agreement.checked) {
            showError(agreement, 'Необходимо согласие на обработку данных');
            isValid = false;
        }

        if (isValid) {
            const formData = {
                fullname: fullnameValue,
                email: emailValue,
                phone: phoneValue,
                topic: document.getElementById('topic').value || '(не выбрано)',
                message: document.getElementById('message').value.trim() || '(не заполнено)',
                agreement: agreement.checked
            };

            const event = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(event);

            alert('Форма отправлена! Данные в консоли.');
            
            form.reset();
        }
    });

    function showError(input, message) {
        const field = input.closest('.field');
        if (field) {
            field.classList.add('error');
            
            if (!field.querySelector('.ui.basic.red.pointing.label')) {
                const label = document.createElement('div');
                label.className = 'ui basic red pointing label';
                label.textContent = message;
                field.appendChild(label);
            }
        }
    }

    document.querySelectorAll('#feedbackForm input, #feedbackForm textarea, #feedbackForm select').forEach(input => {
        input.addEventListener('input', function() {
            const field = this.closest('.field');
            if (field && field.classList.contains('error')) {
                field.classList.remove('error');
                const label = field.querySelector('.ui.basic.red.pointing.label');
                if (label) label.remove();
            }
        });
    });
});