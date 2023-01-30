// Menu burger
const iconMenu = document.querySelector('.burger__menu');       // выбираем нашу иконку меню
if (iconMenu) {     // проверяем существует ли такой объект
    const menuBody = document.querySelector('.menu__body');       // выбираем наше меню
    const headerNav = document.querySelector('.header__nav')
    iconMenu.addEventListener("click", function () {    // событие "клик" по иконке
        iconMenu.classList.toggle('active');                        // добавляем/удаляем класс
        menuBody.classList.toggle('active');                        // добавляем/удаляем класс
        document.body.classList.toggle('lock');                     // добавляем/удаляем класс для body
        headerNav.classList.toggle('lock');                         // добавляем/удаляем класс для header
    });
}


// Slider
let DELAY = 500;                // время анимации
let DELAY_SHOW = 600;           // время анимации - для показа opacity
let CURRENT_SLIDE = 1;          // текущий слайд
let ANIMATION_DELAY = 5000;     // задержка между слайдами

let slider = document.querySelector('.slider');    // получаем объект slider

slider.addEventListener('click', function (event) {    // вешаем событие клика на данный элемент
    // проверяем был ли клик по иконке слайдера
    if (!event.target.classList.contains('slider__icon')) return;    // если элемент не содержит нужный класс, то ничего не делаем

    //  если клик был по иконке, то...
    CURRENT_SLIDE = parseInt(event.target.getAttribute('data-id'));      // получаем атрибут data-id иконки, по которой был клик
    showSliderId(CURRENT_SLIDE);    // вызываем функцию дял показа соответствующего слайда
});

// Функция показа слайдера
function showSliderId(id) {
    let current = slider.querySelector('[data-slide="' + id + '"]');      // выбираем текущий слайд, который нужно показать

    // скрываем все остальные слайдеры
    slider.querySelectorAll('.slider__slide').forEach(function (slide) {    // querySelectorAll - получаем массив всех слайдеров. forEach - перебираем каждый слайд
        slide.style.opacity = 0;    // делаем невидимым
        setTimeout(function() {    // скрываем полностью с задержкой
            slide.classList.add('hide')
        }, DELAY);
    });

    // теперь показываем нужный слайд с такой же задержкой
    setTimeout(function() {
        current.classList.remove('hide');   // удаляем класс
    }, DELAY);
    setTimeout(function() {
        current.style.opacity = 1;    //  плавно отображаем с помощью opacity, которое имеет свойство transition
    }, DELAY_SHOW)
}

// Автоматический показ слайдеров
initSlider();       // инициализируем показ

//Функция показа слайдеров
function initSlider() {
    setInterval(function () {
        showSliderId(getSliderId());
    }, ANIMATION_DELAY)
}

// Функция получения слайда для показа
function getSliderId() {
    CURRENT_SLIDE = CURRENT_SLIDE + 1;    // берем нашу переменную слайда и увеличиваем ее на 1
    CURRENT_SLIDE = CURRENT_SLIDE % 4  === 0 ? 1 : CURRENT_SLIDE;    // (у нас 3 слайда) если достигнуто максимальное количество слайдов (текущий номер слайда делится на 4 и это равно 0), тогда мы задаем 1, иначе отображаем текущий слайд
    return CURRENT_SLIDE;   // возвращаем текущий слайд
}