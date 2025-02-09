export const checkKey = (evt) => {
  console.log(evt.target)
  if (evt.key === 'Escape') {
    closeModal(document.querySelector(".popup__content_content_image"));
  };
}

export const openModal = (popup) => {
  popup.classList.add('popup_is-animated');
  setTimeout(() => popup.classList.add('popup_is-opened'), 100);

  document.addEventListener('keydown', checkKey);
}

export const closeModal = (popup) => {
  popup.closest('.popup').classList.remove('popup_is-opened');
  setTimeout(() => popup.closest('.popup').classList.remove('popup_is-animated'), 1000);
  document.removeEventListener('keydown', checkKey);
}


