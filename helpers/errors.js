const BadRequestErr = require('../utils/BadRequestErr');
const NotFoundErr = require('../utils/NotFoundErr');

const createBadRequestErr = (error, message) => {
  throw new BadRequestErr({ message: `${message} : ${error.message}` });
};

const createNotFoundErr = (error, message) => {
  throw new NotFoundErr({ message: `${message} : ${error.message}` });
};

const errHandler = (error, messageBadReq, messageNotFound) => {
  if (error.name === 'CastError') {
    createNotFoundErr(error, messageNotFound);
  }

  createBadRequestErr(error, messageBadReq);
};

module.exports = {
  createBadRequestErr,
  createNotFoundErr,
  errHandler,
};
