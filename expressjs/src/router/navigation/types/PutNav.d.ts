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
  BaseResHeader,
} from "@/shared/types/express/Response";

export interface PutNavReqBody extends BaseReqBody {
  username: string;
  navData: string[];
}

export interface PutNavReqQuery extends BaseReqQuery {}

export interface PutNavResHeader extends BaseResHeader {}

export interface PutNavResBody extends BaseResBody {
  username: string;
}

export interface PutNavResBody extends BaseResBody {}

export interface PutNavErrorResBody extends BaseErrorResBody {}

export interface PutNaReq<
  P = BasReqParams,
  ResBody = PutNavResBody | PutNavErrorResBody,
  ReqBody = PutNavReqBody,
  ReqQuery = PutNavReqQuery,
> extends BaseReq<P, ResBody, ReqBody, ReqQuery> {}

export interface PutNavRes<ResBody = PutNavResBody | PutNavErrorResBody>
  extends BaseRes<ResBody> {}
