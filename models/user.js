const mongoose = require('mongoose');
const { validateUrl } = require('../helpers/validators');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (url) => validateUrl(url),
      message: 'Enter valid URL',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
