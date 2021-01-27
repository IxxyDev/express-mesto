const jwt = require('jsonwebtoken');
const { createError } = require('../helpers/errors');
const { ERROR_MESSAGE, ERROR_CODE } = require('../utils/constants');

const { TOKEN_SECRET_KEY = 'token-secret-key' } = process.env;

module.exports = (req, res, next) => {
  const { authorization = '' } = req.headers;

  if (!authorization && !authorization.startsWith('Bearer ')) {
    return next(createError(ERROR_MESSAGE.INCORRECT_LOGIN_DATA, ERROR_CODE.UNATHORIZED));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, TOKEN_SECRET_KEY);
  } catch (error) {
    next(createError(error, ERROR_MESSAGE.INCORRECT_LOGIN_DATA, ERROR_CODE.UNATHORIZED));
  }

  req.user = payload;
  return next();
};
