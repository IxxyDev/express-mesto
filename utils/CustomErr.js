class customErr extends Error {
  constructor(message, status, ...args) {
    super(args);
    this.status = status;
    this.message = message;
  }
}

module.exports = customErr;
