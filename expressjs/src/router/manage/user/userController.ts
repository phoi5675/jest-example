// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { CommonController } from "@/shared/class/handlerClass";
import {
  CommonRequestParams,
  CustomRequest,
  CustomResponse,
} from "@/shared/types/expressCore";
import { StatusCodes } from "http-status-codes";
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

class UserController extends CommonController {
  getUser = async (
    req: CustomRequest<
      CommonRequestParams,
      GetUserResponseBody | GetUserErrorResponseBody,
      GetUserRequestBody,
      GetUserRequestQuery
    >,
    res: CustomResponse<GetUserResponseBody | GetUserErrorResponseBody>
  ) => {
    res.status(StatusCodes.OK).send();
  };

  postUser = async (
    req: CustomRequest<
      CommonRequestParams,
      PostUserResponseBody | PostUserErrorResponseBody,
      PostUserRequestBody
    >,
    res: CustomResponse<PostUserResponseBody | PostUserErrorResponseBody>
  ) => {
    res.status(StatusCodes.OK).send();
  };

  patchUser = async (
    req: CustomRequest<
      CommonRequestParams,
      PatchUserResponseBody | PatchUserErrorResponseBody,
      PatchUserRequestBody
    >,
    res: CustomResponse<PatchUserResponseBody | PatchUserErrorResponseBody>
  ) => {
    res.status(StatusCodes.OK).send();
  };

  deleteUser = async (
    req: CustomRequest<
      CommonRequestParams,
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
