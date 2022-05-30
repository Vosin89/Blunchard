document.addEventListener('DOMContentLoaded', () => {
  // здесь мы определяем функцию, которая отвеает за работу меню, в ней не нужно ничего менять
  // Аргументом передаем массив с переменными
  function setBurger(params) {
    // Записываем в константу кнопку бургер меню
    const btn = document.querySelector(`.${params.btnClass}`);
    // Записываем в константу список кнопок
    const menu = document.querySelector(`.${params.menuClass}`);
    // Записываем в константу массив ссылок меню навигации
    const link = document.querySelectorAll(`.${params.navLinkClass}`);

    // для кнопки бургер-меню задаем атрибут aria-expanded=false
    btn.setAttribute('aria-expanded', false);

    // на меню вешаем обработчик события по animationend (срабатывает когда css анимация завершена)
    menu.addEventListener("animationend", function () {
      // если на меню висит класс is-closed
      if (this.classList.contains(params.hiddenClass)) {
        // удаляем у меню класс is-opened
        this.classList.remove(params.activeClass);
        // удаляем у меню класс is-closed
        this.classList.remove(params.hiddenClass);
      }
    });

    // вешаем на кнопку обработчик события по click
    btn.addEventListener("click", function () {
      // переключаем у кнопки is-opened
      this.classList.toggle(params.activeClass);

      if (
        // если на меню нет классов is-opened и is-closed
        !menu.classList.contains(params.activeClass) &&
        !menu.classList.contains(params.hiddenClass)
      ) {
        // добавляем на меню класс is-opened
        menu.classList.add(params.activeClass);
        // убираем возможность скрола по сайту
        document.body.style.overflow = 'hidden';
        // кнопке бургер-меню меняем значение атрибута aria-expanded на true
        btn.setAttribute('aria-expanded', true);
      } else {
        // иначе на меню вешаем класс is-closed
        menu.classList.add(params.hiddenClass);
        // удаляем у body атрибут style, что бы убрать overflow: hidden
        document.body.removeAttribute('style');
        // у кнопки бургер-меню меняем значение aria-axpanded на false
        btn.setAttribute('aria-expanded', false);
      }

      toggleAriaLabelValue(btn);
    });

    link.forEach(item => {
      item.addEventListener('click', () => {
        // Удаляем у кнопки бургер меню класс is-opened
        btn.classList.remove(params.activeClass);
        // иначе на меню вешаем класс is-closed
        menu.classList.add(params.hiddenClass);
        // удаляем у body атрибут style, что бы убрать overflow: hidden
        document.body.removeAttribute('style');
        // у кнопки бургер-меню меняем значение aria-axpanded на false
        btn.setAttribute('aria-expanded', false);

        toggleAriaLabelValue(btn);
      })
    })

    document.body.addEventListener('click', function (evt) {
      if (menu.classList.contains(params.activeClass) && !menu.contains(evt.target) && !btn.contains(evt.target)) {
        // Удаляем у кнопки бургер меню класс is-opened
        btn.classList.remove(params.activeClass);
        // иначе на меню вешаем класс is-closed
        menu.classList.add(params.hiddenClass);
        // удаляем у body атрибут style, что бы убрать overflow: hidden
        document.body.removeAttribute('style');
        // у кнопки бургер-меню меняем значение aria-axpanded на false
        btn.setAttribute('aria-expanded', false);

        toggleAriaLabelValue(btn);
      }
    })
  }

  // Объявляем функцию переключения значения aria-label
  function toggleAriaLabelValue(item) {
    // выполняем проверку какое значение присвоено атрибуту aria-label
    if (item.getAttribute('aria-label') === 'Открыть меню навигации') {
      // если условие равно переключаем значение атрибута aria-label
      item.setAttribute('aria-label', 'Закрыть меню навигации');
    } else {
      // если условие не верно, то оставляем как есть
      item.setAttribute('aria-label', 'Открыть меню навигации')
    }
  }

  // здесь мы вызываем функцию и передаем в нее классы наших элементов
  setBurger({
    btnClass: "js-mobile-menu-btn", // класс бургера
    menuClass: "js-nav-menu", // класс меню
    navLinkClass: 'js-nav-link', // класс ссылок в меню навигации
    activeClass: "is-opened", // класс открытого состояния
    hiddenClass: "is-closed" // класс закрывающегося состояния (удаляется сразу после закрытия)
  });

  // Объявляем функцию обрабатывающую логику работы поиска
  function setSearch(params) {
    // Записываем в константу кнопку поиска
    const openBtn = document.querySelector(`.${params.openBtnClass}`);
    // записываем в константу форму поиска
    const search = document.querySelector(`.${params.searchClass}`);
    //  записываем в константу кнопку закрытия поиска
    const closeBtn = search.querySelector(`.${params.closeBtnClass}`);

    // на поиск вешаем обработчик события по animationend (срабатывает когда css анимация завершена)
    search.addEventListener("animationend", function (evt) {
      // Если поиск открыт
      if (this._isOpened) {
        // Удаляем с формы поиска класс is-opened
        this.classList.remove(params.activeClass);
        // Удаляем с формы поиска класс is-closed
        this.classList.remove(params.hiddenClass);
        // переключаем значение на false
        this._isOpened = false;
        // Иначе
      } else {
        // Переключаем на true
        this._isOpened = true;
      }
    });

    // по клику на поиск
    search.addEventListener('click', function (evt) {
      // присваиваем значение true
      evt._isSearch = true;
    });

    // по клику на кнопку открытия поиска
    openBtn.addEventListener("click", function (evt) {
      // делаем кнопку неактивной
      this.disabled = true;

      if (
        // Если у формы поиска не классов is-open и is-closed
        !search.classList.contains(params.activeClass) &&
        !search.classList.contains(params.hiddenClass)
      ) {
        // Поиску добавляем класс is-opened
        search.classList.add(params.activeClass);
      }
    });

    // По клику на кнопку закрытия поиска
    closeBtn.addEventListener('click', function () {
      // делаем кнопку открытия поиска актвной
      openBtn.disabled = false;
      // на поиск вешаем класс is-closed
      search.classList.add(params.hiddenClass);
    });

    // По клику на body
    document.body.addEventListener('click', function (evt) {
      if (!evt._isSearch && search._isOpened) {
        openBtn.disabled = false;
        search.classList.add(params.hiddenClass);
      }
    });
  }

  setSearch({
    openBtnClass: "js-mobile-search-btn-open", // класс кнопки открытия
    closeBtnClass: "js-serch-btn-close", // класс кнопки закрытия
    searchClass: "js-mobile-search", // класс формы поиска
    activeClass: "is-opened", // класс открытого состояния
    hiddenClass: "is-closed" // класс закрывающегося состояния (удаляется сразу после закрытия)
  });



  // if (window.innerWidth < 1025) {
  //   navLinkEL.forEach((item) => {
  //     item.setAttribute('tabindex', '-1');
  //   });
  // }

  // // Объявляем функцию addTabindex
  // function addTabindex() {
  //   // Выполняем проверку есть ли у body класс menu-open
  //   if (!bodyEL.classList.contains('menu-open')) {
  //     navLinkEL.forEach((item) => {
  //       // Если класс отсутствует присваиваем элементам списка меню tabindex = -1
  //       item.setAttribute('tabindex', '-1');
  //     })
  //   } else {
  //     navLinkEL.forEach((item) => {
  //       // Если класс есть, то присваиваем tabindex = 0
  //       item.setAttribute('tabindex', '0');
  //     })
  //   }
  // }

  // // Обявляем функцию для обработки события click по кнопкам бургер меню, мобильному
  // // поиску или элементу навигации
  // function clickBtn(item, classValue, ariaValueOne, ariaValueTwo, functionName, popup) {
  //   // Вызываем click по кнопкам бургер меню,
  //   // мобильному поиску или элементу навигации
  //   item.addEventListener('click', () => {
  //     // При каждом событии click на body переключаем
  //     // класс который передается через аргумент classValue
  //     bodyEL.classList.toggle(classValue);

  //     // Вызываем функцию переключения значения aria-label
  //     toggleAriaLabelValue(item, ariaValueOne, ariaValueTwo)

  //     // Вызываем функцию переключения tabindex
  //     addTabindex(item);

  //     // Вызываем функцию addTabindex на всех элементах списка меню
  //     navLinkEL.forEach(functionName);
  //   })

  //   closePopup(item, ariaValueOne, ariaValueTwo, classValue, popup);
  // }

  // // Вызываем функцию clickBtn по клику на бургер меню
  // clickBtn(mobileMenuBtnEL, 'menu-open', 'Открыть меню навигации', 'Закрыть меню навигации', addTabindex, navMenuEL);
  // // Вызываем функцию clickBtn по клику на мобильный поиск
  // clickBtn(mobileSearchBtnEL, 'search-open', 'Открыть поиск', 'Закрыть поиск', addTabindex, searchFormEL);
  // // Вызываем функцию при клике по элементу навигации
  // navLinkEL.forEach(item => {
  //   clickBtn(item, 'menu-open', 'Открыть меню навигации', 'Закрыть меню навигации', addTabindex);
  // })
})
