let correntOpenPopup = null;

export const checkKey = (evt) => {
  if (evt.key === 'Escape') {
    closeModal(correntOpenPopup);
  };
}

export const openModal = (popup) => {
  popup.classList.add('popup_is-animated');
  setTimeout(() => popup.classList.add('popup_is-opened'), 100);
  document.addEventListener('keydown', checkKey);
  correntOpenPopup = popup;
}

export const closeModal = (popup) => {
  popup.closest('.popup').classList.remove('popup_is-opened');
  setTimeout(() => popup.closest('.popup').classList.remove('popup_is-animated'), 1000);
  document.removeEventListener('keydown', checkKey);
  correntOpenPopup = null;
}


