// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { Request, Response } from "express";
import { ParsedQs } from "qs";

export interface CommonRequestParams {
  [key: string]: string;
}

export interface CommonRequestBody {}

export interface CommonRequestQuery extends ParsedQs {}

export interface CommonResponseBody {
  message?: string;
}

export interface CommonErrorResponseBody {
  message?: string;
}
export interface CustomRequest<
  P = CommonRequestParams,
  ResBody = CommonResponseBody | CommonErrorResponseBody,
  ReqBody = CommonRequestBody,
  ReqQuery = CommonRequestQuery,
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  body: ReqBody;
  query: ReqQuery;
  params: P;
}

export interface CustomResponse<ResBody = unknown> extends Response<ResBody> {}
