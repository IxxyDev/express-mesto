class CustomErr extends Error {
  constructor(status, message, ...args) {
    super(args);
    this.status = status;
    this.message = message;
  }
}

module.exports = {
  CustomErr,
};
