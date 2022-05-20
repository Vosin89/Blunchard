document.addEventListener('DOMContentLoaded', () => {
  const sliderEventsEL = document.querySelector('.js-swiper-partners');

  let swiperEvents = new Swiper(sliderEventsEL, {
    navigation: {
      nextEl: '.js-projects-btn-next',
      prevEl: '.js-projects-btn-prev',
      disabledClass: 'partners__swiper-btn-nav_disabled',
    },

    keyboard: true, // Включаем навигацию стрелками с клавиатуры
    watchSlidesVisibility: true,
    slideVisibleClass: 'projects-slide-visible', // Задаем класс слайду который вмден на экране
    watchSlidesProgress: true, // Добавляем слайдерам дополнительный класс

    a11y: false,

    slidesPerView: 1, // Количество видимых слайдов
    slidesPerGroup: 1, // количество слайдов при прокрутке

    breakpoints: {
      662: {
        slidesPerView: 2, // Количество видимых слайдов
        spaceBetween: 34, // расстояние между слайдами
      },

      769: {
        slidesPerView: 2, // Количество видимых слайдов
        spaceBetween: 50, // расстояние между слайдами
      },

      1025: {
        slidesPerView: 3, // Количество видимых слайдов
        spaceBetween: 50, // расстояние между слайдами
      },
    },

    on: {
      init: function() {
        this.slides.forEach(slide => {
          if (!slide.classList.contains('projects-slide-visible')) {
            slide.firstElementChild.tabIndex = '-1';
          } else {
            slide.firstElementChild.tabIndex = '';
          }
        });
      },
      slideChange: function() {
        this.slides.forEach(slide => {
          if (!slide.classList.contains('projects-slide-visible')) {
            slide.firstElementChild.tabIndex = '-1';
          } else {
            slide.firstElementChild.tabIndex = '';
          }
        });
      }
    }
  })
})
