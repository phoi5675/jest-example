// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Joi from "joi";

// TODO: Jest 실행 중이 아닌 경우에는 에러 반환하도록 함수 수정

export const isValidResponse = <T>(
  validator: Joi.ObjectSchema<T>,
  obj: T
): boolean => {
  const validatorError = validator.validate(obj);

  return validatorError.error === undefined;
};
