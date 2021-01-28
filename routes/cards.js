const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');
const {
  getCards, createCard, likeCard, deleteCard, unlikeCard,
} = require('../controllers/cards.js');

const cardsRouter = express.Router();
cardsRouter.get('/', getCards);

cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((url, helpers) => {
      if (!isURL(url)) {
        return helpers.error('Ссылка невалидна');
      }
      return url;
    }),
  }),
}), createCard);

cardsRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), deleteCard);

cardsRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), unlikeCard);

cardsRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), likeCard);

module.exports = cardsRouter;
