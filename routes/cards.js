const express = require('express');
const { getCards } = require('../controllers/cards.js');

const cardsRouter = express.Router();
cardsRouter.get('/', getCards);

module.exports = cardsRouter;
