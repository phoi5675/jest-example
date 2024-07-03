// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { Request, Response } from "express";

export interface ParamsDictionary {
  [key: string]: string;
}

export interface CommonRequestBody {}

export interface CommonResponseBody {
  message: string;
}

export interface CommonErrorResponseBody {
  message: string;
}
export interface CustomRequest<ResBody = unknown, ReqBody = unknown>
  extends Request<ParamsDictionary, ResBody, ReqBody> {
  body: ReqBody;
}

export interface CustomResponse<ResBody = unknown> extends Response<ResBody> {}
