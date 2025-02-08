import { initialCards } from './scripts/cards.js';
import { deleteCard, createCard, likeCard, showCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import './pages/index.css';




const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupShow = document.querySelector('.popup_type_image');

let popupImg = popupShow.querySelector('.popup__image');
let popupText = popupShow.querySelector('.popup__caption');

// @todo: Темплейт карточки
const placesList = document.querySelector('.places__list');


// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  placesList.append(createCard(
    item,
    deleteCard,
    likeCard,
    showCard,
    popupShow,
    popupText,
    popupImg));
});



// Слушатель Редактировать профиль
buttonEdit.addEventListener('click', () => {
  openModal(popupEdit);
});

// Слушатель Добавить карточку
buttonAdd.addEventListener('click', () => {
  openModal(popupAdd);
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

  const name = nameInput.value;
  const job = jobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;
  closeModal(evt.target);
}

// Обработчик «отправки» формы добавить изображение
function handleFormSubmitNewPlace(evt) {
  evt.preventDefault();
  const name = placeNameInput.value;
  const link = placeLinkInput.value;
  const card = {
    name: "" + name,
    link: "" + link,
  }
  placesList.prepend(createCard(
    card,
    deleteCard,
    likeCard,
    showCard,
    popupShow,
    popupText,
    popupImg));
  formElemenNewPlace.reset();
  closeModal(evt.target);
}

formElementEdit.addEventListener('submit', handleFormSubmitEdit);
formElemenNewPlace.addEventListener('submit', handleFormSubmitNewPlace);
popupAdd.addEventListener('click', (evt) => closeModal(evt.target));
popupEdit.addEventListener('click', (evt) => closeModal(evt.target));
popupShow.addEventListener('click', (evt) => closeModal(evt.target));

