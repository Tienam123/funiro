import {isMobile} from "./service/isMobile.js";
import {removeClasses} from "./service/removeClasses.js";


window.onload = function () {
    document.addEventListener('click', documentActions);

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