document.addEventListener('DOMContentLoaded', function() {
  // Объявляем переменну. для кнопки бургер меню
  const mobileMenuBtnEL = document.querySelector('.js-mobileMenuBtn');
  // Объявляем переменную для body
  const mobileMenuEL = document.querySelector('.js-body');
  // Объявляем переменные для элементов меню навигации
  const navLinkEL = document.querySelectorAll('.js-navLink');
  // Обявляем переменную для кнопки поиска
  const mobileSearchBtnEL = document.querySelector('.js-mobileSearchBtn');
  // Обявляем переменную для окна поиска
  const mobileSearchInputEL = document.querySelector('.js-headerSearchInputMobile');
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
    onBtnMenuClick(item);
  });

  // Объявляем функцию для клика по кнопке бурегр меню
  function onBtnMenuClick(item) {
    // Вызываем событие click на кнопку бургер меню
    item.addEventListener('click', function () {
      // По каждому клику на кнопку бургер меню пееключаем (присваиваем/удаляем) класс .menu-open на body
      mobileMenuEL.classList.toggle('menu-open');

      // При клике выполняем проверку какое значение присвоено атрибуту aria-label у кнопки бургер меню, если 'Открыть меню навигации'
      if (item.getAttribute('aria-label') === 'Открыть меню навигации') {
        // Меняем значение aria-label на 'Зкрыть меню навигации'
        item.setAttribute('aria-label', 'Зкрыть меню навигации');
      } else {
        // В противном случае aria-label='Открыть меню навигации'
        item.setAttribute('aria-label', 'Открыть меню навигации');
      }

      // Вызываем функцию addTabindex на всех элементах списка меню
      navLinkEL.forEach(addTabindex);
    });
  }

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

  // Обявляем функицю обработки клика по кнопке поиска
  function onBtnSearchClick(item) {
    // Вызываем событие click на кнопку поиска
    item.addEventListener('click', function () {
      // По каждому клику на кнопку поиска пееключаем (присваиваем/удаляем) класс .search-open на body
      mobileMenuEL.classList.toggle('search-open');
      // Удаляем атрибут placeholder у input
      mobileSearchInputEL.removeAttribute('placeholder');
      // При клике выполняем проверку какое значение присвоено атрибуту aria-label у кнопки бургер меню, если 'Открыть поиск'
      if (item.getAttribute('aria-label') === 'Открыть поиск') {
        // Меняем значение aria-label на 'Зкрыть поиск'
        item.setAttribute('aria-label', 'Зкрыть поиск');
      } else {
        // В противном случае aria-label='Открыть поиск'
        item.setAttribute('aria-label', 'Открыть поиск');
      }
    });
  };

  // Вызываем функцию onBtnMenuClick по клюку на кнопку бургер меню
  onBtnMenuClick(mobileMenuBtnEL);

  // Вызываем функцию onBtnSearchClick по клюку на кнопку поиска
  onBtnSearchClick(mobileSearchBtnEL);
});
