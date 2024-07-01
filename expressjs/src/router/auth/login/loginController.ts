// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  PostLoginErrorResponse,
  PostLoginRequest,
  PostLoginResponse,
} from "@/auth/login/loginInterface";
import logger from "@/shared/utils/logger";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class LoginController {
  async postLogin(
    req: Request<PostLoginRequest>,
    res: Response<PostLoginResponse | PostLoginErrorResponse>
  ) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Invalid request" });
        return;
      }

      res
        .status(StatusCodes.OK)
        .json({ message: "login success", token: "t0ken" });
    } catch (error) {
      logger.error(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }
}

export default new LoginController();
