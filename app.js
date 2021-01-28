require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { celebrate, Joi, CelebrateError } = require('celebrate');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const auth = require('./middlewares/auth.js');
const { createUser, login } = require('./controllers/users.js');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');
const BadReqError = require('./errors/BadReqError');

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
app.use(cors());
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
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);

app.use((error, req, res, next) => {
  let err = error;
  if (err instanceof CelebrateError) {
    err = new BadReqError();
  }
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on ${PORT}`);
});
