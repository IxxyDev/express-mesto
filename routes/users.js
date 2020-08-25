const express = require('express');
const { getAllUsers, getUser } = require('../controllers/users.js');

const usersRouter = express.Router();
usersRouter.get('/', getAllUsers);
usersRouter.get('/:id',getUser);

module.exports = usersRouter;