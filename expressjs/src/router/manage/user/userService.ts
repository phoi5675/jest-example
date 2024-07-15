// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { userRepository } from "@/models/UserRepository";
import { CommonService } from "@/shared/class/handlerClass";
import {
  CommonRequest,
  CommonRequestParams,
  CommonResponse,
} from "@/shared/types/ExpressCore";
import { User } from "@/shared/types/models/User";
import { encryptPassword } from "@/shared/utils/crypto";
import {
  DeleteUserErrorResponseBody,
  DeleteUserRequestBody,
  DeleteUserResponseBody,
  GetUserErrorResponseBody,
  GetUserRequestBody,
  GetUserRequestQuery,
  GetUserResponseBody,
  PatchUserErrorResponseBody,
  PatchUserRequestBody,
  PatchUserResponseBody,
  PostUserErrorResponseBody,
  PostUserRequestBody,
  PostUserResponseBody,
} from "./userInterface";

class UserService extends CommonService {
  getUserInfo = async (
    req: CommonRequest<
      CommonRequestParams,
      GetUserResponseBody | GetUserErrorResponseBody,
      GetUserRequestBody,
      GetUserRequestQuery
    >,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    res: CommonResponse<GetUserResponseBody | GetUserErrorResponseBody>
  ) => {
    const user = await userRepository.findByUsername(req.query.username);

    return user;
  };

  createUser = async (
    req: CommonRequest<
      CommonRequestParams,
      PostUserResponseBody | PostUserErrorResponseBody,
      PostUserRequestBody
    >,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    res: CommonResponse<PostUserResponseBody | PostUserErrorResponseBody>
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
    req: CommonRequest<
      CommonRequestParams,
      PatchUserResponseBody | PatchUserErrorResponseBody,
      PatchUserRequestBody
    >,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    res: CommonResponse<PatchUserResponseBody | PatchUserErrorResponseBody>
  ) => {
    const updatedUserName = await userRepository.updateUserByUsername(
      req.body.username,
      req.body
    );

    return updatedUserName;
  };
  deleteUserByUsername = async (
    req: CommonRequest<
      CommonRequestParams,
      DeleteUserResponseBody | DeleteUserErrorResponseBody,
      DeleteUserRequestBody
    >,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    res: CommonResponse<DeleteUserResponseBody | DeleteUserErrorResponseBody>
  ) => {
    const deletedUsername = await userRepository.deleteUserByUsername(
      req.body.username
    );

    return deletedUsername;
  };
}

const userService = new UserService();

export { userService, UserService };
