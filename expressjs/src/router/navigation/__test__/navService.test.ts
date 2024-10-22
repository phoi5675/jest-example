// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { addUser } from "@/mock/setups/auth/login/addUser";
import { addNavigation } from "@/mock/setups/navigation/addNavigation";
import { deleteUsers } from "@/mock/teardowns/auth/login/deleteUser";
import { deleteNavigation } from "@/mock/teardowns/navigation/deleteNavigation";
import { navService } from "@/router/navigation/navService";
import { Navigation } from "@/shared/types/models/Navigation";
import { isValidRes } from "@/shared/utils/__test__/jestUtil";
import { getNavReq } from "@/testData/navigation/getNavigation";
import Joi from "joi";

describe(`Nav service test`, () => {
  describe(`GET /navigation controller test`, () => {
    beforeEach(async () => {
      await addUser();
      await addNavigation();
    });
    afterEach(async () => {
      await deleteUsers();
      await deleteNavigation();
    });
    it(`should get navigation data if user exists, and navigation is in database`, async () => {
      const req = getNavReq();

      const validator = Joi.array<Navigation>().items(
        Joi.object({
          seq: Joi.number().optional(),
          path: Joi.string().required(),
          FK_user_seq: Joi.number().required(),
        })
      );

      const res = await navService.getNavItemsByUserId(req.body.username);

      const isvaild = isValidRes<Navigation | undefined>(validator, res);

      expect(isvaild).toBeTruthy();
    });
  });
});
