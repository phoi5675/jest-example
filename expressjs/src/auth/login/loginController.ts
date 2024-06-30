// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  PostLoginErrorResponse,
  PostLoginRequest,
  PostLoginResponse,
} from "@auth/login/loginInterface";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class LoginController {
  async postLogin(
    req: Request<PostLoginRequest>,
    res: Response<PostLoginResponse | PostLoginErrorResponse>
  ) {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid request" });
    }
  }
}

export default new LoginController();
