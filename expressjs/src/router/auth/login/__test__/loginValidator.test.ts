// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import loginValidator from "@/router/auth/login/loginValidator";
import { mockNext, mockRes } from "@/shared/utils/__test__/mockMiddleware";
import { postLoginReq } from "@/testData/auth/login/postLogin";
import { StatusCodes } from "http-status-codes";

describe(`Login validator test`, () => {
  it(`should return nothing when 'username' and 'password' is provided in body`, () => {
    const req = postLoginReq;
    const res = mockRes();
    const next = mockNext;

    expect(loginValidator.postLogin(req, res, next)).toBeUndefined();
  });
  it(`should return ${StatusCodes.BAD_REQUEST} if username is not provided in body`, () => {
    const req = postLoginReq;
    const res = mockRes();
    const next = mockNext;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (req.body as any).username;

    loginValidator.postLogin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
  });
  it(`should return ${StatusCodes.BAD_REQUEST} if password is not provided in body`, () => {
    const req = postLoginReq;
    const res = mockRes();
    const next = mockNext;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (req.body as any).password;

    loginValidator.postLogin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
  });
  it(`should return ${StatusCodes.BAD_REQUEST} if username is longer than 10 character`, () => {
    const req = postLoginReq;
    const res = mockRes();
    const next = mockNext;

    req.body.username = "LongerThan10Character";

    loginValidator.postLogin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
  });
});
