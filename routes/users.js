const express = require('express');
const { getUsers, getUser } = require('../controllers/users.js');

const usersRouter = express.Router();
usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUser);

module.exports = usersRouter;
