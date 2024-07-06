// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { CommonValidator } from "@/shared/class/handlerClass";
import logger from "@/shared/utils/logger";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class LoginValidator extends CommonValidator {
  async postLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Invalid request" });
        return;
      }

      next();
    } catch (error) {
      logger.error(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }
}

export default new LoginValidator();
