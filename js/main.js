document.addEventListener('DOMContentLoaded', function() {
  // Объявляем переменную для body
  const activeBodyEL = document.querySelector('.js-body');
  // Объявляем переменну. для кнопки бургер меню
  const mobileMenuBtnEL = document.querySelector('.js-mobileMenuBtn');
  // Объявляем переменную для мобильного меню навигации
  const navMenuEL = document.querySelector('.js-navMenu');
  // Объявляем переменные для элементов меню навигации
  const navLinkEL = document.querySelectorAll('.js-navLink');
  // Объявляем переменную для млбильной формы поиска
  const searchFormEL = document.querySelector('.js-mobileSearch');
  // Обявляем переменную для кнопки поиска
  const mobileSearchBtnEL = document.querySelector('.js-mobileSearchBtn');
  // Объявляем переменную для кнопки раскрытия списка в header
  const tabBtnArtEL = document.querySelectorAll('.js-tabBtnArt');
  // Объявляем переменную для выпадающего списка в header
  const listArtistEL = document.querySelectorAll('.js-listArtist');
  // Обявляем переменную для слайдера
  const slider = document.querySelector('.swiper-container');
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
    onBtnClick(item, 'menu-open', 'Открыть меню навигации', 'Зкрыть меню навигации', addTabindex);
  });

  // Объявляем функцию addTabindex
  function addTabindex(item) {
    // Присваиваем переменной currentItem текущий элемент списока меню
    let currentItem = item;
    // Выполняем проверку есть ли у body класс menu-open
    if (!mobileMenuEL.classList.contains('menu-open')) {
      // Если класс отсутствует присваиваем элементам списка меню tabindex = -1
      currentItem.setAttribute('tabindex', '-1');
    } else {
      // Если класс есть, то присваиваем tabindex = 0
      currentItem.setAttribute('tabindex', '0');
    }
  }

  // Объявляем функцию пееключения значения aria-label
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
    item.addEventListener('click', function() {
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
    document.addEventListener('click', function(e) {
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
  onBtnClick(mobileMenuBtnEL, 'menu-open', 'Открыть меню навигации', 'Зкрыть меню навигации', addTabindex, navMenuEL, activeBodyEL);

  // Вызываем функцию onBtnClick по клику на мобильный поиск
  onBtnClick(mobileSearchBtnEL, 'search-open', 'Открыть поиск', 'Зкрыть поиск', addTabindex, searchFormEL, activeBodyEL);

  // Проходим по каждой кнопке и вешаем на нее событие click через функцию onTabClick
  tabBtnArtEL.forEach(onTabClick);

  function onTabClick(item) {
    // Вешаем на каждую кнопку с помощью обработчика событий addEventListener событие click
    item.addEventListener('click', function() {
      // В переменную currentBtn сохраняем текущую кнопку item
      let currentBtn = item;
      // В переменную tabData записываем значение значение атрибута data-path у конкретной кнопки
      let tabData = currentBtn.getAttribute('data-path');
      // Выбираем из элементов списка тот у которого значение атрибута data-target-list
      // совпадает со значением атрибута data-path (значение которого мы записали в переменную tabData) у нажатой кнопки
      let currentTabList = document.querySelector(`[data-target-list="${tabData}"]`);

      // Делаем проверку, что если у таба по которому мы кликаем нет класса .header__btn-art_active
      // то мы выполняем все действия ниже, если же такой класс есть, то все оставляем без изменений
      if (!currentBtn.classList.contains('header__btn-art_active')) {
        // проходим по всем кнопкам с помощью метода forEach
        tabBtnArtEL.forEach(function(item) {
          // Убираем у всех кнопок класс tabs__btn-active
          item.classList.remove('header__btn-art_active');
        })

        // Проходим по всем спискам
        listArtistEL.forEach(function(item) {
          // Удаляем у элементов класс tabs-active
          item.classList.remove('header__list-artist_active')
        })
      }

      // Добавляем текущей кнопке класс tabs__btn-active
      currentBtn.classList.toggle('header__btn-art_active');
      // Добавляем конкретному табу класс tabs-active
      currentTabList.classList.toggle('header__list-artist_active');

      // Вызываем функцию переключения значения aria-label
      toggleAriaLabelValue(item, 'Открыть спискок деятелей искусства', 'Закрыть спискок деятелей искусства');

      closePopup(currentTabList, currentBtn, currentTabList, 'header__list-artist_active');
      closePopup(currentTabList, currentBtn, currentBtn, 'header__btn-art_active');
    })
  }

  // Проиизводим инициалзацию слайдера
  let swiper = new Swiper(slider, {
    slidesPerView: 1, // Задаем количество сладов видимых на экране
    autoplay: {
      delay: 4000, // Задаем переод перелистывания слайдов в ms
    },
    // Добавляем эффект
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
  });
});

