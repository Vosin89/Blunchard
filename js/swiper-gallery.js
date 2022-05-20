document.addEventListener('DOMContentLoaded', () => {
  // Объявляем переменную для слайдеров в секции gallery
  const sliderGalleryEL = document.querySelector('.js-slider-gallery');

  // Инициализация слайдера в секции gallery
  let swiperGallery = new Swiper(sliderGalleryEL, {
    observer: true,
    observeSlideChildren: true,
    pagination: {
      el: ".js-gallery-pagination",
      type: "fraction",
    },

    navigation: {
      nextEl: ".js-gallery-btn-next",
      prevEl: ".js-gallery-btn-prev",
    },

    keyboard: true, // Включаем навигацию стрелками с клавиатуры
    watchSlidesVisibility: true,
    slideVisibleClass: 'gallery-slide-visible', // Задаем класс слайду который вмден на экране

    // a11y: {
    //   prevSlideMessage: 'Предыдущий слайд',
    //   nextSlideMessage: 'Следующий слайд',
    // },
    a11y: false,

    watchSlidesProgress: true, // Добавляем слайдерам дополнительный класс

    breakpoints: {
      320: {
        // slidesPerView: 1, // Задаем количество сладов видимых на экране
        // slidesPerGroup: 1, // Задаем по сколько слайдов будет пролистываться
        spaceBetween: 5, // Задаем отступ между слайдами
      },

      481: {
        slidesPerView: 1, // Задаем количество сладов видимых на экране
        slidesPerGroup: 1, // Задаем по сколько слайдов будет пролистываться
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
    },

    on: {
      init: function() {
        this.slides.forEach(slide => {
          if (!slide.classList.contains('gallery-slide-visible')) {
            slide.firstElementChild.tabIndex = '-1';
          } else {
            slide.firstElementChild.tabIndex = '';
          }
        });
      },
      slideChange: function() {
        this.slides.forEach(slide => {
          if (!slide.classList.contains('gallery-slide-visible')) {
            slide.firstElementChild.tabIndex = '-1';
          } else {
            slide.firstElementChild.tabIndex = '';
          }
        });
      }
    }
  });
});
