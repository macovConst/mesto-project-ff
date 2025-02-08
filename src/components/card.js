import { card } from "../";
import { openModal, closeModal } from "./modal";
import { checkKey, correntOpenPopup } from "../";




// @todo: Функция создания карточки
export const createCard = (item, clickDeletteFunction, clickLikeFunction, clickShowFunction) => {
  let newCard = card.cloneNode(true);
  let cardImage = newCard.querySelector('.card__image');
  let cardTitle = newCard.querySelector('.card__title');
  let cardDeletteButton = newCard.querySelector('.card__delete-button');
  let cardLikeButton = newCard.querySelector('.card__like-button');
  let cardShowButton = newCard.querySelector('.card__image');
  let popupShow = document.querySelector('.popup_type_image');


  cardImage.src = item.link;
  cardImage.alt = `Картинка с ${item.name}`;
  cardTitle.textContent = item.name;
  cardDeletteButton.addEventListener('click', () => clickDeletteFunction(cardDeletteButton, '.card'));
  cardLikeButton.addEventListener('click', () => clickLikeFunction(cardLikeButton));
  cardShowButton.addEventListener('click', () => clickShowFunction(popupShow, cardImage.src, cardImage.alt));
  return newCard;
}

// @todo: Функция удаления карточки
export const deleteCard = (element, parent) => element.closest(parent).remove();
// @todo: Лайк удаления карточки
export const likeCard = (element) => element.classList.toggle('card__like-button_is-active');
// @todo: Функция просмотра карточки
export const showCard = (element, src, alt) => {
  openModal(element);
  let popupImg = element.querySelector('.popup__image');
  let popupText = element.querySelector('.popup__caption');
  popupImg.setAttribute('src', src);
  popupImg.setAttribute('alt', alt);
  popupText.textContent = alt;
  element.addEventListener('click', (evt) => closeModal(evt.target));
  document.addEventListener('keydown', (evt) => checkKey(evt, element));

};
