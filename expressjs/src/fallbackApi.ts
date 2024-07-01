// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

/**
 * @function fallbackApi
 * @description 이 API는 express framework에서 HTTP status code 404(NOT_FOUND)를 반환하는 함수입니다.
 * @param {Request} req
 * @param {Response} res
 * @returns {void} - fallbackApi function은 값을 반환하지 않습니다.
 */
const fallbackApi = (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: "404 Not found" });
};

export default fallbackApi;
