import { initialCards } from './scripts/cards.js';
import { deleteCard, createCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import './pages/index.css';




const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonsCloseModal = document.querySelectorAll('.popup__close');
const overlayList = document.querySelectorAll('.popup');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupShow = document.querySelector('.popup_type_image');

const popupImg = popupShow.querySelector('.popup__image');
const popupText = popupShow.querySelector('.popup__caption');

// Находим форму в DOM
const formElementEdit = document.forms.edit_profile;
const formElemenNewPlace = document.forms.new_place;

// Находим поля формы в DOM
const nameInput = formElementEdit.querySelector('.popup__input_type_name');
const jobInput = formElementEdit.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const placeNameInput = formElemenNewPlace.querySelector('.popup__input_type_card-name');
const placeLinkInput = formElemenNewPlace.querySelector('.popup__input_type_url');

// @todo: Темплейт карточки
const placesList = document.querySelector('.places__list');

// @todo: Функция просмотра карточки
const showCard = (src, alt) => {
  openModal(popupShow);
  popupImg.setAttribute('src', src);
  popupImg.setAttribute('alt', alt);
  popupText.textContent = alt;

};
// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  placesList.append(createCard(
    item,
    deleteCard,
    likeCard,
    showCard,
  ));
});


// Слушатель Редактировать профиль
buttonEdit.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit);
});

// Слушатель Добавить карточку
buttonAdd.addEventListener('click', () => {
  openModal(popupAdd);
});

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
  ));
  formElemenNewPlace.reset();
  closeModal(evt.target);
}

formElementEdit.addEventListener('submit', handleFormSubmitEdit);
formElemenNewPlace.addEventListener('submit', handleFormSubmitNewPlace);

overlayList.forEach((button) => {
  button.addEventListener('click', (evt) => { if (evt.target === button) closeModal(evt.target) });
});

buttonsCloseModal.forEach((button) => {
  button.addEventListener('click', (evt) => closeModal(evt.target));
});

