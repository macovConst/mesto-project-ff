import { initialCards } from './scripts/cards.js';
import { deleteCard, createCard, likeCard, showCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import './pages/index.css';


const cardTemplate = document.querySelector('#card-template').content;
export let card = cardTemplate.querySelector('.places__item');

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');

// @todo: Темплейт карточки
const placesList = document.querySelector('.places__list');


// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  placesList.append(createCard(item, deleteCard, likeCard, showCard));
});


export const checkKey = (evt, popup) => {
  if (evt.key === 'Escape') {
    closeModal(popup);
  };
}
// Слушатель Редактировать профиль
buttonEdit.addEventListener('click', () => {
  openModal(popupEdit);
  popupEdit.addEventListener('click', (evt) => closeModal(evt.target));
  document.addEventListener('keydown', (evt) => checkKey(evt, popupEdit));
});

// Слушатель Добавить карточку
buttonAdd.addEventListener('click', () => {
  openModal(popupAdd);
  popupAdd.addEventListener('click', (evt) => closeModal(evt.target));
  document.addEventListener('keydown', (evt) => checkKey(evt, popupAdd));
});

// Находим форму в DOM
const formElementEdit = document.forms.edit_profile;
const formElemenNewPlace = document.forms.new_place;

// Находим поля формы в DOM
export const nameInput = formElementEdit.querySelector('.popup__input_type_name');
export const jobInput = formElementEdit.querySelector('.popup__input_type_description');
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
const placeNameInput = formElemenNewPlace.querySelector('.popup__input_type_card-name');
const placeLinkInput = formElemenNewPlace.querySelector('.popup__input_type_url');


// Обработчик «отправки» формы редактировать пользователя
function handleFormSubmitEdit(evt) {
  evt.preventDefault();

  let name = nameInput.value;
  let job = jobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;;
  closeModal(evt.target);
}

// Обработчик «отправки» формы добавить изображение
function handleFormSubmitNewPlace(evt) {
  evt.preventDefault();
  let name = placeNameInput.value;
  let link = placeLinkInput.value;
  let card = {
    name: "" + name,
    link: "" + link,
  }
  placesList.prepend(createCard(card, deleteCard, likeCard, showCard));
  placeNameInput.value = null;
  placeLinkInput.value = null;
  closeModal(evt.target);
}

formElementEdit.addEventListener('submit', handleFormSubmitEdit);
formElemenNewPlace.addEventListener('submit', handleFormSubmitNewPlace);

