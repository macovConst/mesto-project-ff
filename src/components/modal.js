import {
  nameInput,
  jobInput,
  profileDescription,
  profileTitle,
} from "../index.js";

export const checkKey = (evt, popup) => {
  if (evt.key === 'Escape') {
    closeModal(popup);
  };
}

export const openModal = (popup) => {
  popup.classList.add('popup_is-animated');
  setTimeout(() => popup.classList.add('popup_is-opened'), 100);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  document.addEventListener('keydown', (evt) => checkKey(evt, popup));
}

export const closeModal = (popup) => {
  if (
    popup.classList.contains('popup__close') ||
    popup.classList.contains('popup_is-opened') ||
    popup.classList.contains('popup__button')
  ) {

    popup.closest('.popup').classList.remove('popup_is-opened');
    setTimeout(() => popup.closest('.popup').classList.remove('popup_is-animated'), 1000);
    document.removeEventListener('keydown', checkKey);
  };
}


