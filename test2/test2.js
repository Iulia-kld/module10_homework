//Задание 2.
//Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert.

const btn = document.querySelector('.j-btn');

btn.addEventListener('click', () => {
    alert(`Ширина экрана: ${window.screen.width}\nВысота экрана: ${window.screen.height}`);
});