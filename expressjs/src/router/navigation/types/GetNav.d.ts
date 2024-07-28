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

export interface GetNavReqBody extends BaseReqBody {
  username: string;
}
export interface GetNavReqQuery extends BaseReqQuery {}

export interface GetNavResBody extends BaseResBody {
  seq?: number;
  path: string;
  FK_user_seq: number;
}

export interface GetNavResHeader extends BaseResHeader {}

export interface GetNavErrorResBody extends BaseErrorResBody {}

export interface GetNaReq<
  P = BaseReqParams,
  ResBody = GetNavResBody[] | GetNavErrorResBody,
  ReqBody = GetNavReqBody,
  ReqQuery = GetNavReqQuery,
> extends BaseReq<P, ResBody, ReqBody, ReqQuery> {}

export interface GetNavRes<ResBody = GetNavResBody[] | GetNavErrorResBody>
  extends BaseRes<ResBody> {}
