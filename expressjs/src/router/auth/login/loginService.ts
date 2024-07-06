// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { userRepository } from "@/models/UserRepository";
import { CommonService } from "@/shared/class/handlerClass";
import { CommonRequestParams, CustomRequest } from "@/shared/types/expressCore";
import {
  PostLoginErrorResponseBody,
  PostLoginRequestBody,
  PostLoginResponseBody,
} from "./loginInterface";

class LoginService extends CommonService {
  postLogin = async (
    req: CustomRequest<
      CommonRequestParams,
      PostLoginResponseBody | PostLoginErrorResponseBody,
      PostLoginRequestBody
    >
  ): Promise<string | undefined> => {
    const { username, password } = req.body;

    const user = await userRepository.findByUsername(username);

    if (!user) {
      return;
    }

    if (user.password !== password) {
      return;
    }

    return `t0ken`;
  };
}

export default new LoginService();
