const express = require('express');
const {
  getCards, createCard, likeCard, deleteCard, unlikeCard,
} = require('../controllers/cards.js');

const cardsRouter = express.Router();
cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCard);

cardsRouter.delete('/:cardId/likes', unlikeCard);
cardsRouter.put('/:cardIdlikes/', likeCard);

module.exports = cardsRouter;
