// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { userRepository } from "@/models/UserRepository";
import { BaseValidator } from "@/shared/class/handlerClass";

import { NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import Joi from "joi";

import { GetNavReq, GetNavRes } from "@/router/navigation/types/GetNav";
import { PutNavReq, PutNavRes } from "@/router/navigation/types/PutNav";

class NavValidator extends BaseValidator {
  getNavigation = async (
    req: GetNavReq,
    res: GetNavRes,
    next: NextFunction
  ) => {
    const validator = Joi.object({
      body: Joi.object({
        username: Joi.string().max(20).required(),
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

  putNavigation = async (
    req: PutNavReq,
    res: PutNavRes,
    next: NextFunction
  ) => {
    const validator = Joi.object({
      body: Joi.object({
        username: Joi.string().max(20).required(),
        navData: Joi.array().items(Joi.string()).required(),
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
}

const navValidator = new NavValidator();

export { NavValidator, navValidator };
