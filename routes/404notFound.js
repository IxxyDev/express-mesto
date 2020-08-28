const notFoundRouter = require('express').Router();

notFoundRouter.all('/', (req, res) => {
  res
    .status(404)
    .send({message: 'Страница не найдена'})
});

module.exports = notFoundRouter;