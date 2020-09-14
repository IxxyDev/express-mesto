const express = require('express');
const path = require('path');
const { mongoose } = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const { PORT = 3000 } = process.env;
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const notFoundRouter = require('./routes/404notFound');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.use('/*', notFoundRouter);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
