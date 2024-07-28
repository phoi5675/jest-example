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
import { BaseValidator } from "@/shared/class/handlerClass";

import { NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import Joi from "joi";

class UserValidator extends BaseValidator {
  getUser = (req: GetUseReq, res: GetUserRes, next: NextFunction) => {
    const validator = Joi.object({
      query: Joi.object({
        username: Joi.string().required(),
      }),
    });

    const validationResult = validator.validate(req);

    if (validationResult.error) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: `Bad request` });
      return next("router");
    }

    next();
  };

  postUser = async (req: PostUserReq, res: PostUserRes, next: NextFunction) => {
    const validator = Joi.object({
      body: Joi.object({
        username: Joi.string().max(20).required(),
        email: Joi.string().email().max(20).required(),
        password: Joi.string().min(6).max(15).required(),
      }),
    });

    const validationResult = validator.validate(req);

    if (validationResult.error) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: `Bad request` });
      return next("router");
    }

    const user = await userRepository.findByUsername(req.body.username);

    if (user) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: "User already exists!", error: `Bad request` });
      return next("router");
    }

    next();
  };

  patchUser = async (
    req: PatchUserReq,
    res: PatchUserRes,
    next: NextFunction
  ) => {
    const validator = Joi.object({
      body: Joi.object({
        username: Joi.string().max(20).required(),
        email: Joi.string().email().max(20).optional(),
        password: Joi.string().min(6).max(15).required(),
      }),
    });

    const validationResult = validator.validate(req);

    if (validationResult.error) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: `Bad request` });
      return next("router");
    }

    const user = await userRepository.findByUsername(req.body.username);

    if (user) {
      res.status(StatusCodes.BAD_REQUEST).send({
        message: "User not exists.",
        error: `Bad request`,
      });
      return next("router");
    }

    next();
  };

  deleteUser = async (
    req: DeleteUseReq,
    res: DeleteUserRes,
    next: NextFunction
  ) => {
    const validator = Joi.object({
      body: Joi.object({
        username: Joi.string().max(10).required(),
        password: Joi.string().min(6).max(15).required(),
      }),
    });

    const validationResult = validator.validate(req);

    if (validationResult.error) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: `Bad request` });
      return next("router");
    }

    const user = await userRepository.findByUsername(req.body.username);

    if (user) {
      res.status(StatusCodes.BAD_REQUEST).send({
        message: "User not exists, or password is wrong.",
        error: `Bad request`,
      });
      return next("router");
    }

    next();
  };
}

const userValidator = new UserValidator();

export { UserValidator, userValidator };
