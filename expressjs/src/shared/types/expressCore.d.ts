// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { Request, Response } from "express";
import { IncomingHttpHeaders } from "http";
import { ParsedQs } from "qs";

export interface CommonRequestHeader extends IncomingHttpHeaders {
  token?: string;
}

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
  error?: string;
}

export interface CommonRequest<
  P = CommonRequestParams,
  ResBody = CommonResponseBody | CommonErrorResponseBody,
  ReqBody = CommonRequestBody,
  ReqQuery = CommonRequestQuery,
  ReqHeader = CommonRequestHeader,
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  params: P;
  body: ReqBody;
  query: ReqQuery;
  headers: ReqHeader;
}

export interface CommonResponse<ResBody = unknown> extends Response<ResBody> {}
