// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { Request, Response } from "express";
import { IncomingHttpHeaders, OutgoingHttpHeaders } from "http";
import { ParsedQs } from "qs";

// Request
export interface CommonRequestHeader extends IncomingHttpHeaders {
  token: string;
  "logined-at"?: Date;
}

export interface CommonRequestParams {
  [key: string]: string;
}

export interface CommonRequestBody {}

export interface CommonRequestQuery extends ParsedQs {}

// Response
export interface CommonResponseHeader extends OutgoingHttpHeaders {
  token: string;
  "logined-at"?: string;
}

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
  ReqHeader = CommonResponseHeader,
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  params: P;
  body: ReqBody;
  query: ReqQuery;
  headers: ReqHeader;
}

export interface CommonResponse<ResBody = CommonResponseBody>
  extends Response<ResBody> {}
