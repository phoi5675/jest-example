// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  CommonErrorResponseBody,
  CommonRequest,
  CommonRequestBody,
  CommonResponse,
  CommonResponseBody,
} from "../types/ExpressCore";
import { TokenValidityWaiver } from "../types/Route";

const tokenValidityWaiverList: TokenValidityWaiver[] = [
  "GET /",
  "POST /auth/login",
];

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

  // TODO: 토큰 확인 로직 추가
  // TODO: 로그인 시 토큰을 헤더에 넣어주는 로직 추가
  if (!req.headers.token) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: `token not found` });
    return next("router");
  }

  next();
};

export default tokenValidator;
