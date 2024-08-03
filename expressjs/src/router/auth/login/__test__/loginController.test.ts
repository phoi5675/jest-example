// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { addUser } from "@/mock/setups/auth/login/addUser";
import { deleteUsers } from "@/mock/teardowns/auth/login/deleteUser";
import loginController from "@/router/auth/login/loginController";
import { PostLoginRes } from "@/router/auth/login/types/PostLogin";
import { BaseResHeader } from "@/shared/types/express/Response";
import { isValidRes } from "@/shared/utils/__test__/jestUtil";
import { mockNext, mockRes } from "@/shared/utils/__test__/mockMiddleware";
import { encryptByPublicKey } from "@/shared/utils/crypto";
import logger from "@/shared/utils/logger";
import { getTestData } from "@/testData/index";
import { StatusCodes } from "http-status-codes";
import Joi from "joi";

describe(`Login controller test`, () => {
  describe(`POST /auth/login controller test`, () => {
    beforeEach(async () => {
      await addUser();
    });
    afterEach(async () => {
      await deleteUsers();
    });
    it(`should get ${StatusCodes.OK} status when login with correct username and password`, async () => {
      const req = getTestData("postLoginReq");
      req.body.password = encryptByPublicKey(req.body.password);

      const res = mockRes<PostLoginRes>();
      const next = mockNext;

      await loginController.postLogin(req, res, next);

      logger.log(JSON.stringify(req, null, 2));

      const header = (res.set as jest.MockedFunction<typeof res.set>).mock
        .calls[0][0] as unknown as BaseResHeader;

      const validator = Joi.object<BaseResHeader>({
        token: Joi.string().required(),
        "logined-at": Joi.string().isoDate().required(),
      });

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(isValidRes<BaseResHeader>(validator, header)).toBeTruthy();
    });
  });
});
