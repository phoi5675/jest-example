// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { userRepository } from "@/models/UserRepository";
import { CommonService } from "@/shared/class/handlerClass";
import { CommonRequest, CommonRequestParams } from "@/shared/types/ExpressCore";
import {
  decryptByPrivateKey,
  encryptByPrivateKey,
} from "@/shared/utils/crypto";
import moment from "moment";
import {
  PostLoginErrorResponseBody,
  PostLoginRequestBody,
  PostLoginResponseBody,
  PostLoginResponseHeader,
} from "./loginInterface";

class LoginService extends CommonService {
  postLogin = async (
    req: CommonRequest<
      CommonRequestParams,
      PostLoginResponseBody | PostLoginErrorResponseBody,
      PostLoginRequestBody
    >
  ): Promise<PostLoginResponseHeader | undefined> => {
    const { username, password } = req.body;

    const decryptedHashedPassword = decryptByPrivateKey(password);
    const user = await userRepository.findUserWithPassword(
      username,
      decryptedHashedPassword
    );

    if (!user) {
      return;
    }

    const loginedAt = moment().toISOString();
    const token = encryptByPrivateKey(password, loginedAt);

    return { token, "logined-at": loginedAt };
  };
}

const loginService = new LoginService();
export { loginService, LoginService };
