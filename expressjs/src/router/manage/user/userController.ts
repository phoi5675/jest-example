// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { CommonController } from "@/shared/class/handlerClass";
import {
  CommonRequest,
  CommonRequestParams,
  CommonResponse,
} from "@/shared/types/expressCore";
import logger from "@/shared/utils/logger";
import { NextFunction } from "express";
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
import { userService } from "./userService";

class UserController extends CommonController {
  getUser = async (
    req: CommonRequest<
      CommonRequestParams,
      GetUserResponseBody | GetUserErrorResponseBody,
      GetUserRequestBody,
      GetUserRequestQuery
    >,
    res: CommonResponse<GetUserResponseBody | GetUserErrorResponseBody>,
    next: NextFunction
  ) => {
    try {
      const user = await userService.getUserInfo(req, res);

      if (!user) {
        res.status(StatusCodes.NOT_FOUND).send({ message: "User not found" });
        return next("router");
      }

      res.status(StatusCodes.OK).send({
        username: user.username,
        email: user.email,
      });
      next();
    } catch (error) {
      logger.error(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: "Internal server error while getting user info" });
      return next("router");
    }
  };

  createUser = async (
    req: CommonRequest<
      CommonRequestParams,
      PostUserResponseBody | PostUserErrorResponseBody,
      PostUserRequestBody
    >,
    res: CommonResponse<PostUserResponseBody | PostUserErrorResponseBody>,
    next: NextFunction
  ) => {
    try {
      const createdUserName = await userService.createUser(req, res);
      if (!createdUserName) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ message: "Failed to create user" });
        return next("router");
      }
      res.status(StatusCodes.CREATED).send({
        username: createdUserName,
        message: "User Created Successfully",
      });

      next();
    } catch (error) {
      logger.error(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: "Failed to create user" });
      return next("router");
    }
  };

  updateUser = async (
    req: CommonRequest<
      CommonRequestParams,
      PatchUserResponseBody | PatchUserErrorResponseBody,
      PatchUserRequestBody
    >,
    res: CommonResponse<PatchUserResponseBody | PatchUserErrorResponseBody>,
    next: NextFunction
  ) => {
    try {
      const updatedUserName = await userService.updateUserByUsername(req, res);

      if (!updatedUserName) {
        res.status(StatusCodes.NOT_FOUND).send({ message: "User not found" });
        return next("router");
      }
      res.status(StatusCodes.OK).send();
      next();
    } catch (error) {
      logger.error(error);

      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: "User not found" });
      return next("router");
    }
  };

  deleteUser = async (
    req: CommonRequest<
      CommonRequestParams,
      DeleteUserResponseBody | DeleteUserErrorResponseBody,
      DeleteUserRequestBody
    >,
    res: CommonResponse<DeleteUserResponseBody | DeleteUserErrorResponseBody>,
    next: NextFunction
  ) => {
    try {
      const deletedUsername = await userService.deleteUserByUsername(req, res);

      if (!deletedUsername) {
        res.status(StatusCodes.NOT_FOUND).send({ message: "User not found" });
        return next("router");
      }

      res.status(StatusCodes.OK).send({
        username: deletedUsername,
        message: `User ${deletedUsername} deleted successfully`,
      });

      next();
    } catch (error) {
      logger.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: "An error occurred while deleting the user",
      });
    }
  };
}

const userController = new UserController();

export { userController, UserController };
