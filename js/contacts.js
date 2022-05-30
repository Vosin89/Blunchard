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

    // submitHandler: function(form) {
    //   let formData = new formData();

    //   fetch('../php/mail.php', {
    //     method: 'POST',
    //     body: formData
    //   }).then(() => {
    //     console.log('Отправлено');
    //     form.reset();
    //   })
    //   .catch(() => console.log('Ошибка'));
    // }
  })

  validation
    .addField('.js-inpit-name', [{
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
        value: true,
        errorMessage: 'Телефон обязателен'
      },
      {
        rule: 'function',
        validator: (name, value) => {
          const phone = selector.inputmask.unmaskedvalue()
          return Boolean(Number(phone) && phone.length === 10)
        },
        errorMessage: 'Введите телефон',
      },
    ]).onSuccess((event) => {
      console.log('Validation passes and form submited');

      console.log(event);

      let formData = new FormData(event.target);

      console.log(...formData);

      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Отправлено');
          }
        }
      }

      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);

      event.target.reset();
    })

  // Яндекс карта
  ymaps.ready(init);

  function init() {
    var myMap = new ymaps.Map('map', {
      center: [55.76011653, 37.61377158],
      zoom: 14,
      controls: ['geolocationControl', 'zoomControl'],
    }, {
      suppressMapOpenBlock: true,
      geolocationControlSize: "large",
      geolocationControlPosition: {
        top: "350px",
        right: "15px"
      },
      geolocationControlFloat: 'none',
      zoomControlSize: "small",
      zoomControlFloat: "none",
      zoomControlPosition: {
        top: "280px",
        right: "15px"
      }
    });

    myMap.behaviors.disable('scrollZoom');

    var myPlacemark = new ymaps.Placemark([55.76011653, 37.61377158], {}, {
      iconLayout: 'default#image',
      iconImageHref: '/img/main/contacts/icon_map.svg',
      iconImageSize: [20, 20],
      iconImageOffset: [10, 10],
    });

    myMap.geoObjects.add(myPlacemark);
  }
})
