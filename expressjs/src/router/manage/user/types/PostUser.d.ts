// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { BaseReq, BaseReqBody } from "@/shared/types/express/Request";
import {
  BaseErrorResBody,
  BaseRes,
  BaseResBody,
} from "@/shared/types/express/Response";

export interface PostUserReqBody extends BaseReqBody {
  username: string;
  password: string;
  email: string;
}

export interface PostUserReqQuery extends BaseReqQuery {}

export interface PostUserResBody extends BaseResBody {
  username: string;
  email: string;
}

export interface PostUserErrorResBody extends BaseErrorResBody {}

export interface PostUseReq<
  P = BasReqParams,
  ResBody = PostUserResBody | PostUserErrorResBody,
  ReqBody = PostUserReqBody,
  ReqQuery = PostUserReqQuery,
> extends BaseReq<P, ResBody, ReqBody, ReqQuery> {}

export interface PostUserRes<ResBody = PostUserResBody | PostUserErrorResBody>
  extends BaseRes<ResBody> {}
