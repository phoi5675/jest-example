// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { PostLoginController } from "@/router/auth/login/loginInterface";
import logger from "@/shared/utils/logger";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import loginService from "./loginService";

class LoginController {
  /**
   * postLogin메소드는 클라이언트의 로그인 요청을 처리하는 메소드입니다.
   * @param {PostLoginRequest} req - PostLoginRequest은 클라이언트의 HTTP POST 요청을 나타냅니다.
   * @param {(PostLoginResponse | PostLoginErrorResponse)} res - PostLoginResponse 또는 PostLoginErrorResponse는 서버의 HTTP POST 응답을 나타냅니다.
   * @return {Promise<void>}
   */
  postLogin: PostLoginController = async (
    // TODO: Request, Response custom type 생성하기
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const loginRes = await loginService.postLogin(req);

      if (!loginRes) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Invalid credentials" });
      } else {
        res
          .status(StatusCodes.OK)
          .json({ message: "login success", token: "t0ken" });
      }
    } catch (error) {
      logger.error(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  };
}

export default new LoginController();
