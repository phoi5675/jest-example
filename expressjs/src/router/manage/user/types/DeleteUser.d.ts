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

export interface DeleteUserReqBody extends BaseReqBody {
  username: string;
}

export interface DeleteUserResBody extends BaseResBody {
  username: string;
}

export interface DeleteUserReqQuery extends BaseReqQuery {}

export interface DeleteUserErrorResBody extends BaseErrorResBody {}

export interface DeleteUseReq<
  P = BaseReqParams,
  ResBody = DeleteUserResBody | DeleteUserErrorResBody,
  ReqBody = DeleteUserReqBody,
  ReqQuery = DeleteUserReqQuery,
> extends BaseReq<P, ResBody, ReqBody, ReqQuery> {}

export interface DeleteUserRes<
  ResBody = DeleteUserResBody | DeleteUserErrorResBody,
> extends BaseRes<ResBody> {}
