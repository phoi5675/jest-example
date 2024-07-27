// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Joi from "joi";
import { isValidRes } from "./jestUtil";

describe(`jest util function test`, () => {
  describe(`isValidRes test`, () => {
    it(`should not throw error if NODE_ENV is "test"`, () => {
      const validator = Joi.object();
      expect(() => {
        isValidRes<unknown>(validator, {});
      }).not.toThrow();
    });
  });
});
