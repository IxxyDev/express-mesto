const express = require('express');
const {
  getUsers, getUser, updateUser, updateUserAvatar,
} = require('../controllers/users.js');

const usersRouter = express.Router();
usersRouter.get('/', getUsers);
usersRouter.get('/:_id', getUser);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateUserAvatar);

module.exports = usersRouter;
