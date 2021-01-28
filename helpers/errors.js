const { CustomErr } = require('../utils/CustomErr');
const { ERROR_CODE } = require('../utils/constants');

const createError = (error = 'Ошибка', msg, statusCode) => {
  throw new CustomErr(`${msg} : ${error.message}`, statusCode);
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
