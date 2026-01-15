import { deleteCardApi, changeLikeCardStatus } from "../api.js";

export const likeCard = (likeButton) => {
  const cardElement = likeButton.closest('.card');
  const cardId = cardElement.dataset.cardId;
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const likeCountElement = cardElement.querySelector('.card__like-count');

  changeLikeCardStatus(cardId, isLiked)
    .then((updatedCard) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCountElement.textContent = updatedCard.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteCard = (cardElement) => {
  const cardId = cardElement.dataset.cardId;
  return deleteCardApi(cardId)
    .then(() => {
      cardElement.remove();
    });
};

const getTemplate = () => {
  return document
    .getElementById("card-template")
    .content.querySelector(".card")
    .cloneNode(true);
};

export const createCardElement = (
  data,
  { onPreviewPicture, onLikeIcon, onDeleteCard, userId }
) => {
  const cardElement = getTemplate();
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__control-button_type_delete");
  const cardImage = cardElement.querySelector(".card__image");
  const likeCountElement = cardElement.querySelector('.card__like-count');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__title").textContent = data.name;
  cardElement.dataset.cardId = data._id;

  likeCountElement.textContent = data.likes.length;

  const isLikedByUser = data.likes.some(like => like._id === userId);
  if (isLikedByUser) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (data.owner._id !== userId) {
    deleteButton.remove();
  }

  if (onLikeIcon) {
    likeButton.addEventListener("click", () => onLikeIcon(likeButton));
  }

  if (onDeleteCard) {
    deleteButton.addEventListener("click", () => onDeleteCard(cardElement));
  }

  if (onPreviewPicture) {
    cardImage.addEventListener("click", () => onPreviewPicture({name: data.name, link: data.link}));
  }

  return cardElement;
};
