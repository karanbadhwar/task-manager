import { NextFunction, Request, Response } from "express";
const { CustomAPIError } = require("../errors/custom-error");
const errorhandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({
      msg: err.message,
    });
  }

  res.status(500).json({
    msg: "Something went Wrong, try again later..",
  });
};

module.exports = errorhandler;
