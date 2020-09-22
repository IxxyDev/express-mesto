const { CustomErr } = require('../utils/CustomErr');
const { ERROR_CODE } = require('../utils/constants');

const createError = (error, message, status) => {
  throw new CustomErr({ message: `${message} : ${error.message}`, status });
};

const errHandler = (error, messageBadReq, messageNotFound) => {
  if (error.name === 'CastError') {
    createError(error, messageNotFound, ERROR_CODE.NOT_FOUND);
  }

  createError(error, messageBadReq, ERROR_CODE.INCORRECT_DATA);
};

module.exports = {
  createError,
  errHandler,
};
