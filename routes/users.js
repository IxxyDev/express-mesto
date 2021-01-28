const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');
const {
  getUsers, getMe, getUserById, updateUser, updateUserAvatar,
} = require('../controllers/users.js');

const usersRouter = express.Router();
usersRouter.get('/', getUsers);
usersRouter.get('/me', getMe);
usersRouter.get('/:_id', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUserById);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((url, helpers) => {
      if (!isURL(url)) {
        return helpers.error('Ссылка невалидна');
      }
      return url;
    }),
  }),
}), updateUserAvatar);

module.exports = usersRouter;
