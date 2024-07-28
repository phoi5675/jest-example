// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  BaseReq,
  BaseReqBody,
  BaseReqParams,
  BaseReqQuery,
} from "@/shared/types/express/Request";
import {
  BaseErrorResBody,
  BaseRes,
  BaseResBody,
} from "@/shared/types/express/Response";

export interface GetUserReqBody extends BaseReqBody {}

export interface GetUserReqQuery extends BaseReqQuery {
  username: string;
}

export interface GetUserResBody extends BaseResBody {
  username: string;
  email: string;
}

export interface GetUserErrorResBody extends BaseErrorResBody {}

export interface GetUseReq<
  P = BaseReqParams,
  ResBody = GetUserResBody | GetUserErrorResBody,
  ReqBody = GetUserReqBody,
  ReqQuery = GetUserReqQuery,
> extends BaseReq<P, ResBody, ReqBody, ReqQuery> {}

export interface GetUserRes<ResBody = GetUserResBody | GetUserErrorResBody>
  extends BaseRes<ResBody> {}
