import { removeCardFromDOM, createCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import './pages/index.css';
import { clearValidation, enableValidation } from './components/validation.js';
import { addNewCard, changeAvatar, editUserProfile, getCards, getInfoUser } from './components/api.js';




const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonAvatar = document.querySelector('.profile__image');
const buttonsCloseModal = document.querySelectorAll('.popup__close');
const overlayList = document.querySelectorAll('.popup');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupShow = document.querySelector('.popup_type_image');
const popupAvatar = document.querySelector('.popup_type_new-avatar');

const popupImg = popupShow.querySelector('.popup__image');
const popupText = popupShow.querySelector('.popup__caption');

// Находим форму в DOM
const formElementEdit = document.forms.edit_profile;
const formElemenNewPlace = document.forms.new_place;
const formElemenNewAvatar = document.forms.new_avatar;

// Находим поля формы в DOM
const nameInput = formElementEdit.querySelector('.popup__input_type_name');
const jobInput = formElementEdit.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const placeNameInput = formElemenNewPlace.querySelector('.popup__input_type_card-name');
const placeLinkPlaceInput = formElemenNewPlace.querySelector('.popup__input_type_url');
const placeLinkAvatarInput = formElemenNewAvatar.querySelector('.popup__input_type_url');

// @todo: Темплейт карточки
const placesList = document.querySelector('.places__list');

// @todo: Функция просмотра карточки
const showCard = (src, alt) => {
  openModal(popupShow);
  popupImg.setAttribute('src', src);
  popupImg.setAttribute('alt', alt);
  popupText.textContent = alt;

};

// Слушатель Редактировать профиль
buttonEdit.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit);
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
  clearValidation(popupEdit, {
    submitButtonSelector: '.popup__button',
    inputSelector: '.popup__input',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
  })
});

// Слушатель Добавить карточку
buttonAdd.addEventListener('click', () => {
  openModal(popupAdd);
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
  clearValidation(popupAdd, {
    submitButtonSelector: '.popup__button',
    inputSelector: '.popup__input',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
  })
});

// Слушатель Изменить аватар
buttonAvatar.addEventListener('click', () => {
  openModal(popupAvatar);
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
  clearValidation(popupAvatar, {
    submitButtonSelector: '.popup__button',
    inputSelector: '.popup__input',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
  })
});

// Обработчик «отправки» формы редактировать пользователя
function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  const buttonSave = evt.target.querySelector('.popup__button');
  saveLoading(buttonSave, true);
  profileTitle.textContent = name;
  profileDescription.textContent = job;
  editUserProfile(name, job)
    .catch((err) => { console.log(err) })
    .finally(() => saveLoading(buttonSave, false));
  closeModal(evt.target);
}

// Обработчик «отправки» формы добавить изображение
function handleFormSubmitNewPlace(evt) {
  evt.preventDefault();
  const buttonSave = evt.target.querySelector('.popup__button');
  const name = placeNameInput.value;
  const link = placeLinkPlaceInput.value;
  saveLoading(buttonSave, true);
  addNewCard(name, link)
    .catch((err) => { console.log(err) })
    .finally(() => saveLoading(buttonSave, false));
  const card = {
    name: "" + name,
    link: "" + link,
  }
  // placesList.prepend(createCard(
  //   card,
  //   removeCardFromDOM,
  //   likeCard,
  //   showCard,
  // ));
  formElemenNewPlace.reset();
  closeModal(evt.target);
}
// Обработчик «отправки» формы обновить аватар
function handleFormSubmitNewAvatar(evt) {
  evt.preventDefault();
  const link = placeLinkAvatarInput.value;
  const buttonSave = evt.target.querySelector('.popup__button');
  saveLoading(buttonSave, true);
  changeAvatar(link)
    .catch((err) => { console.log(err) })
    .finally(() => saveLoading(buttonSave, false));
  formElemenNewAvatar.reset();
  closeModal(evt.target);
}

function saveLoading(buttonSave, isLoading) {
  if (isLoading) {
    buttonSave.textContent = 'Сохранение...';
  } else {
    buttonSave.textContent = 'Сохранить';
  }
}

formElementEdit.addEventListener('submit', handleFormSubmitEdit);
formElemenNewPlace.addEventListener('submit', handleFormSubmitNewPlace);
formElemenNewAvatar.addEventListener('submit', handleFormSubmitNewAvatar)

overlayList.forEach((button) => {
  button.addEventListener('click', (evt) => { if (evt.target === button) closeModal(evt.target) });
});

buttonsCloseModal.forEach((button) => {
  button.addEventListener('click', (evt) => closeModal(evt.target));
});

Promise.all([
  getInfoUser(),
  getCards()
])
  .then(([userData, cardsData]) => {
    document.querySelector('.profile__title').textContent = userData.name;
    document.querySelector('.profile__description').textContent = userData.about;
    document.querySelector('.profile__image').style.backgroundImage = `url(${userData.avatar})`;
    cardsData.forEach((card) => {
      placesList.append(createCard(
        card,
        removeCardFromDOM,
        likeCard,
        showCard,
        userData._id,
      ));
    });
  })
  .catch((err) => { console.log(err) });




