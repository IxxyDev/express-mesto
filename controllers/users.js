const path = require('path');
const getFile = require('../utils/getFile');

const getUsers = (req, res) => getFile(path.join(__dirname, '../data/users.json'))
  .then((users) => {
    res
      .status(200)
      .send(JSON.parse(users));
  }).catch((err) => {
    res
      .status(500)
      .send({ message: `Упс, ошибочка ${err}` });
  });

const getUser = (req, res) => getFile(path.join(__dirname, '../data/users.json'))
  .then((user) => {
    const userData = JSON.parse(user);
    const currentUser = userData.find((item) => item._id === req.params.id);
    if (currentUser) {
      return res
        .status(200)
        .send(currentUser);
    }
    return res
      .status(404)
      .send({ message: 'Нет пользователя с таким id' });
  })
  .catch((err) => {
    res
      .status(500)
      .send({ message: `Упс, ошибочка ${err}` });
  });

module.exports = { getUsers, getUser };
