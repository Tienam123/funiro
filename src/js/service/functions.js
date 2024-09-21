
export function spollers() {
    const spollersArray = document.querySelectorAll('[data-spollers]');
    if (spollersArray.length > 0) {
        //Получение обычных спойлеров
        const spollersRegular = Array.from(spollersArray).filter((item, index, self) => !item.dataset.spollers.split(",")[0])
        if (spollersRegular.length > 0) {
            initSpollers(spollersRegular)
        }
        const spollersMedia = Array.from(spollersArray).filter((item, index, self) => item.dataset.spollers.split(",")[0])
        if (spollersMedia.length > 0) {
            const breakPointsArray = [];
            spollersMedia.forEach(item => {
                const params = item.dataset.spollers;
                const breakpoint = {};
                const paramsArray = params.split(",");
                breakpoint.value = paramsArray[0];
                breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                breakpoint.item = item;
                breakPointsArray.push(breakpoint);
            })
            //Получаем уникальные брейкпоинты
            let mediaQueries = breakPointsArray.map((item) => '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type);
            mediaQueries.filter((item, index, self) => self.indexOf(item) === index);

            // Работаем с каждым брейкпоинтом
            mediaQueries.forEach(breakpoint => {
                const paramsArray = breakpoint.split(",");
                const mediaBreakpoint = paramsArray[1];
                const mediaType = paramsArray[2];
                const mathMedia = window.matchMedia(paramsArray[0]);

                // Обьекты с нужными условиями
                const spollersArray = breakPointsArray.filter((item) => {
                    if (item.value === mediaBreakpoint && item.type === mediaType) {
                        return true;
                    }
                })

                //Событие
                mathMedia.addListener(function () {
                    initSpollers(spollersArray, mathMedia);
                })
                initSpollers(spollersArray, mathMedia);
            });
        }

        function initSpollers(spollersArray, matchMedia = false) {
            spollersArray.forEach(spollersBlock => {
                spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;

                if (matchMedia.matches || !matchMedia) {
                    spollersBlock.classList.add('_init');
                    initSpollersBody(spollersBlock);
                    spollersBlock.addEventListener('click', setSpollerAction)
                } else {
                    spollersBlock.classList.remove('_init');
                    initSpollersBody(spollersBlock, false);
                    spollersBlock.removeEventListener('click', setSpollerAction);
                }
            })
        }

        function initSpollersBody(spollersBlock, hideSpollerBody = true) {
            const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
            if (spollerTitles.length > 0) {
                spollerTitles.forEach(spollerTitle => {
                    if (hideSpollerBody) {
                        spollerTitle.removeAttribute('tabindex');
                        if (!spollerTitle.classList.contains('_active')) {
                            spollerTitle.nextElementSibling.hidden = true;
                        }
                    } else {
                        spollerTitle.setAttribute('tabindex', '-1');
                        spollerTitle.nextElementSibling.hidden = false;
                    }
                })
            }
        }

        function setSpollerAction(e) {
            const el = e.target;
            if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
                const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
                const spollersBlock = spollerTitle.closest('[data-spollers]');
                const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
                if (!spollersBlock.querySelectorAll('._slide').length) {
                    if (oneSpoller && !spollerTitle.classList.contains('_active')) {
                        hideSpollersBody(spollersBlock);
                    }
                    spollerTitle.classList.toggle('_active');
                    _slideToggle(spollerTitle.nextElementSibling, 500);
                }
                e.preventDefault();
            }
        }

        function hideSpollersBody(spollersBlock) {
            const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
            if (spollerActiveTitle) {
                spollerActiveTitle.classList.remove('_active');
                _slideUp(spollerActiveTitle.nextElementSibling, 500);
            }
        }
    }
}
export let _slideUp = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.hidden = true;
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration)
    }
}
export let _slideDown = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        if (target.hidden) {
            target.hidden = false;
        }
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
}
export let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _slideDown(target, duration);
    } else {
        return _slideUp(target, duration);
    }
}

export function menuInit() {
    if (document.querySelector(".icon-menu")) {
        document.addEventListener("click", function (e) {
            if (bodyLockStatus && e.target.closest('.icon-menu')) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        });
    }
    ;
}

export function menuOpen() {
    bodyLock();
    document.documentElement.classList.add("menu-open");
}

export function menuClose() {
    bodyUnlock();
    document.documentElement.classList.remove("menu-open");
}

export let bodyLockStatus = true;
export let bodyLockToggle = (delay = 500) => {
    if (document.documentElement.classList.contains('lock')) {
        bodyUnlock(delay);
    } else {
        bodyLock(delay);
    }
}
export let bodyLock = (delay = 500) => {
    let body = document.querySelector("body");
    if (bodyLockStatus) {
        let lock_padding = document.querySelectorAll("[data-lp]");
        for (let index = 0; index < lock_padding.length; index++) {
            const el = lock_padding[index];
            el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        }
        body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        document.documentElement.classList.add("lock");

        bodyLockStatus = false;
        setTimeout(function () {
            bodyLockStatus = true;
        }, delay);
    }
}

export let bodyUnlock = (delay = 500) => {
    let body = document.querySelector("body");
    if (bodyLockStatus) {
        let lock_padding = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = '0px';
            }
            body.style.paddingRight = '0px';
            document.documentElement.classList.remove("lock");
        }, delay);
        bodyLockStatus = false;
        setTimeout(function () {
            bodyLockStatus = true;
        }, delay);
    }
}