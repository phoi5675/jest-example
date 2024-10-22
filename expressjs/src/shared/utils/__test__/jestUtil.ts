// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ENV from "@/constant/env";
import logger from "@/shared/utils/logger";
import Joi from "joi";

export const isValidRes = <T>(
  validator: Joi.ObjectSchema<T> | Joi.ArraySchema<T>,
  obj?: T | Array<T>
): boolean => {
  if (ENV.NODE_ENV !== "test") {
    throw new Error(
      "This function should not be used unless test envrionment!"
    );
  }

  if (!obj) {
    return false;
  }

  const validatorError = validator.validate(obj);

  if (validatorError.error) {
    logger.error(validatorError.error);
  }

  return validatorError.error === undefined;
};
