const Card = require('../models/card');
const { createError } = require('../helpers/errors');
const { ERROR_MESSAGE, ERROR_CODE } = require('../utils/constants');

const getCards = (req, res, next) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((error) => createError(
      error,
      ERROR_MESSAGE.INCORRECT_CARD_DATA,
      ERROR_CODE.INCORRECT_DATA,
    ))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((error) => createError(error, ERROR_MESSAGE.CARD_NOT_FOUND, ERROR_CODE.NOT_FOUND))
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail()
    .then((likes) => res.send({ data: likes }))
    .catch((error) => createError(error, ERROR_MESSAGE.CARD_NOT_FOUND, ERROR_CODE.NOT_FOUND))
    .catch(next);
};

const unlikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail()
    .then((likes) => res.send({ data: likes }))
    .catch((error) => createError(error, ERROR_MESSAGE.CARD_NOT_FOUND, ERROR_CODE.NOT_FOUND))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
