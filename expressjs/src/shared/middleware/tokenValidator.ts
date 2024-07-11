// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ROUTE from "@/constant/route";
import { NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  CommonErrorResponseBody,
  CommonRequest,
  CommonRequestBody,
  CommonResponse,
  CommonResponseBody,
} from "../types/expressCore";

// TODO: POST /auth/login의 경우, token validator 예외 리스트 추가
const tokenValidityWaiverList = [ROUTE.url];

const tokenValidator = (
  req: CommonRequest<CommonRequestBody>,
  res: CommonResponse<CommonResponseBody | CommonErrorResponseBody>,
  next: NextFunction
) => {
  // 로그인 없이 접근 가능한 페이지인 경우
  if (tokenValidityWaiverList.includes(req.url)) {
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
