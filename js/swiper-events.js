document.addEventListener('DOMContentLoaded', () => {
  const sliderEventsEL = document.querySelector('.js-swiper-events');

  let swiperEvents = new Swiper(sliderEventsEL, {
    pagination: {
      el: '.js-events-pagination',
      type: 'bullets',
    },

    navigation: {
      nextEl: '.js-events-btn-next',
      prevEl: '.js-events-btn-prev',
      disabledClass: 'section-events__btn-nav_disabled',
    },

    keyboard: true, // Включаем навигацию стрелками с клавиатуры
    watchSlidesVisibility: true,
    slideVisibleClass: 'events-slide-visible', // Задаем класс слайду который вмден на экране
    watchSlidesProgress: true, // Добавляем слайдерам дополнительный класс

    a11y: {
      prevSlideMessage: 'Предыдущий слайд', // Значение aria-label
      nextSlideMessage: 'Следующий слайд', // Значение aria-label
    },

    slidesPerView: 1, // Количество видимых слайдов
    slidesPerGroup: 1, // количество слайдов при прокрутке

    breakpoints: {
      481: {
        slidesPerView: 2, // Количество видимых слайдов
        spaceBetween: 34, // расстояние между слайдами
      },

      769: {
        spaceBetween: 27, // расстояние между слайдами
        slidesPerGroup: 2, // количество слайдов при прокрутке
      },

      1025: {
        slidesPerView: 3, // Количество видимых слайдов
        spaceBetween: 50, // расстояние между слайдами
      },
    },

    on: {
      init: function() {
        this.slides.forEach(slide => {
          if (!slide.classList.contains('events-slide-visible')) {
            slide.lastElementChild.lastElementChild.tabIndex = '-1';
          } else {
            slide.lastElementChild.lastElementChild.tabIndex = '';
          }
        });
      },
      slideChange: function() {
        this.slides.forEach(slide => {
          if (!slide.classList.contains('events-slide-visible')) {
            slide.lastElementChild.lastElementChild.tabIndex = '-1';
          } else {
            slide.lastElementChild.lastElementChild.tabIndex = '';
          }
        });
      }
    }
  })
})
