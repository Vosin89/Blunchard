document.addEventListener('DOMContentLoaded', () => {
  // Объявляем переменную для слайдера в секции hero
  const sliderHeroEL = document.querySelector('.js-slider-hero');

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
});
