// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { addUser } from "@/mock/setups/auth/login/addUser";
import { deleteUsers } from "@/mock/teardowns/auth/login/deleteUser";
import { loginService } from "@/router/auth/login/loginService";
import { PostLoginResHeader } from "@/router/auth/login/types/PostLogin";
import { isValidRes } from "@/shared/utils/__test__/jestUtil";
import { encryptByPublicKey } from "@/shared/utils/crypto";
import { postLoginReq } from "@/testData/auth/login/postLogin";
import Joi from "joi";

describe(`Login service test`, () => {
  beforeEach(async () => {
    await addUser();
  });
  afterEach(async () => {
    await deleteUsers();
  });
  it(`should return token and login time if the user is in database`, async () => {
    const req = postLoginReq;

    const validator = Joi.object<PostLoginResHeader>({
      token: Joi.string().required(),
      "logined-at": Joi.string().isoDate().required(),
    });

    const res = await loginService.postLogin(req);

    const isValid = isValidRes<PostLoginResHeader>(validator, res);

    expect(isValid).toBeTruthy();
  });
  it(`should return undefined if the user exists, but password is wrong`, async () => {
    const req = postLoginReq;

    const password = encryptByPublicKey(`someWrongPassword`);

    req.body.username = postLoginReq.body.username;
    req.body.password = password;

    const validator = Joi.object<PostLoginResHeader>({
      token: Joi.string().required(),
      "logined-at": Joi.string().isoDate().required(),
    });

    const res = await loginService.postLogin(req);

    const isValid = isValidRes<PostLoginResHeader>(validator, res);

    expect(isValid).toBeFalsy();
    expect(res).toBeUndefined();
  });
  it(`should return undefined if the user is not in database`, async () => {
    const req = postLoginReq;

    const password = encryptByPublicKey(postLoginReq.body.password);

    req.body.username = `not_existed_user`;
    req.body.password = password;

    const validator = Joi.object<PostLoginResHeader>({
      token: Joi.string().required(),
      "logined-at": Joi.string().isoDate().required(),
    });

    const res = await loginService.postLogin(req);

    const isValid = isValidRes<PostLoginResHeader>(validator, res);

    expect(isValid).toBeFalsy();
    expect(res).toBeUndefined();
  });
});
