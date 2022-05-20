document.addEventListener('DOMContentLoaded', () => {
  // Объявляем переменные
  const params = {
    // Кнопка открытия списка
    btnArt: 'js-btn-art',
    // Список
    dropArtist: 'js-list-artist',
    // Класс кнопки и списка при открытии списка
    dropDownActive: 'is-active',
    // Класс кнопки и списка при закрытии списка
    dropDownDisabled: 'is-disabled',
  }

  // Объявляем функцию закрытия списка
  function onDisable(event) {
    // Проверяем есть ли на списке по которому произошел клик класс is-disabled
    if (event.target.classList.contains(params.dropDownDisabled)) {
      // Удаляем классы is-active и is-disabled
      event.target.classList.remove(params.dropDownDisabled, params.dropDownActive);
      // Удаляем событие анимации
      event.target.removeEventListener("animationend", onDisable);
    }
  }


  function setMenuListener() {
    // При клике на body активируем функцию
    document.body.addEventListener("click", (event) => {

      // записываем в константу кнопку и список на которых висит класс is-active
      const activeElements = document.querySelectorAll(`.${params.btnArt}.${params.dropDownActive}, .${params.dropArtist}.${params.dropDownActive}`);

      // если количество элементов в константе activeElements не равно 0 и элемент на котором произошло событие имеет не класс is-active
      if (activeElements.length && !event.target.closest(`.${params.dropDownActive}`)) {
        // Перебираем элементы в константе activeElements
        activeElements.forEach((current) => {
          // если элемент на котором произошло событие - кнопка
          if (current.classList.contains(params.btnArt)) {
            // Удаляем с этого элемента класс is-active
            current.classList.remove(params.dropDownActive);
          } else {
            // Иначе добавляем элементу класс is-disabled
            current.classList.add(params.dropDownDisabled);
          }
        });
      }

      // Если элемент на котором произошло событие - кнопка
      if (event.target.closest(`.${params.btnArt}`)) {
        // записываем в константу кнопку на которой произошло событие
        const btn = event.target.closest(`.${params.btnArt}`);
        // Записываем в константу значение атрибута path кнопки на которой произошло событие
        const path = btn.dataset.path;
        // Записываем в константу список у которого значение атрибута data соответствует значению атрибута data у кнопки на которой произошло событие
        const drop = document.querySelector(`.${params.dropArtist}[data-target-list="${path}"]`);

        // Переключаем у кнопки по которой произошел клик класс is-active
        btn.classList.toggle(params.dropDownActive);

        // Если список который должен открыться/закрыться не имеет класса is-active
        if (!drop.classList.contains(params.dropDownActive)) {
          // Добавляем ему этот класс
          drop.classList.add(params.dropDownActive);
          // Добавляем событие закрытия анимации
          drop.addEventListener("animationend", onDisable);
        } else {
          // иначе добавляем класс is-disabled
          drop.classList.add(params.dropDownDisabled);
        }
      }
    });
  }

  setMenuListener();
})
