const regExpUrl = /https?:\/\/(www\.)?([-a-z0-9]+\.)([0-9a-z].*)/;

const validateUrl = (url) => regExpUrl.test(url);

module.exports = {
  validateUrl,
};
