// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { userRepository } from "@/models/UserRepository";
import { CommonValidator } from "@/shared/class/handlerClass";
import {
  CommonRequestParams,
  CustomRequest,
  CustomResponse,
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
    req: CustomRequest<
      CommonRequestParams,
      GetUserResponseBody | GetUserErrorResponseBody,
      GetUserRequestBody,
      GetUserRequestQuery
    >,
    res: CustomResponse<GetUserResponseBody | GetUserErrorResponseBody>,
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
    req: CustomRequest<
      CommonRequestParams,
      PostUserResponseBody | PostUserErrorResponseBody,
      PostUserRequestBody
    >,
    res: CustomResponse<PostUserResponseBody | PostUserErrorResponseBody>,
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
    req: CustomRequest<
      CommonRequestParams,
      PatchUserResponseBody | PatchUserErrorResponseBody,
      PatchUserRequestBody
    >,
    res: CustomResponse<PatchUserResponseBody | PatchUserErrorResponseBody>,
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

    const user = await userRepository.findUserWithPassword(
      req.body.username,
      req.body.password
    );

    if (user) {
      res.status(StatusCodes.BAD_REQUEST).send({
        message: "User not exists, or password is wrong.",
        error: `Bad request`,
      });
      return next("router");
    }

    next();
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
    const validator = Joi.object({
      body: Joi.object({
        username: Joi.string().max(20).required(),
        password: Joi.string().min(6).max(15).required(),
      }),
    });

    const validationResult = validator.validate(req);

    if (validationResult.error) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: `Bad request` });
      return next("router");
    }

    const user = await userRepository.findUserWithPassword(
      req.body.username,
      req.body.password
    );

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
