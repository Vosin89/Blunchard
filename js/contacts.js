document.addEventListener('DOMContentLoaded', () => {
  // Изменение тестового содержимого кнопки заказа

  // Присваиваем в переменную кнопку "Заказть обратный звонок"
  let btnContactsCall = document.querySelector('.js-contacts-btn-call');

  // При размере экрана меньше 662px меняем текст в кнопке на "Заказать"
  if (window.innerWidth < 662) {
    btnContactsCall.innerHTML = 'Заказать'
  }


  // Валидация формы
  let selector = document.querySelector("input[type='tel']");

  let im = new Inputmask('+7(999)-999-99-99');
  im.mask(selector);

  const validation = new JustValidate('.js-form-contacts', {
    errorFieldCssClass: 'is-invalid',
    errorLabelStyle: {
      fontSize: '12px',
      lineHeight: '16px',
      color: '#D11616',
    },
    focusInvalidFiled: true,

    submitHandler: function(form) {
      let formData = new formData();

      fetch('../php/mail.php', {
        method: 'POST',
        body: formData
      }).then(() => {
        console.log('Отправлено');
        form.reset();
      })
      .catch(() => console.log('Ошибка'));
    }
  })

  validation
    .addField('.js-inpit-name', [
      {
        rule: 'required',
        errorMessage: 'Введите Имя',
      },
      {
        rule: 'customRegexp',
        value: /^[a-zа-яё]+$/i,
        errorMessage: 'Недопустимое значение',
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Имя слишком короткое',
      }
    ])
    .addField('.js-input-tel', [
      {
        rule: 'required',
        validator: (name, value) => {
          const phone = selector.inputmask.unmaskedvalue()
          return Number(phone) && phone.length === 10
        },
        errorMessage: 'Введите телефон',
      },
    ])

  // Яндекс карта
  ymaps.ready(init);
  function init(){
    var myMap = new ymaps.Map('map', {
      center: [55.76011653, 37.61377158],
      zoom: 14,
      controls: [],
    });

    var myPlacemark = new ymaps.Placemark([55.76011653, 37.61377158], {}, {
      iconLayout: 'default#image',
      iconImageHref: '/img/main/contacts/icon_map.svg',
      iconImageSize: [20, 20],
      iconImageOffset: [10, 10],
    });

    myMap.geoObjects.add(myPlacemark);
  }
})
