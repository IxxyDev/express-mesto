const BadRequestErr = require('../utils/BadRequestErr');
const NotFoundErr = require('../utils/NotFoundErr');

const createBadRequestErr = (error, message) => {
  throw new BadRequestErr({ message: `${message} : ${error.message}` });
};

const createNotFoundErr = (error, message) => {
  throw new NotFoundErr({ message: `${message} : ${error.message}` });
};

const errHandler = (error, message) => {
  if (error.name === 'CastError') {
    createNotFoundErr(error, message);
  }

  createBadRequestErr(error, message);
};

module.exports = {
  createBadRequestErr,
  createNotFoundErr,
  errHandler,
};
