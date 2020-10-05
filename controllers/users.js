const User = require('../models/user');
const { createError, errHandler } = require('../helpers/errors');
const { ERROR_MESSAGE, ERROR_CODE } = require('../utils/constants');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params._id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((error) => createError(error, ERROR_MESSAGE.USER_NOT_FOUND, ERROR_CODE.NOT_FOUND))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((error) => createError(
      error,
      ERROR_MESSAGE.INCORRECT_USER_DATA,
      ERROR_CODE.INCORRECT_DATA,
    ))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about, avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .orFail()
    .catch((error) => errHandler(error,
      ERROR_MESSAGE.USER_NOT_FOUND,
      ERROR_MESSAGE.INCORRECT_USER_DATA))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .orFail()
    .then((newAvatar) => res.send({ data: newAvatar }))
    .catch((error) => errHandler(error,
      ERROR_MESSAGE.USER_NOT_FOUND,
      ERROR_MESSAGE.INCORRECT_USER_DATA))
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
};
