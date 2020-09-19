const express = require('express');
const {
  getUsers, getUser, createUser, updateUser, updateUserAvatar,
} = require('../controllers/users.js');

const usersRouter = express.Router();
usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUser);
usersRouter.post('/users', createUser);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateUserAvatar);

module.exports = usersRouter;
