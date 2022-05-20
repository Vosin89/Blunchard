document.addEventListener('DOMContentLoaded', () => {
  // Задаем константу для кнопок флага
  const btnFlagsEL = document.querySelectorAll('.js-catalog-btn-filter');
  // Задаем константу для описания художников
  const tabsContentEL = document.querySelectorAll('.js-tabs-content');
  // Задаем константу списка художников по странам
  const listAutorsCountryEL = document.querySelectorAll('.js-item-authors-country');
  // Задаем кнопку для открытия информации о художниках
  const btnAutorEL = document.querySelectorAll('.js-btn-catalog-author');
  // Задаем константу ширины мобильного экрана
  const MOBILE_WIDTH = 661;

  // Инициализация аккордеона
  $(document).ready(function () {
    $(function () {
      $(".js-accordion-catalog-wrapper").accordion({ // задаем атрибут для инициализации
        active: 0, // задаем активный элемент по умолчанию (0, т.е. первый)
        collapsible: true, // если true то можно закрыть все разделы
        icons: false, // Отключаем стандартные иконки открытия/раскрытия аккордеона
        heightStyle: 'content',
      });
    });
  });

  btnFlagsEL.forEach(item => {
    item.addEventListener('click', event => {
      btnFlagsEL.forEach(el => {
        el.classList.remove('section-catalog__btn-filter_active');
      });
      event.currentTarget.classList.add('section-catalog__btn-filter_active');


      const path = event.currentTarget.dataset.pathCatalogCountry;

      listAutorsCountryEL.forEach(tabContent => {
        tabContent.classList.remove('accordion__item-authors-country_active');
      })

      document.querySelectorAll(`[data-target-catalog-country=${path}]`).forEach(el => {
        el.classList.add('accordion__item-authors-country_active');
      })
    });
  });

  btnAutorEL.forEach(item => {
    item.addEventListener('click', event => {

      const path = event.currentTarget.dataset.pathTabsContent;

      tabsContentEL.forEach(tabContent => {
        tabContent.classList.remove('tabs-content__wrap_active', 'is-disabled');
      })

      document.querySelectorAll(`[data-target-tabs-content=${path}]`).forEach(el => {
        el.classList.add('tabs-content__wrap_active');
      })

      event.preventDefault();

      scrollToContent(this, true);
    })
  })

  btnFlagsEL[2].click();
  btnAutorEL[47].click();

  // Добавляем плавную прокрутку до художника в мобильной версии
  function getWindowWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.body.clientWidth,
      document.documentElement.clientWidth
    );
  }

  function scrollToContent(link, isMobile) {
    if (isMobile && getWindowWidth() > MOBILE_WIDTH) {
      return;
    }

    const scrollTarget = document.querySelector('.js-tabs-content-wrap');
    const elementPosition = scrollTarget.getBoundingClientRect().top - 15;

    window.scrollBy({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
})
