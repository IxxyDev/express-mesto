const User = require('../models/user');
const { createNotFoundErr, createBadRequestErr, errHandler } = require('../helpers/errors');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params._id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((error) => createNotFoundErr(error, error.message.USER_NOT_FOUND))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((error) => createBadRequestErr(error, error.message.INCORRECT_USER_DATA))
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
    .then((user) => res.send({ data: user }))
    .catch((error) => errHandler(error,
      error.message.INCORRECT_USER_DATA,
      error.message.USER_NOT_FOUND))
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
      error.message.INCORRECT_USER_DATA,
      error.message.USER_NOT_FOUND))
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
};
