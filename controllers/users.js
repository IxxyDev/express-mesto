const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const UnathorizedError = require('../errors/UnathorizedError');

const { TOKEN_SECRET_KEY = 'token-secret-key' } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params._id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send({ data: user }))

    .catch(next);
};

const getMe = (req, res, next) => {
  const { _id: userId } = req.user;
  User.findById(userId)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, email, password, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, email, password: hash, avatar,
      })
        .then((user) => {
          const userWithNoPassword = user;
          userWithNoPassword.password = '';
          res.status(201).send({ data: userWithNoPassword });
        })
        .catch((error) => {
          if (error.name === 'MongoError' && error.code === 11000) {
            next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
          } else next(error);
        });
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const id = { _id: new mongoose.Types.ObjectId(req.user._id) };

  User.findByIdAndUpdate(
    id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((newAvatar) => res.send({ data: newAvatar }))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, TOKEN_SECRET_KEY, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => next(new UnathorizedError('Неверный email или пароль')));
};

module.exports = {
  getUsers,
  getMe,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
};
