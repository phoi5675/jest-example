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
import { NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

/**
 * @function fallbackApi
 * @description 이 API는 express framework에서 HTTP status code 404(NOT_FOUND)를 반환하는 함수입니다.
 * @param {BaseReq<BaseReqBody>} req - 이 API의 request parameter로 CustoReq<BasReqBody>를 갖습니다.
 * @param {BaseRes<BaseResBody | BaseErrorResBody>} res - 이 API의 response parameter로 CustomRes<BaseResBody | BaseErrorResBody>를 갖습니다.
 * @returns {void} - fallbackApi function은 값을 반환하지 않습니다.
 */
const notFoundHandler = (
  req: BaseReq<BaseReqBody>,
  res: BaseRes<BaseResBody | BaseErrorResBody>,
  next: NextFunction
) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: "404 Not found" });

  return next("router");
};

export default notFoundHandler;
