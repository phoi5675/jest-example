// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  BaseReq,
  BaseReqBody,
  BaseReqQuery,
} from "@/shared/types/express/Request";
import {
  BaseErrorResBody,
  BaseRes,
  BaseResBody,
} from "@/shared/types/express/Response";

export interface PatchUserReqBody extends BaseReqBody {
  username: string;
  password: string;
  email?: string;
}

export interface PatchUserReqQuery extends BaseReqQuery {}

export interface PatchUserResBody extends BaseResBody {}

export interface PatchUserErrorResBody extends BaseErrorResBody {}

export interface PatchUserReq<
  P = BaseReqParams,
  ResBody = PatchUserResBody | PatchUserErrorResBody,
  ReqBody = PatchUserReqBody,
  ReqQuery = PatchUserReqQuery,
> extends BaseReq<P, ResBody, ReqBody, ReqQuery> {}

export interface PatchUserRes<
  ResBody = PatchUserResBody | PatchUserErrorResBody,
> extends BaseRes<ResBody> {}
