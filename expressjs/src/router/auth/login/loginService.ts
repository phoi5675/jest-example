// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { userRepository } from "@/models/UserRepository";
import {
  PostLoginReq,
  PostLoginResHeader,
} from "@/router/auth/login/types/PostLogin";
import { BaseService } from "@/shared/class/handlerClass";
import { Token } from "@/shared/types/Token";
import {
  decryptByPrivateKey,
  encryptByPrivateKey,
  getHashedPassword,
} from "@/shared/utils/crypto";
import moment from "moment";

class LoginService extends BaseService {
  postLogin = async (
    req: PostLoginReq
  ): Promise<PostLoginResHeader | undefined> => {
    const { username, password } = req.body;

    const decryptedPassword = decryptByPrivateKey<string>(password);

    const salt = (await userRepository.findByUsername(username))?.salt;

    if (!salt) {
      return;
    }

    const hashedPassword = getHashedPassword(decryptedPassword, salt);

    const user = await userRepository.findUserWithPassword(
      username,
      hashedPassword
    );

    if (!user) {
      return;
    }

    const loginedAt = moment().toISOString();

    const toBeEncrypted: Token = {
      loginedAt: loginedAt,
    };
    const token = encryptByPrivateKey(toBeEncrypted);

    return { token, "logined-at": loginedAt };
  };
}

const loginService = new LoginService();
export { LoginService, loginService };
