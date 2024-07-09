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
    req: CustomRequest<
      CommonRequestParams,
      GetUserResponseBody | GetUserErrorResponseBody,
      GetUserRequestBody,
      GetUserRequestQuery
    >,
    res: CustomResponse<GetUserResponseBody | GetUserErrorResponseBody>,
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
    req: CustomRequest<
      CommonRequestParams,
      PostUserResponseBody | PostUserErrorResponseBody,
      PostUserRequestBody
    >,
    res: CustomResponse<PostUserResponseBody | PostUserErrorResponseBody>,
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
    req: CustomRequest<
      CommonRequestParams,
      PatchUserResponseBody | PatchUserErrorResponseBody,
      PatchUserRequestBody
    >,
    res: CustomResponse<PatchUserResponseBody | PatchUserErrorResponseBody>,
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
    req: CustomRequest<
      CommonRequestParams,
      DeleteUserResponseBody | DeleteUserErrorResponseBody,
      DeleteUserRequestBody
    >,
    res: CustomResponse<DeleteUserResponseBody | DeleteUserErrorResponseBody>,
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
