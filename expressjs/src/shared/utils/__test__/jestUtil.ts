// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ENV from "@/constant/env";
import Joi from "joi";

export const isValidResponse = <T>(
  validator: Joi.ObjectSchema<T>,
  obj: T
): boolean => {
  if (ENV.NODE_ENV !== "test") {
    throw new Error(
      "This function should not be used unless test envrionment!"
    );
  }

  const validatorError = validator.validate(obj);

  return validatorError.error === undefined;
};
