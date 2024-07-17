// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ENV from "@/constant/env";
import {
  decryptByPrivateKey,
  encryptByPrivateKey,
} from "@/shared/utils/crypto";
import { NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import moment from "moment";
import {
  CommonErrorResponseBody,
  CommonRequest,
  CommonRequestBody,
  CommonResponse,
  CommonResponseBody,
} from "../types/ExpressCore";
import { TokenValidityWaiver } from "../types/Route";
import logger from "../utils/logger";

const tokenValidityWaiverList: TokenValidityWaiver[] = [
  "GET /",
  "POST /auth/login",
];

const isTokenValid = (token?: string, loginedAt?: string): boolean => {
  if (!token || !loginedAt) {
    return false;
  }

  const decryptedToken = decryptByPrivateKey(token);
  const encryptedToken = encryptByPrivateKey(decryptedToken, loginedAt);

  const now = moment();
  const _loginedAt = moment(loginedAt);

  logger.log(
    `diff = ${now.diff(_loginedAt, "minute")}`,
    _loginedAt,
    decryptedToken,
    encryptedToken
  );
  return (
    decryptedToken === encryptedToken &&
    now.diff(_loginedAt, "minute") < ENV.MAX_TOKEN_VALID_MIN
  );
};

const tokenValidator = (
  req: CommonRequest<CommonRequestBody>,
  res: CommonResponse<CommonResponseBody | CommonErrorResponseBody>,
  next: NextFunction
) => {
  // 로그인 없이 접근 가능한 페이지인 경우
  if (
    tokenValidityWaiverList.includes(
      `${req.method} ${req.path}` as TokenValidityWaiver
    )
  ) {
    return next();
  }
  const _isTokenValid = isTokenValid(
    req.headers.token,
    req.headers["logined-at"]
  );

  if (!_isTokenValid) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: `token not valid` });
    return next("router");
  }

  next();
};

export default tokenValidator;
