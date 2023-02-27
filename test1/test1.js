//Задание 1.
//Сверстайте кнопку, которая будет содержать в себе icon_01 
//(как в примере в последнем видео). При клике на кнопку иконка должна меняться на icon_02. 
//Повторный клик меняет иконку обратно.


const btn = document.querySelector('.j-btn');
const svg1 = document.querySelector('.icon_1');
const svg2 = document.querySelector('.icon_2');

svg1.style.display = 'block';
svg2.style.display = 'none';

btn.addEventListener('click', () => {
    if(svg1.style.display == 'none') {
        svg1.style.display = 'block';
        svg2.style.display = 'none';
    } else {
        svg1.style.display = 'none';
        svg2.style.display = 'block';
    }
}
);