// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { userRepository } from "@/models/UserRepository";
import { CommonValidator } from "@/shared/class/handlerClass";
import {
  CommonRequest,
  CommonRequestParams,
  CommonResponse,
} from "@/shared/types/expressCore";
import { NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import Joi from "joi";
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

// TODO: Write a validator logic

class UserValidator extends CommonValidator {
  getUser = (
    req: CommonRequest<
      CommonRequestParams,
      GetUserResponseBody | GetUserErrorResponseBody,
      GetUserRequestBody,
      GetUserRequestQuery
    >,
    res: CommonResponse<GetUserResponseBody | GetUserErrorResponseBody>,
    next: NextFunction
  ) => {
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

  postUser = async (
    req: CommonRequest<
      CommonRequestParams,
      PostUserResponseBody | PostUserErrorResponseBody,
      PostUserRequestBody
    >,
    res: CommonResponse<PostUserResponseBody | PostUserErrorResponseBody>,
    next: NextFunction
  ) => {
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
    req: CommonRequest<
      CommonRequestParams,
      PatchUserResponseBody | PatchUserErrorResponseBody,
      PatchUserRequestBody
    >,
    res: CommonResponse<PatchUserResponseBody | PatchUserErrorResponseBody>,
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
    req: CommonRequest<
      CommonRequestParams,
      DeleteUserResponseBody | DeleteUserErrorResponseBody,
      DeleteUserRequestBody
    >,
    res: CommonResponse<DeleteUserResponseBody | DeleteUserErrorResponseBody>,
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
