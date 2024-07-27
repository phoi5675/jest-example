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
  PatchUseReq,
  PatchUserRes,
} from "@/router/manage/user/types/PatchUser";
import { PostUseReq, PostUserRes } from "@/router/manage/user/types/PostUser";
import { BaseService } from "@/shared/class/handlerClass";

import { User } from "@/shared/types/models/User";
import { encryptPassword } from "@/shared/utils/crypto";

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
    req: PostUseReq,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    res: PostUserRes
  ) => {
    // salt 및 hash 함수를 통해 password를 암호화하여 저장한다.
    const { salt, hashedPassword } = encryptPassword(req.body.password);
    const user: User = {
      ...req.body,
      salt: salt,
      password: hashedPassword,
    };

    const createdUserName = await userRepository.createUser(user);

    return createdUserName;
  };

  updateUserByUsername = async (
    req: PatchUseReq,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    res: PatchUserRes
  ) => {
    const updatedUserName = await userRepository.updateUserByUsername(
      req.body.username,
      req.body
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
