// // choice
// const element = document.querySelector('.js-select');
// const choices = new Choices(element, {
//   searchEnabled: false,
//   placeholderValue: 'Материал',
//   sorter: function(a, b) {
//     return b.label.index - a.label.index;
//   },
// });
//
// // Создаем переменную в которую записываем значене атрибута arai-label у элемента с class='js-select'
// let ariaLabel = element.getAttribute('aria-label');
// // Вставляем значение атрибута выше в arai-label у элемента с class='choices'
// element.closest('.choices').setAttribute('aria-label', ariaLabel);

const multiSelect = () => {
  const elements = document.querySelectorAll('.js-select');
  elements.forEach(el => {
    const choices = new Choices(el, {
      searchEnabled: false,
      sorter: function(a, b) {
        return b.label.index - a.label.index;
      },
    });
  });

  elements.forEach(el => {
    let ariaLabel = el.getAttribute('aria-label');
    el.closest('.choices').setAttribute('aria-label', ariaLabel);
  });
}

multiSelect();
