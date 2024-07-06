// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { StatusCodes } from "http-status-codes";
import {
  CommonErrorResponseBody,
  CommonRequestBody,
  CommonResponseBody,
  CustomRequest,
  CustomResponse,
} from "../types/expressCore";

/**
 * @function fallbackApi
 * @description 이 API는 express framework에서 HTTP status code 404(NOT_FOUND)를 반환하는 함수입니다.
 * @param {CustomRequest<CommonRequestBody>} req - 이 API의 request parameter로 CustomRequest<CommonRequestBody>를 갖습니다.
 * @param {CustomResponse<CommonResponseBody | CommonErrorResponseBody>} res - 이 API의 response parameter로 CustomResponse<CommonResponseBody | CommonErrorResponseBody>를 갖습니다.
 * @returns {void} - fallbackApi function은 값을 반환하지 않습니다.
 */
const notFoundHandler = (
  req: CustomRequest<CommonRequestBody>,
  res: CustomResponse<CommonResponseBody | CommonErrorResponseBody>
) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: "404 Not found" });
};

export default notFoundHandler;