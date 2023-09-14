class CustomAPIError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const createCustomError = (msg: string, status: number) => {
  return new CustomAPIError(msg, status);
};

module.exports = {
  createCustomError,
  CustomAPIError,
};
