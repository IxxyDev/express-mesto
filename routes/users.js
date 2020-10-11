const express = require('express');
const {
  getUsers, getUser, createUser, updateUser, updateUserAvatar,
} = require('../controllers/users.js');

const usersRouter = express.Router();
usersRouter.get('/', getUsers);
usersRouter.get('/:_id', getUser);
usersRouter.post('/', createUser);
usersRouter.patch('/:_id', updateUser);
usersRouter.patch('/me/avatar', updateUserAvatar);

module.exports = usersRouter;
