const { Card } = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id})
  .then((card) => res.send { data: card })
  .catch((error) => createError )
  .catch(next);
}

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  
  Card.findByIdAndRemove(cardId)
  .orFail(createCustomError)
}

module.exports = { getCards };
