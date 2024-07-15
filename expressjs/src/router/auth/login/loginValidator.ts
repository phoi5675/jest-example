// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { CommonValidator } from "@/shared/class/handlerClass";
import logger from "@/shared/utils/logger";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Joi from "joi";

class LoginValidator extends CommonValidator {
  async postLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      const validator = Joi.object({
        username: Joi.string().max(10).required(),
        password: Joi.string().min(6).max(15).required(),
      });

      const validationResult = validator.validate({ username, password });
      if (validationResult.error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Bad request" });
        return;
      }

      next();
    } catch (error) {
      logger.error(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });

      return next("router");
    }
  }
}

export default new LoginValidator();
