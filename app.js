const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const { PORT = 3000 } = process.env;
const { ERROR_CODE, ERROR_MESSAGE } = require('./utils/constants');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const notFoundRouter = require('./routes/404notFound');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.use('/*', notFoundRouter);

app.use((error, req, res, next) => {
  if (error.status !== ERROR_CODE.SERVER_ERROR) {
    res.status(error.status).send(error.message);
    return;
  }
  res.status(error.status).send(error.message);
  next();
});

app.use((req, res) => {
  res
    .status(ERROR_CODE.NOT_FOUND)
    .send({ message: ERROR_MESSAGE.NOT_FOUND });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
