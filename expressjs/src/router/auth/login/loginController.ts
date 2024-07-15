// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  PostLoginErrorResponseBody,
  PostLoginRequestBody,
  PostLoginResponseBody,
} from "@/router/auth/login/loginInterface";
import { CommonController } from "@/shared/class/handlerClass";
import {
  CommonRequest,
  CommonRequestParams,
  CommonResponse,
} from "@/shared/types/ExpressCore";
import logger from "@/shared/utils/logger";
import { NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { loginService } from "./loginService";

class LoginController extends CommonController {
  postLogin = async (
    req: CommonRequest<
      CommonRequestParams,
      PostLoginResponseBody | PostLoginErrorResponseBody,
      PostLoginRequestBody
    >,
    res: CommonResponse<PostLoginResponseBody | PostLoginErrorResponseBody>,
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
