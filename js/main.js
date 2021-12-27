document.addEventListener('DOMContentLoaded', function () {
  // Объявляем переменную для body
  const activeBodyEL = document.querySelector('.js-body');
  // Объявляем переменную для кнопки бургер меню
  const mobileMenuBtnEL = document.querySelector('.js-mobile-menu-btn');
  // Объявляем переменную для мобильного меню навигации
  const navMenuEL = document.querySelector('.js-nav-menu');
  // Объявляем переменные для элементов меню навигации
  const navLinkEL = document.querySelectorAll('.js-nav-link');
  // Объявляем переменную для мобильной формы поиска
  const searchFormEL = document.querySelector('.js-mobile-search');
  // Объявляем переменную для кнопки поиска
  const mobileSearchBtnEL = document.querySelector('.js-mobile-search-btn');
  // Объявляем переменную для кнопки раскрытия списка в header
  const tabBtnArtEL = document.querySelectorAll('.js-tab-btn-art');
  // Объявляем переменную для выпадающего списка в header
  const listArtistEL = document.querySelectorAll('.js-js-list-artist');
  // Объявляем переменную для слайдера в секции hero
  const sliderHeroEL = document.querySelector('.js-slider-hero');
  // Объявляем переменную для слайдеров в секции gallery
  const sliderGalleryPaintingEL = document.querySelector('.js-slider-gallery-painting');
  const sliderGalleryDrawingEL = document.querySelector('.js-slider-gallery-drawing');
  const sliderGallerySculptureEL = document.querySelector('.js-slider-gallery-sculpture');
  const sliderGalleryEL = document.querySelectorAll('.js-slider-gallery');
  // объявляем переменную для select в галереи
  const selectArtEL = document.querySelector('.js-select-art');
  // Объявляем переменную для слайдов (кнопка открытия модального окна)
  const gallerySlideBtnEL = document.querySelectorAll('.js-gallery-slide-btn');
  // Объявляем переменную для оверлея
  const modalOverlayGalleryEL = document.querySelector('.js-modal-overlay-gallery');
  // Объявляем переменную для модального окна
  const modalSliderEl = document.querySelectorAll('.js-modal-slider');
  // Объявляем переменную для кнопки закрытия модального окна в галереи
  const btnCloseModalGalleryEL = document.querySelectorAll('.js-btn-close-modal-gallery');
  // Объявляем переменную для кнопок пагинации слайдера в галереи
  const btnPaginationGallery = document.querySelectorAll('.js-gallery-pagination-btn');
  // Объявляем переменную для контейнеров слайдера
  const sliderGallery = document.querySelectorAll('.section-gallery__swiper-container');
  // Объявляем переменную для контейнера в секции галерея
  const galleryWrap = document.querySelector('.section-gallery__wrap');


  // Объявляем переменную для ширины видимой области экрана
  let intViewportWidth = window.innerWidth;


  // Проходим по всем элементам меню навигации
  navLinkEL.forEach(function (item) {
    // Выполняем проверку на ширину экрана и если она меньше, либо равна 1024px
    if (intViewportWidth < 1025) {
      // Присваиваем элементам меню навигации tabindex=-1
      item.setAttribute('tabindex', '-1');
    }
    // вызываем функцию onBtnMenuClick при клике по элементу навигации меню
    onBtnClick(item, 'menu-open', 'Открыть меню навигации', 'Закрыть меню навигации', addTabindex);
  });

  // Объявляем функцию addTabindex
  function addTabindex(item) {
    // Присваиваем переменной currentItem текущий элемент списка меню
    let currentItem = item;
    // Выполняем проверку есть ли у body класс menu-open
    if (!activeBodyEL.classList.contains('menu-open')) {
      // Если класс отсутствует присваиваем элементам списка меню tabindex = -1
      currentItem.setAttribute('tabindex', '-1');
    } else {
      // Если класс есть, то присваиваем tabindex = 0
      currentItem.setAttribute('tabindex', '0');
    }
  }

  // Объявляем функцию переключения значения aria-label
  function toggleAriaLabelValue(item, ariaValueOne, ariaValueTwo) {
    // выполняем проверку какое значение присвоено атрибуту aria-label
    if (item.getAttribute('aria-label') === ariaValueOne) {
      // если условие равно переключаем значение атрибута aria-label
      item.setAttribute('aria-label', ariaValueTwo);
    } else {
      // если условие не верно, то оставляем как есть
      item.setAttribute('aria-label', ariaValueOne);
    }
  }

  // Обявляем функцию для обработки события click по кнопкам бургер меню, мобильному
  // поиску или элементу навигации
  function onBtnClick(item, classValue, ariaValueOne, ariaValueTwo, functionName, popup, activeEl) {
    // Вызываем click по кнопкам бургер меню,
    // мобильному поиску или элементу навигации
    item.addEventListener('click', function () {
      // item.stopPropagation();
      // При каждом событии click на body переключаем
      // класс который передается через аргумент classValue
      activeBodyEL.classList.toggle(classValue);

      // Вызываем функцию переключения значения aria-label
      toggleAriaLabelValue(item, ariaValueOne, ariaValueTwo)

      // Вызываем функцию addTabindex на всех элементах списка меню
      navLinkEL.forEach(functionName);
    })

    closePopup(popup, item, activeEl, classValue);
  }

  function closePopup(popup, popupBtn, activeEl, classValue) {
    document.addEventListener('click', function (e) {
      const target = e.target;
      const its_menu = target === popup || popup.contains(target);
      const its_btnMenu = target === popupBtn;
      const menu_is_active = activeEl.classList.contains(classValue);

      if (!its_menu && !its_btnMenu && menu_is_active) {
        activeEl.classList.remove(classValue);
      }
    });
  }

  // Вызываем функцию onBtnClick по клику на бургер меню
  onBtnClick(mobileMenuBtnEL, 'menu-open', 'Открыть меню навигации', 'Закрыть меню навигации', addTabindex, navMenuEL, activeBodyEL);

  // Вызываем функцию onBtnClick по клику на мобильный поиск
  onBtnClick(mobileSearchBtnEL, 'search-open', 'Открыть поиск', 'Закрыть поиск', addTabindex, searchFormEL, activeBodyEL);

  // Проходим по каждой кнопке и вешаем на нее событие click через функцию onTabClick
  tabBtnArtEL.forEach(onTabClick);

  function onTabClick(item) {
    // Вешаем на каждую кнопку с помощью обработчика событий addEventListener событие click
    item.addEventListener('click', function () {
      // В переменную currentBtn сохраняем текущую кнопку item
      let currentBtn = item;
      // В переменную tabData записываем значение атрибута data-path у конкретной кнопки
      let tabData = currentBtn.getAttribute('data-path');
      // Выбираем из элементов списка тот, у которого значение атрибута data-target-list
      // совпадает со значением атрибута data-path (значение которого мы записали в переменную tabData) у нажатой кнопки
      let currentTabList = document.querySelector(`[data-target-list="${tabData}"]`);

      // Делаем проверку, что если у таба по которому мы кликаем нет класса .header__btn-art_active
      // то мы выполняем все действия ниже, если же такой класс есть, то все оставляем без изменений
      if (!currentBtn.classList.contains('header__btn-art_active')) {
        // проходим по всем кнопкам с помощью метода forEach
        tabBtnArtEL.forEach(function (item) {
          // Убираем у всех кнопок класс tabs__btn-active
          item.classList.remove('header__btn-art_active');
        })

        // Проходим по всем спискам
        listArtistEL.forEach(function (item) {
          // Удаляем у элементов класс tabs-active
          item.classList.remove('header__list-artist_active')
        })
      }

      // Добавляем текущей кнопке класс tabs__btn-active
      currentBtn.classList.toggle('header__btn-art_active');
      // Добавляем конкретному табу класс tabs-active
      currentTabList.classList.toggle('header__list-artist_active');

      // Вызываем функцию переключения значения aria-label
      toggleAriaLabelValue(item, 'Открыть список деятелей искусства', 'Закрыть список деятелей искусства');

      // Вызываем функции для закрытия выпадающего списка по клику на свободную область
      closePopup(currentTabList, currentBtn, currentTabList, 'header__list-artist_active');
      closePopup(currentTabList, currentBtn, currentBtn, 'header__btn-art_active');
    })
  }

  // Отключаем у simplebar tabindex, что бы он не фокусировался
  document.querySelectorAll('.simplebar-content-wrapper').forEach((el) => {
    el.setAttribute('tabindex', '-1');
  })

  // Инициализация слайдера в секции hero
  let swiperHero = new Swiper(sliderHeroEL, {
    slidesPerView: 1, // Задаем количество сладов видимых на экране
    autoplay: {
      delay: 4000, // Задаем период перелистывания слайдов в ms
    },
    // Добавляем эффект
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
  });

  // Инициализация choices js в секции gallery
  const element = document.querySelector('.js-select-art');
  const choices = new Choices(element, {
    searchEnabled: false,
  });

  // Создаем переменную в которую записываем значение атрибута aria-label у элемента с class='js-galleryArt'
  let ariaLabel = element.getAttribute('aria-label');
  // Вставляем значение атрибута выше в aria-label у элемента с class='choices'
  element.closest('.choices').setAttribute('aria-label', ariaLabel);

  // Инициализация слайдера в секции gallery
  let swiperGalleryPainting = new Swiper(sliderGalleryPaintingEL, {
    // slidesPerGroup: 2,
    // slidesPerView: 3, // Задаем количество сладов видимых на экране
    // slidesPerGroup: 3, // Задаем по сколько слайдов будет пролистываться
    // spaceBetween: 50, // Задаем отступ между слайдами
    observer: true,
    observeSlideChildren: true,
    // grid: {
    //   rows: 2, // Задаем количество строк
    // },
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1, // Задаем количество сладов видимых на экране
        slidesPerGroup: 1, // Задаем по сколько слайдов будет пролистываться
        grid: {
          rows: 1, // Задаем количество строк
        },
      },

      481: {
        slidesPerView: 2, // Задаем количество сладов видимых на экране
        slidesPerGroup: 2, // Задаем по сколько слайдов будет пролистываться
        spaceBetween: 15, // Задаем отступ между слайдами
        grid: {
          rows: 1, // Задаем количество строк
        },
      },

      662: {
        slidesPerView: 2, // Задаем количество сладов видимых на экране
        slidesPerGroup: 2, // Задаем по сколько слайдов будет пролистываться
        spaceBetween: 34, // Задаем отступ между слайдами
        grid: {
          rows: 2, // Задаем количество строк
        },
      },

      1328: {
        slidesPerView: 3, // Задаем количество сладов видимых на экране
        slidesPerGroup: 3, // Задаем по сколько слайдов будет пролистываться
        spaceBetween: 50, // Задаем отступ между слайдами
        grid: {
          rows: 2, // Задаем количество строк
        },
      },
    }
  });

  let swiperGalleryDrawing = new Swiper(sliderGalleryDrawingEL, {
    // slidesPerGroup: 2,
    observer: true,
    observeSlideChildren: true,
    grid: {
      rows: 2, // Задаем количество строк
    },
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1, // Задаем количество сладов видимых на экране
        slidesPerGroup: 1, // Задаем по сколько слайдов будет пролистываться
        grid: {
          rows: 1, // Задаем количество строк
        },
      },

      481: {
        slidesPerView: 2, // Задаем количество сладов видимых на экране
        slidesPerGroup: 2, // Задаем по сколько слайдов будет пролистываться
        spaceBetween: 15, // Задаем отступ между слайдами
        grid: {
          rows: 1, // Задаем количество строк
        },
      },

      662: {
        slidesPerView: 2, // Задаем количество сладов видимых на экране
        slidesPerGroup: 2, // Задаем по сколько слайдов будет пролистываться
        spaceBetween: 34, // Задаем отступ между слайдами
        grid: {
          rows: 2, // Задаем количество строк
        },
      },

      1328: {
        slidesPerView: 3, // Задаем количество сладов видимых на экране
        slidesPerGroup: 3, // Задаем по сколько слайдов будет пролистываться
        spaceBetween: 50, // Задаем отступ между слайдами
        grid: {
          rows: 2, // Задаем количество строк
        },
      },
    }
  });

  let swiperGallerySculpture = new Swiper(sliderGallerySculptureEL, {
    // slidesPerGroup: 2,
    observer: true,
    observeSlideChildren: true,
    grid: {
      rows: 2, // Задаем количество строк
    },
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1, // Задаем количество сладов видимых на экране
        slidesPerGroup: 1, // Задаем по сколько слайдов будет пролистываться
        grid: {
          rows: 1, // Задаем количество строк
        },
      },

      481: {
        slidesPerView: 2, // Задаем количество сладов видимых на экране
        slidesPerGroup: 2, // Задаем по сколько слайдов будет пролистываться
        spaceBetween: 15, // Задаем отступ между слайдами
        grid: {
          rows: 1, // Задаем количество строк
        },
      },

      662: {
        slidesPerView: 2, // Задаем количество сладов видимых на экране
        slidesPerGroup: 2, // Задаем по сколько слайдов будет пролистываться
        spaceBetween: 34, // Задаем отступ между слайдами
        grid: {
          rows: 2, // Задаем количество строк
        },
      },

      1328: {
        slidesPerView: 3, // Задаем количество сладов видимых на экране
        slidesPerGroup: 3, // Задаем по сколько слайдов будет пролистываться
        spaceBetween: 50, // Задаем отступ между слайдами
        grid: {
          rows: 2, // Задаем количество строк
        },
      },
    }
  });

  // Вызываем функцию toggleSlider при каждом изменении значения select (фильтра в галереи)
  selectArtEL.addEventListener('change', toggleSlider);

  function toggleSlider() {
    // Объявляем переменную для элементов фильтра галереи
    let optionGalleryEL = document.querySelectorAll('.choices__item--choice');

    // Проходим циклом по слайдерам и выполняем проверку
    sliderGalleryEL.forEach(function (item) {
      // Если у какого-то слайдера есть класс swiper-container__gallery_active
      if (item.classList.contains('section-gallery__swiper-container_active')) {
        // Мы его удаляем
        item.classList.remove('section-gallery__swiper-container_active');
      }
    })

    // Проходимся циклом по элементам фильтра галереи
    optionGalleryEL.forEach(function (item) {
      // Выполняем проверку у какого элемента есть класс is-selected
      if (item.classList.contains('is-selected')) {
        // Записываем в переменную optionDataValues значение атрибута data-value
        // элемента у которого есть класс is-selected
        let optionDataValues = item.getAttribute('data-value');
        // Записываем в переменную currentSlider слайдер у которого значение атрибута data-target-slider
        // Соответствует значению атрибута data-value у элемента фильтра с классом is-selected
        let currentSlider = document.querySelector(`[data-target-slider="${optionDataValues}"]`);
        // добавляем этому слайдеру класс section-gallery__swiper-container_active
        currentSlider.classList.add('section-gallery__swiper-container_active');
      }
    })

    // Присвоить tabindex='-1' элементу который выбран
    // document.querySelectorAll('.choices__item--selectable').forEach((e) => {
    //   e.setAttribute('tabindex', '-1');
    // })
  }

  toggleSlider();

  // Модальные окна в галереи

  // Объявляем функцию для открытия модального окна при клике по элементу слайдера
  gallerySlideBtnEL.forEach((el) => {
    el.addEventListener('click', (e) => {
      // Объявляем переменную в которую записываем ширину полосы скролла
      // (из всей ширины экрана вычитаем ширину body)
      let paddingOffset = intViewportWidth - document.body.offsetWidth + 'px';
      // Задаем для body padding-right равный значению в переменной paddingOffset
      activeBodyEL.style.paddingRight = paddingOffset;
      // Создаем переменную в которую записываем текущее положение скролла на странице
      let pagePosition = window.scrollY;
      // Навешиваем на body class modals-active, в котором отключаем скролл
      activeBodyEL.classList.add('modals-active');
      // Задаем для body data атрибут - data-position в значение которого передаем
      // переменную pagePosition
      activeBodyEL.dataset.position = pagePosition;
      // Добавляем body стиль top со значением равным -pagePosition
      activeBodyEL.style.top = -pagePosition + 'px';

      // Получаем значение аттрибута data-path-slider у кнопки по которой произошел click
      let currentBtn = e.currentTarget.getAttribute('data-path-slider');
      // Получаем модальное окно у которого значение data-target-modal соответствует значению currentBtn
      const currentModal = document.querySelector(`[data-target-modal="${currentBtn}"]`);
      // Добавляем класс конкретному модальному окну и оверлею
      currentModal.classList.add('modal__slider_visible');
      modalOverlayGalleryEL.classList.add('modal__overlay_visible');
      // задаем кнопкам слайдера tabindex -1
      gallerySlideBtnEL.forEach((item) => {
        item.setAttribute('tabindex', -1);
      })

      btnPaginationGallery.forEach((item) => {
        item.setAttribute('tabindex', -1);
      })
    })
  })

  // Объявляем функцию закрытия модального окна
  function closeModalGallery() {
    // Убираем у body значение padding-right
    activeBodyEL.style.paddingRight = '0';
    // Берем переменную pagePosition которую сохранили ранее и переобразовываем ее в число
    let pagePosition = parseInt(activeBodyEL.dataset.position, 10);
    // Записываем в body стиль top: auto; что бы убрать минусовой отступ
    activeBodyEL.style.top = 'auto';
    // Удаляем класс, который отключает скролл
    activeBodyEL.classList.remove('modals-active');
    // Проходимся циклом по всем модальным окнам
    modalSliderEl.forEach((el) => {
      // и удаляем класс modal__slider_visible
      el.classList.remove('modal__slider_visible');
    })
    // Удаляем у оверлея класс modal__overlay_visible
    modalOverlayGalleryEL.classList.remove('modal__overlay_visible');

    // В функцию scroll передаем значение pagePosition
    window.scroll({
      top: pagePosition,
      left: 0
    });
    // Удаляем у body атрибут data-position
    activeBodyEL.removeAttribute('data-position');

    // Возвращаем кнопкам слайдера tabindex 0
    gallerySlideBtnEL.forEach((item) => {
      item.setAttribute('tabindex', 0);
    })
    btnPaginationGallery.forEach((item) => {
      item.setAttribute('tabindex', 0);
    })
  }

  // Вызываем функцию закрытия модального окна при клике по оверлею
  modalOverlayGalleryEL.addEventListener('click', (e) => {
    if (e.target === modalOverlayGalleryEL) {
      closeModalGallery();
    }
  })

  // Вызываем функцию закрытия модального окна при клике по крестику
  btnCloseModalGalleryEL.forEach((el) => {
    el.addEventListener('click', (e) => {
      closeModalGallery();
    })
  })

  document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    if (keyName === 'Escape') {
      closeModalGallery();
    }
  })



  // Объявляем функцию которая переносит слайдеры в блок с заголовком, фильтром и описанием
  function transitionSliderGallery() {
    if (intViewportWidth <= 768) {
      sliderGallery.forEach((e) => {
        galleryWrap.append(e);
      })
    }
  }

  transitionSliderGallery();
});
