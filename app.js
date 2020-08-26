const express = require('express');
const path = require('path');
const app = express();
const { PORT = 3000 } = process.env;
const cardsRouter  = require('./routes/cards');
const usersRouter = require('./routes/users');
const notFoundRouter = require('./routes/404notFound');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/cards',cardsRouter);
app.use('/users', usersRouter);
app.use('/*', notFoundRouter);


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})