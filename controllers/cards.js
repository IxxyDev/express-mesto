const path = require('path');
const getFile = require('../utils/getFile');

const getCards = (req, res) => getFile(path.join(__dirname, '../data/cards.json'))
  .then((cards) => {
    res
      .status(200)
      .send(JSON.parse(cards));
  }).catch((err) => {
    res
      .status(500)
      .send({ message: `Упс, ошибочка ${err}` });
  });

module.exports = { getCards };
