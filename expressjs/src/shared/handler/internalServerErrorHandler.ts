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
import logger from "../utils/logger";

/**
 * 서버에서 발생하는 공통인 500코드(INTERNAL_SERVER_ERROR) 에러 핸들러
 *
 * @param {unknown} err - 미들웨어 또는 라우터의 다음 미들웨어로 건너뜀
 * @param {CommonRequest<CommonRequestBody>} req - express.Request 확장, req.body는 CommonRequestBody 타입
 * @param {CommonResponse<CommonResponseBody | CommonErrorResponseBody>} res - express.Response 확장, res.send는 CommonResponseBody or CommonErrorResponseBody 타입을 갖는 send 메소드
 * @returns {void}
 */
const internalServerErrorHandler = (
  err: unknown,
  req: CommonRequest<CommonRequestBody>,
  res: CommonResponse<CommonResponseBody | CommonErrorResponseBody>,
  next: NextFunction
): void => {
  logger.error(err);
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send({ message: `Internal server error!` });

  return next(err);
};

export default internalServerErrorHandler;
