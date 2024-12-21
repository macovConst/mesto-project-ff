import { initialCards } from './cards.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');


// @todo: Функция удаления карточки
const deleteCard = (element, parent) => element.closest(parent).remove();

// @todo: DOM узлы
let card = cardTemplate.querySelector('.places__item');

// @todo: Функция создания карточки
const createCard = (item) => {
  let newCard = card.cloneNode(true);
  let cardImage = newCard.querySelector('.card__image');
  let cardTitle = newCard.querySelector('.card__title');
  let cardButton = newCard.querySelector('.card__delete-button');

  cardImage.src = item.link;
  cardImage.alt = `Картинка с ${item.name}`;
  cardTitle.textContent = item.name;
  cardButton.addEventListener('click', () => deleteCard(cardButton, '.card'));

  return newCard;
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  placesList.append(createCard(item));
})
