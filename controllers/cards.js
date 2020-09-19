const { Card } = require('../models/card');
const { createBadRequestErr, createNotFoundErr } = require('../helpers/errors');

const getCards = (req, res, next) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((error) => createBadRequestErr(error, error.message.INCORRECT_CARD_DATA))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((error) => error.message.CARD_NOT_FOUND)
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail()
    .then((likes) => res.send({ data: likes }))
    .catch((error) => createNotFoundErr(error, error.message.CARD_NOT_FOUND))
    .catch(next);
};

const unlikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail()
    .then((likes) => res.send({ data: likes }))
    .catch((error) => createNotFoundErr(error, error.message.CARD_NOT_FOUND))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
