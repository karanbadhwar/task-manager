import { NextFunction, Request, Response, request } from "express";

const asyncWrapper = (
  fn: (req: Request, res: Response, next: NextFunction) => void
) => {
  // console.log("Invoked");

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.log(typeof error);

      next(error);
    }
  };
};

module.exports = asyncWrapper;
