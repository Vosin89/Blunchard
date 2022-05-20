document.addEventListener('DOMContentLoaded', () => {
  // Объявляем переменную для body
  const bodyEL = document.querySelector('.js-body');
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
  // Переменная для слайда
  const slideGalleryEL = document.querySelectorAll('.js-gallery-slide');
  // Объявляем переменную для контейнеров слайдера
  const sliderGallery = document.querySelectorAll('.section-gallery__swiper-container');
  // Объявляем переменную для контейнера в секции галерея
  const galleryWrap = document.querySelector('.section-gallery__wrap');

  // Модальные окна в галереи
  // Объявляем функцию для открытия модального окна при клике по элементу слайдера
  gallerySlideBtnEL.forEach((el) => {
    el.addEventListener('click', (e) => {
      // Объявляем переменную в которую записываем ширину полосы скролла
      // (из всей ширины экрана вычитаем ширину body)
      let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
      // Задаем для body padding-right равный значению в переменной paddingOffset
      bodyEL.style.paddingRight = paddingOffset;
      // Создаем переменную в которую записываем текущее положение скролла на странице
      let pagePosition = window.scrollY;
      // Навешиваем на body class modals-active, в котором отключаем скролл
      bodyEL.classList.add('modals-active');
      // Задаем для body data атрибут - data-position в значение которого передаем
      // переменную pagePosition
      bodyEL.dataset.position = pagePosition;
      // Добавляем body стиль top со значением равным -pagePosition
      bodyEL.style.top = -pagePosition + 'px';

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

      btnCloseModalGalleryEL.forEach((item) => {
        if (currentModal.contains(item)) {
          item.focus();
        }
      })

      btnPaginationGallery.forEach((item) => {
        item.setAttribute('tabindex', -1);
      })
    })
  })

  // Объявляем функцию закрытия модального окна
  function closeModalGallery() {
    // Убираем у body значение padding-right
    bodyEL.style.paddingRight = '0';
    // Берем переменную pagePosition которую сохранили ранее и переобразовываем ее в число
    let pagePosition = parseInt(bodyEL.dataset.position, 10);
    // Записываем в body стиль top: auto; что бы убрать минусовой отступ
    bodyEL.style.top = 'auto';
    // Удаляем класс, который отключает скролл
    bodyEL.classList.remove('modals-active');
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
    bodyEL.removeAttribute('data-position');

    // Возвращаем кнопкам слайдера tabindex 0
    slideGalleryEL.forEach((item) => {
      if (item.classList.contains('slide-visible')) {
        item.firstElementChild.setAttribute('tabindex', 0);
      }
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


  // Закрытие модального окна по клику на ESC
  document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    if (keyName === 'Escape') {
      closeModalGallery();
    }
  })

  // Объявляем функцию которая переносит слайдеры в блок с заголовком, фильтром и описанием
  // function transitionSliderGallery() {
  //   if (window.innerWidth <= 768) {
  //     sliderGallery.forEach((e) => {
  //       galleryWrap.append(e);
  //     })
  //   }
  // }

  // transitionSliderGallery();
})
