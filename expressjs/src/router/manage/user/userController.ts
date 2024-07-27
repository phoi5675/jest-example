// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

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
import { BaseController } from "@/shared/class/handlerClass";
import logger from "@/shared/utils/logger";
import { NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { userService } from "./userService";

class UserController extends BaseController {
  getUser = async (req: GetUseReq, res: GetUserRes, next: NextFunction) => {
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
    req: PostUseReq,
    res: PostUserRes,
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
    req: PatchUseReq,
    res: PatchUserRes,
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
    req: DeleteUseReq,
    res: DeleteUserRes,
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
