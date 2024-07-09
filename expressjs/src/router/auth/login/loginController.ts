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
  CommonRequestParams,
  CustomRequest,
  CustomResponse,
} from "@/shared/types/expressCore";
import logger from "@/shared/utils/logger";
import { StatusCodes } from "http-status-codes";
import { loginService } from "./loginService";

class LoginController extends CommonController {
  postLogin = async (
    req: CustomRequest<
      CommonRequestParams,
      PostLoginResponseBody | PostLoginErrorResponseBody,
      PostLoginRequestBody
    >,
    res: CustomResponse<PostLoginResponseBody | PostLoginErrorResponseBody>
  ): Promise<void> => {
    try {
      const loginRes = await loginService.postLogin(req);

      if (!loginRes) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send({ message: "Invalid credentials" });
      } else {
        res
          .status(StatusCodes.OK)
          .send({ message: "login success", token: "t0ken" });
      }
    } catch (error) {
      logger.error(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: "Internal server error" });
    }
  };
}

export default new LoginController();
