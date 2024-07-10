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
  GetNavErrResponseBody,
  GetNavRequestBody,
  GetNavResponseBody,
  PutNavErrResponseBody,
  PutNavRequestBody,
  PutNavResponseBody,
} from "./navInterface";

class NavValidator extends CommonValidator {
  getNavigation = async (
    req: CommonRequest<
      CommonRequestParams,
      GetNavResponseBody[] | GetNavErrResponseBody,
      GetNavRequestBody
    >,
    res: CommonResponse<GetNavResponseBody[] | GetNavErrResponseBody>,
    next: NextFunction
  ) => {
    const validator = Joi.object({
      body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
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

  putNavigation = async (
    req: CommonRequest<
      CommonRequestParams,
      PutNavResponseBody[] | PutNavErrResponseBody,
      PutNavRequestBody
    >,
    res: CommonResponse<PutNavResponseBody[] | PutNavErrResponseBody>,
    next: NextFunction
  ) => {
    const validator = Joi.object({
      body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        navData: Joi.array().items(Joi.string()).required(),
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

const navValidator = new NavValidator();

export { NavValidator, navValidator };
