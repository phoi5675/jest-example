// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import {
  CommonErrorResponseBody,
  CommonRequestBody,
  CommonResponseBody,
  CustomRequest,
  CustomResponse,
} from "../types/expressCore";
import logger from "../utils/logger";

const internalServerErrorHandler: ErrorRequestHandler = (
  err: unknown,
  req: CustomRequest<CommonRequestBody>,
  res: CustomResponse<CommonResponseBody | CommonErrorResponseBody>
) => {
  logger.error(err);
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send({ message: `Internal server error!` });
};

export default internalServerErrorHandler;
