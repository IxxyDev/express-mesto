const express = require('express');
const { getUsers, getUser, createUser } = require('../controllers/users.js');

const usersRouter = express.Router();
usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUser);
usersRouter.post('/users', createUser);

module.exports = usersRouter;
