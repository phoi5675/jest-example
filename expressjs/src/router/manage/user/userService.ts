// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { userRepository } from "@/models/UserRepository";
import {
  DeleteUseReq,
  DeleteUserRes,
} from "@/router/manage/user/types/DeleteUser";
import { GetUseReq, GetUserRes } from "@/router/manage/user/types/GetUser";
import {
  PatchUserReq,
  PatchUserRes,
} from "@/router/manage/user/types/PatchUser";
import { PostUserReq, PostUserRes } from "@/router/manage/user/types/PostUser";
import { BaseService } from "@/shared/class/handlerClass";

import { User } from "@/shared/types/models/User";
import { decryptByPrivateKey, encryptPassword } from "@/shared/utils/crypto";

class UserService extends BaseService {
  getUserInfo = async (
    req: GetUseReq,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    res: GetUserRes
  ) => {
    const user = await userRepository.findByUsername(req.query.username);

    return user;
  };

  createUser = async (
    req: PostUserReq,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    res: PostUserRes
  ) => {
    const decryptedPassword = decryptByPrivateKey<string>(req.body.password);
    req.body.password = decryptedPassword;

    // salt 및 hash 함수를 통해 password를 암호화하여 저장한다.
    const { salt, hashedPassword } = encryptPassword(req.body.password);
    const user: User = {
      ...req.body,
      salt: salt,
      password: hashedPassword,
    };

    const isCreated = await userRepository.createUser(user);

    return isCreated;
  };

  updateUserByUsername = async (
    req: PatchUserReq,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    res: PatchUserRes
  ) => {
    const decryptedPassword = decryptByPrivateKey<string>(req.body.password);
    req.body.password = decryptedPassword;

    // salt 및 hash 함수를 통해 password를 암호화하여 저장한다.
    const { salt, hashedPassword } = encryptPassword(req.body.password);
    const user: Partial<User> = {
      ...req.body,
      salt: salt,
      password: hashedPassword,
    };

    const updatedUserName = await userRepository.updateUserByUsername(
      req.body.username,
      user
    );

    return updatedUserName;
  };
  deleteUserByUsername = async (
    req: DeleteUseReq,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    res: DeleteUserRes
  ) => {
    const deletedUsername = await userRepository.deleteUserByUsername(
      req.body.username
    );

    return deletedUsername;
  };
}

const userService = new UserService();

export { userService, UserService };
