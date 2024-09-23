import {isMobile} from "./service/isMobile.js";
import {removeClasses} from "./service/removeClasses.js";
import {spollers,menuInit} from './service/functions.js';
import 'swiper/css'
import Swiper from "swiper";
import {Navigation, Pagination} from "swiper/modules";

const header = document.querySelector('header');

window.onload = function () {
    menuInit();
    spollers();
    document.addEventListener('click', documentActions);
    window.addEventListener('scroll', pageScrolled);

    function pageScrolled(e) {
        if (window.scrollY > 40) { // Если прокрутили более чем на 50px
            header.classList.add('header-scrolled'); // Добавляем класс
        } else {
            header.classList.remove('header-scrolled'); // Убираем класс
        }
    }
    function documentActions(e) {
        const targetElement = e.target;
        if (window.innerWidth > 768 && isMobile.any()) {
            if (targetElement.classList.contains('menu__arrow_icon')) {
                targetElement.closest('.menu__item').classList.toggle('_hover');
            }
            if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
                removeClasses(document.querySelectorAll('.menu__item._hover'), '_hover')
            }
        }

        if (targetElement.classList.contains('search-form__icon_svg')) {
            document.querySelector('.search-form').classList.toggle('_active');
        } else if (!targetElement.closest('search-form') && !document.querySelector('search-form._active')) {
            document.querySelector('.search-form').classList.remove('_active');
        }
    }
}

if (document.querySelector('.slider-main__body')) {
    const swiper = new Swiper('.slider-main__body', {
        modules: [Navigation, Pagination],
        loop: true,
        direction: "horizontal",
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 32,
        watchOverflow: true,
        speed:800,
        parallax: true,
        pagination: {
            el: '.controls-slider-main__dotts',
            clickable: true
        },
        navigation:{
            nextEl: '.controls-slider-main .slider-arrow-next',
            prevEl:'.controls-slider-main .slider-arrow-prev'
        }
    });
}