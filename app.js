const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, CelebrateError } = require('celebrate');
const { ERROR_CODE, ERROR_MESSAGE } = require('./utils/constants');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const auth = require('./middlewares/auth.js');
const { createUser, login } = require('./controllers/users.js');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createError } = require('./errors/errors');

const app = express();
const { PORT = 3005 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

const userJoiSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate(userJoiSchema), createUser);
app.post('/signin', celebrate(userJoiSchema), login);

app.use('/cards', auth, cardsRouter);
app.use('/users', auth, usersRouter);

app.all('/*', (req, res, next) => {
  next(createError(ERROR_MESSAGE.NOT_FOUND, ERROR_CODE.NOT_FOUND));
});

app.use(errorLogger);

app.use((error, req, res, next) => {
  let err = error;
  if (err instanceof CelebrateError) {
    err = createError(err, ERROR_MESSAGE.BAD_REQUEST, ERROR_CODE.INCORRECT_DATA);
  }
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on ${PORT}`);
});
