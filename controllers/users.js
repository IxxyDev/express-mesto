const getFile = require('../utils/getFile');
const path = require('path');

const getUsers = (req, res) => getFile(path.join(__dirname, '../data/users.json'))
  .then(users => {
    res
    .status(200)
    .send(JSON.parse(users))
  }).catch(err => {
    res
      .status(500)
      .send({ message: `Упс, ошибочка ${err}` })
  });

  const getUser = (req, res) => getFile(path.join(__dirname, '../data/users.json'))
    .then(user => {
      const currentUser = JSON.parse(user.find(item => item._id === req.params.id));
      console.log(currentUser);
      if (currentUser) {
        return res
          .status(200)
          .send(currentUser);
      }
        res
          .status(404)
          .send({ message: 'Такого пользователя нет'});
    })
    .catch(err => {
      res
      .status(500)
      .send({ message: `Упс, ошибочка ${err}` })
    })

  module.exports = { getUsers, getUser };