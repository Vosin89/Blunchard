document.addEventListener('DOMContentLoaded', () => {
  // Инициализация choices js в секции gallery
  const element = document.querySelector('.js-select-art');
  const choices = new Choices(element, {
    searchEnabled: false,
  });

  // Создаем переменную в которую записываем значение атрибута aria-label у элемента с class='js-galleryArt'
  let ariaLabel = element.getAttribute('aria-label');
  // Вставляем значение атрибута выше в aria-label у элемента с class='choices'
  element.closest('.choices').setAttribute('aria-label', ariaLabel);
})
