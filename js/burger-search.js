document.addEventListener('DOMContentLoaded', () => {
  // Объявляем переменную для body
  const bodyEL = document.querySelector('.js-body');
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

  if (window.innerWidth < 1025) {
    navLinkEL.forEach((item) => {
      item.setAttribute('tabindex', '-1');
    });
  }

  // Объявляем функцию addTabindex
  function addTabindex() {
    // Выполняем проверку есть ли у body класс menu-open
    if (!bodyEL.classList.contains('menu-open')) {
      navLinkEL.forEach((item) => {
        // Если класс отсутствует присваиваем элементам списка меню tabindex = -1
        item.setAttribute('tabindex', '-1');
      })
    } else {
      navLinkEL.forEach((item) => {
        // Если класс есть, то присваиваем tabindex = 0
        item.setAttribute('tabindex', '0');
      })
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

  function closePopup(item, ariaValueOne, ariaValueTwo, classValue, popup) {
    document.addEventListener('click', (event) => {
      // Выполняем проверку:
      // 1. На body навешан активный класс menu-open/search-open
      // 2. Клик происходит не по кнопке бурегр/поиск
      // 3. Клик происходит не по списку меню/формы поиска
      if (bodyEL.classList.contains(classValue) && !item.contains(event.target) && !popup.contains(event.target)) {
        // Если все выше верно удаляем у body активный класс
        bodyEL.classList.remove(classValue);

        // Вызываем функцию переключения значения aria-label
        toggleAriaLabelValue(item, ariaValueOne, ariaValueTwo)

        // Вызываем функцию переключения tabindex
        addTabindex(item);
      }
    })
  }

  // Обявляем функцию для обработки события click по кнопкам бургер меню, мобильному
  // поиску или элементу навигации
  function clickBtn(item, classValue, ariaValueOne, ariaValueTwo, functionName, popup) {
    // Вызываем click по кнопкам бургер меню,
    // мобильному поиску или элементу навигации
    item.addEventListener('click', () => {
      // При каждом событии click на body переключаем
      // класс который передается через аргумент classValue
      bodyEL.classList.toggle(classValue);

      // Вызываем функцию переключения значения aria-label
      toggleAriaLabelValue(item, ariaValueOne, ariaValueTwo)

      // Вызываем функцию переключения tabindex
      addTabindex(item);

      // Вызываем функцию addTabindex на всех элементах списка меню
      navLinkEL.forEach(functionName);
    })

    closePopup(item, ariaValueOne, ariaValueTwo, classValue, popup);
  }

  // Вызываем функцию clickBtn по клику на бургер меню
  clickBtn(mobileMenuBtnEL, 'menu-open', 'Открыть меню навигации', 'Закрыть меню навигации', addTabindex, navMenuEL);
  // Вызываем функцию clickBtn по клику на мобильный поиск
  clickBtn(mobileSearchBtnEL, 'search-open', 'Открыть поиск', 'Закрыть поиск', addTabindex, searchFormEL);
  // Вызываем функцию при клике по элементу навигации
  navLinkEL.forEach(item => {
    clickBtn(item, 'menu-open', 'Открыть меню навигации', 'Закрыть меню навигации', addTabindex);
  })
})
