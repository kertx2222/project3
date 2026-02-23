document.addEventListener('DOMContentLoaded', function () {

    document.addEventListener('formValid', function (event) {
        const formData = event.detail;

        console.clear();

        console.log('%c JapanTrip — Новая заявка', 'font-size: 20px; font-weight: bold; color: #db2828;');
        console.log('─'.repeat(50), 'color: gray;');
        console.log('%c ФИО:', 'font-weight: bold;', formData.fullname);
        console.log('%c Email:', 'font-weight: bold;', formData.email);
        console.log('%c Телефон:', 'font-weight: bold;', formData.phone);
        console.log('%c Тема:', 'font-weight: bold;', formData.topic);
        console.log('%c Сообщение:', 'font-weight: bold;', formData.message);
        console.log('%c Согласие:', 'font-weight: bold;', formData.agreement ? 'Да' : 'Нет');
        console.log('─'.repeat(50), 'color: gray;');

        const timestamp = new Date().toLocaleString('ru-RU');
        console.log('%c Время отправки:', 'font-weight: bold;', timestamp);
    });
});