import { deleteCardFromServer, dislike, like } from "./api";

const cardTemplate = document.querySelector('#card-template').content;
const card = cardTemplate.querySelector('.places__item');

// @todo: Функция создания карточки
export const createCard = (
  item,
  clickDeleteFunction,
  clickLikeFunction,
  clickShowFunction,
  userId
) => {

  const newCard = card.cloneNode(true);
  const cardImage = newCard.querySelector('.card__image');
  const cardTitle = newCard.querySelector('.card__title');
  const cardDeleteButton = newCard.querySelector('.card__delete-button');
  const cardLikeButton = newCard.querySelector('.card__like-button');
  const cardLikesCounter = newCard.querySelector('.card__like-counter');

  cardImage.src = item.link;
  cardImage.alt = `Картинка с ${item.name}`;
  cardTitle.textContent = item.name;
  cardLikesCounter.textContent = item.likes.length
  cardDeleteButton.addEventListener('click', () => clickDeleteFunction(cardDeleteButton, '.card', item._id));
  cardLikeButton.addEventListener('click', () => clickLikeFunction(cardLikeButton, cardLikesCounter, item._id));
  cardImage.addEventListener('click', () => clickShowFunction(cardImage.src, cardImage.alt));

  if (userId && userId !== item.owner._id) {
    cardDeleteButton.remove();
  }
  if (item.likes.some(user => user._id === userId)) {
    cardLikeButton.classList.add('card__like-button_is-active')
  }

  return newCard;
}

// @todo: Функция удаления карточки
export const removeCard = (element, parent, id) => {
  deleteCardFromServer(id)
    .then(() => element.closest(parent).remove())
    .catch((err) => { console.log(err) });
};
// @todo: переключатель лайка карточки;
export const likeCard = (element, counter, id) => {
  element.classList.toggle('card__like-button_is-active') ? addLike(id, counter) : removeLike(id, counter);
};

// Лайк поставлен
const addLike = (id, counter) => {
  like(id)
    .then(res => counter.textContent = res.likes.length)
    .catch((err) => { console.log(err) });
}

// Лайк убран
const removeLike = (id, counter) => {
  dislike(id)
    .then(res => counter.textContent = res.likes.length)
    .catch((err) => { console.log(err) });
}

