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
  BaseResHeader,
} from "@/shared/types/express/Response";

export interface PostLoginReqBody extends BaseReqBody {
  username: string;
  password: string;
}

export interface PostLoginReqQuery extends BaseReqQuery {}

export interface PostLoginResHeader extends BaseResHeader {}

export interface PostLoginResBody extends BaseResBody {}

export interface PostLoginErrorResBody extends BaseErrorResBody {}

export interface PostLoginReq<
  P = BaseReqParams,
  ResBody = PostLoginResBody | PostLoginErrorResBody,
  ReqBody = PostLoginReqBody,
  ReqQuery = PostLoginReqQuery,
> extends BaseReq<P, ResBody, ReqBody, ReqQuery> {}

export interface PostLoginRes<
  ResBody = PostLoginResBody | PostLoginErrorResBody,
> extends BaseRes<ResBody> {}
