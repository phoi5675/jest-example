// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  PostLoginReq,
  PostLoginRes,
} from "@/router/auth/login/types/PostLogin";
import { BaseController } from "@/shared/class/handlerClass";
import logger from "@/shared/utils/logger";
import { NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { loginService } from "./loginService";

class LoginController extends BaseController {
  postLogin = async (
    req: PostLoginReq,
    res: PostLoginRes,
    next: NextFunction
  ): Promise<void> => {
    try {
      const loginRes = await loginService.postLogin(req);

      if (!loginRes) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send({ message: "Invalid credentials" });
        return next("router");
      } else {
        res
          .status(StatusCodes.OK)
          .set("token", loginRes.token)
          .set("logined-at", loginRes["logined-at"])
          .send({ message: "login success" });
        next();
      }
    } catch (error) {
      logger.error(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: "Internal server error" });
      return next("router");
    }
  };
}

export default new LoginController();
