import { initialCards } from './cards.js';

// @todo: Темплейт карточки
let cardTemplate = document.querySelector('#card-template').content;
let placesList = document.querySelector('.places__list');


// @todo: Функция удаления карточки
let deleteCard = (element, parent) => element.closest(parent).remove();

// @todo: DOM узлы
let card = cardTemplate.querySelector('.places__item');

// @todo: Функция создания карточки

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {

  let newCard = card.cloneNode(true);
  let cardImage = newCard.querySelector('.card__image');
  let cardTitle = newCard.querySelector('.card__title');
  let cardButton = newCard.querySelector('.card__delete-button');

  cardImage.src = item.link;
  cardTitle.textContent = item.name;
  cardButton.addEventListener('click', () => deleteCard(cardButton, '.card'));
  placesList.append(newCard);
})
