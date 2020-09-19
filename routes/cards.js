const express = require('express');
const {
  getCards, createCard, likeCard, deleteCard, unlikeCard,
} = require('../controllers/cards.js');

const cardsRouter = express.Router();
cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:_id', deleteCard);

cardsRouter.delete('/:_id/likes', unlikeCard);
cardsRouter.put('/:_id/likes/', likeCard);

module.exports = cardsRouter;
