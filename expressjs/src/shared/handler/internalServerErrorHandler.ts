// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { BaseReq, BaseReqBody } from "@/shared/types/express/Request";
import {
  BaseErrorResBody,
  BaseRes,
  BaseResBody,
} from "@/shared/types/express/Response";
import logger from "@/shared/utils/logger";
import { NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

/**
 * 서버에서 발생하는 공통인 500코드(INTERNAL_SERVER_ERROR) 에러 핸들러
 *
 * @param {unknown} err - 미들웨어 또는 라우터의 다음 미들웨어로 건너뜀
 * @param {BaseReq<BaseReqBody>} req - express.Request 확장, req.body는 BasReqBody 타입
 * @param {BaseRes<BaseResBody | BaseErrorResBody>} res - express.Res 확장, res.send는 BaseResBody or BaseErrorResBody 타입을 갖는 send 메소드
 * @returns {void}
 */
const internalServerErrorHandler = (
  err: unknown,
  req: BaseReq<BaseReqBody>,
  res: BaseRes<BaseResBody | BaseErrorResBody>,
  next: NextFunction
): void => {
  logger.error(err);
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send({ message: `Internal server error!` });

  return next(err);
};

export default internalServerErrorHandler;
