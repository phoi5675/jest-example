// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { CustomRequest, CustomResponse } from "@/shared/types/expressCore";
import { StatusCodes } from "http-status-codes";
import {
  DeleteUserErrorResponseBody,
  DeleteUserRequestBody,
  DeleteUserResponseBody,
  GetUserErrorResponseBody,
  GetUserRequestBody,
  GetUserResponseBody,
  PatchUserErrorResponseBody,
  PatchUserRequestBody,
  PatchUserResponseBody,
  PostUserErrorResponseBody,
  PostUserRequestBody,
  PostUserResponseBody,
} from "./userInterface";

class UserController {
  getUser = async (
    req: CustomRequest<
      GetUserResponseBody | GetUserErrorResponseBody,
      GetUserRequestBody
    >,
    res: CustomResponse<GetUserResponseBody | GetUserErrorResponseBody>
  ) => {
    res.status(StatusCodes.OK).send();
  };

  postUser = async (
    req: CustomRequest<
      PostUserResponseBody | PostUserErrorResponseBody,
      PostUserRequestBody
    >,
    res: CustomResponse<PostUserResponseBody | PostUserErrorResponseBody>
  ) => {
    res.status(StatusCodes.OK).send();
  };

  patchUser = async (
    req: CustomRequest<
      PatchUserResponseBody | PatchUserErrorResponseBody,
      PatchUserRequestBody
    >,
    res: CustomResponse<PatchUserResponseBody | PatchUserErrorResponseBody>
  ) => {
    res.status(StatusCodes.OK).send();
  };

  deleteUser = async (
    req: CustomRequest<
      DeleteUserResponseBody | DeleteUserErrorResponseBody,
      DeleteUserRequestBody
    >,
    res: CustomResponse<DeleteUserResponseBody | DeleteUserErrorResponseBody>
  ) => {
    res.status(StatusCodes.OK).send();
  };
}

const userController = new UserController();

export { userController, UserController };
