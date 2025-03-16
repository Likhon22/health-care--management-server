import { NextFunction, Request, Response } from "express";
const parseBodyData = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = JSON.parse(req.body.data);
    next();
  } catch (err) {
    next(err);
  }
};

export default parseBodyData;
