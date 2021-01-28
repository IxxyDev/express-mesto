const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, CelebrateError } = require('celebrate');
const { ERROR_CODE, ERROR_MESSAGE } = require('./utils/constants');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const auth = require('./middlewares/auth.js');
const { createUser, login } = require('./controllers/users.js');
const notFoundRouter = require('./routes/404notFound');
const { createError } = require('./helpers/errors');

const app = express();
const { PORT = 3005 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userJoiSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

app.post('/signup', celebrate(userJoiSchema), createUser);
app.post('/signin', celebrate(userJoiSchema), login);

app.use('/cards', auth, cardsRouter);
app.use('/users', auth, usersRouter);
app.use('/*', notFoundRouter);

app.use((error, req, res, next) => {
  let err = error;
  if (err instanceof CelebrateError) {
    err = createError(err, ERROR_MESSAGE.BAD_REQUEST, ERROR_CODE.INCORRECT_DATA);
    res.status(error.status).send({ message: error.message });
    return;
  }
  res.status(error.status).send({ message: `${ERROR_MESSAGE.SERVER_ERROR}` });
  // теперь линтер страшно ругается на отсутствие next(), а из параметров тоже нельзя убрать
});

app.use((req, res) => {
  res
    .status(ERROR_CODE.NOT_FOUND)
    .send({ message: ERROR_MESSAGE.NOT_FOUND });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on ${PORT}`);
});
