class BadRequestErr extends Error {
  constructor(message, ...args) {
    super(args);
    this.status = 400;
    this.message = message;
  }
}

module.exports = BadRequestErr;
