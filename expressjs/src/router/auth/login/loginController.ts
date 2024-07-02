// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  PostLoginController,
  PostLoginErrorResponse,
  PostLoginRequest,
  PostLoginResponse,
} from "@/router/auth/login/loginInterface";
import logger from "@/shared/utils/logger";
import { StatusCodes } from "http-status-codes";

class LoginController {
  postLogin: PostLoginController = async (
    req: PostLoginRequest,
    res: PostLoginResponse | PostLoginErrorResponse
  ) => {
    try {
      res
        .status(StatusCodes.OK)
        .json({ message: "login success", token: "t0ken" });
    } catch (error) {
      logger.error(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  };
}

export default new LoginController();
