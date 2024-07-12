// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { userRepository } from "@/models/UserRepository";
import { CommonService } from "@/shared/class/handlerClass";
import { CommonRequest, CommonRequestParams } from "@/shared/types/expressCore";
import {
  PostLoginErrorResponseBody,
  PostLoginRequestBody,
  PostLoginResponseBody,
} from "./loginInterface";

class LoginService extends CommonService {
  postLogin = async (
    req: CommonRequest<
      CommonRequestParams,
      PostLoginResponseBody | PostLoginErrorResponseBody,
      PostLoginRequestBody
    >
  ): Promise<string | undefined> => {
    const { username, password } = req.body;

    const user = await userRepository.findUserWithPassword(username, password);

    if (!user) {
      return;
    }

    // TODO: 토큰 생성 로직 추가
    return `t0ken`;
  };
}

const loginService = new LoginService();
export { loginService, LoginService };
