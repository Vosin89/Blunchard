document.addEventListener('DOMContentLoaded', () => {
  tippy('.js-tooltip-first', {
    content: "Пример современных тенденций - современная методология разработки",
    trigger: 'click',
  });

  tippy('.js-tooltip-second', {
    content: "Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции",
    trigger: 'click',
  });

  tippy('.js-tooltip-third', {
    content: "В стремлении повысить качество",
    trigger: 'click',
  });

  // const SlidePartners = document.querySelectorAll('.js-slide-partners');
  // let widthSlidePartners = document.querySelector('.js-slide-partners').offsetWidth;
  // let widthSlidePartners = document.querySelector('.js-slide-partners');
  // let widthSlidePartners = document.querySelector('.js-slide-partners').getBoundingClientRect()

  // SlidePartners.forEach(item => {
  //   item.style.height = `${widthSlidePartners / 3}px`;
  // })

  // console.log(widthSlidePartners.width);
  // console.dir(widthSlidePartners);
})

