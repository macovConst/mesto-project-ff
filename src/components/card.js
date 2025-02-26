import { deleteCardFromServer, dislike, like } from "./api";

const cardTemplate = document.querySelector('#card-template').content;
const card = cardTemplate.querySelector('.places__item');

// @todo: Функция создания карточки
export const createCard = (
  item,
  clickDeletteFunction,
  clickLikeFunction,
  clickShowFunction,
  userId
) => {

  const newCard = card.cloneNode(true);
  const cardImage = newCard.querySelector('.card__image');
  const cardTitle = newCard.querySelector('.card__title');
  const cardDeletteButton = newCard.querySelector('.card__delete-button');
  const cardLikeButton = newCard.querySelector('.card__like-button');
  const cardShowButton = newCard.querySelector('.card__image');
  const cardLikesCounter = newCard.querySelector('.card__like-counter');

  cardImage.src = item.link;
  cardImage.alt = `Картинка с ${item.name}`;
  cardTitle.textContent = item.name;
  cardLikesCounter.textContent = 0;
  cardDeletteButton.addEventListener('click', () => clickDeletteFunction(cardDeletteButton, '.card', item._id));
  cardLikeButton.addEventListener('click', () => clickLikeFunction(cardLikeButton, cardLikesCounter, item._id));
  cardShowButton.addEventListener('click', () => clickShowFunction(cardImage.src, cardImage.alt));

  if (userId && userId !== item.owner._id) {
    cardDeletteButton.remove();
  }

  if (userId) {
    cardLikesCounter.textContent = item.likes.length
    if (item.likes.some(user => user._id === userId)) {
      cardLikeButton.classList.add('card__like-button_is-active')
    }
  }
  return newCard;
}

// @todo: Функция удаления карточки
export const removeCardFromDOM = (element, parent, id) => {
  element.closest(parent).remove();
  deleteCardFromServer(id).catch((err) => { console.log(err) });
};
// @todo: переключатель лайка карточки;
export const likeCard = (element, counter, id) => {
  element.classList.toggle('card__like-button_is-active') ? isLiked(id, counter) : isDisliked(id, counter);
};

// Лайк поставлен
const isLiked = (id, counter) => {
  like(id)
    .then(res => counter.textContent = res.likes.length)
    .catch((err) => { console.log(err) });
  counter.textContent++;
}

// Лайк убран
const isDisliked = (id, counter) => {
  dislike(id)
    .then(res => counter.textContent = res.likes.length)
    .catch((err) => { console.log(err) });
  counter.textContent--;
}

