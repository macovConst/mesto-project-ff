import {
  checkKey,
  nameInput,
  jobInput,
  profileDescription,
  profileTitle,
} from "../index.js";

export const openModal = (popup) => {
  popup.classList.add('popup_is-animated');
  setTimeout(() => popup.classList.add('popup_is-opened'), 100);
  if (popup.classList.contains('popup_type_edit')) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  };
  if (popup.classList.contains('popup_type_new-card')) console.log('is new card');


}

export const closeModal = (target) => {
  if (
    target.classList.contains('popup__close') ||
    target.classList.contains('popup_is-opened') ||
    target.classList.contains('popup__button')
  ) {

    target.closest('.popup').classList.remove('popup_is-opened');
    setTimeout(() => target.closest('.popup').classList.remove('popup_is-animated'), 1000);
    document.removeEventListener('keydown', checkKey);
  };
}
