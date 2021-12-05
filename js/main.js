const addAtrSelect = () => {
  const selects = document.querySelectorAll('.choices__list--dropdown .choices__list');
  selects.forEach(select => {
    select.classList.add('simplebar');
    select.setAttribute('data-simplebar', true);
  })
}

addAtrSelect();
