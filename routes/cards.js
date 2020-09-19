const express = require('express');
const {
  getCards, createCard, likeCard, deleteCard, unlikeCard,
} = require('../controllers/cards.js');

const cardsRouter = express.Router();
cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:id', deleteCard);

cardsRouter.delete('/:id/likes', unlikeCard);
cardsRouter.put('/:_id/liles/', likeCard);

module.exports = cardsRouter;
