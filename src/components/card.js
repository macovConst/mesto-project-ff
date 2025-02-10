const cardTemplate = document.querySelector('#card-template').content;
const card = cardTemplate.querySelector('.places__item');

// @todo: Функция создания карточки
export const createCard = (
  item,
  clickDeletteFunction,
  clickLikeFunction,
  clickShowFunction,
) => {

  const newCard = card.cloneNode(true);
  const cardImage = newCard.querySelector('.card__image');
  const cardTitle = newCard.querySelector('.card__title');
  const cardDeletteButton = newCard.querySelector('.card__delete-button');
  const cardLikeButton = newCard.querySelector('.card__like-button');
  const cardShowButton = newCard.querySelector('.card__image');


  cardImage.src = item.link;
  cardImage.alt = `Картинка с ${item.name}`;
  cardTitle.textContent = item.name;
  cardDeletteButton.addEventListener('click', () => clickDeletteFunction(cardDeletteButton, '.card'));
  cardLikeButton.addEventListener('click', () => clickLikeFunction(cardLikeButton));
  cardShowButton.addEventListener('click', () => clickShowFunction(cardImage.src, cardImage.alt));
  return newCard;
}

// @todo: Функция удаления карточки
export const deleteCard = (element, parent) => element.closest(parent).remove();
// @todo: Лайк удаления карточки
export const likeCard = (element) => element.classList.toggle('card__like-button_is-active');
