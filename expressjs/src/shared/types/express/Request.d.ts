// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { BaseErrorResBody, BaseResBody } from "@/shared/types/express/Response";
import { Request } from "express";
import { IncomingHttpHeaders } from "http";
import { ParsedQs } from "qs";

export interface BaseReqHeader extends IncomingHttpHeaders {
  token: string;
  "logined-at"?: string;
}

export interface BaseReqParams {
  [key: string]: string;
}

export interface BaseReqBody {}

export interface BaseReqQuery extends ParsedQs {}

export interface BaseReq<
  P = BaseReqParams,
  ResBody = BaseResBody | BaseErrorResBody,
  ReqBody = BaseReqBody,
  ReqQuery = BaseReqQuery,
  ReqHeader extends IncomingHttpHeaders = BaseReqHeader,
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  params: P;
  body: ReqBody;
  query: ReqQuery;
  headers: ReqHeader;
}
