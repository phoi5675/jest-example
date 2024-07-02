// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  CommonErrorResponse,
  CommonResponse,
} from "@/shared/types/resInterface";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export interface PostLoginRequest {
  username: string;
  password: string;
}

export interface PostLoginResponse extends CommonResponse {
  token: string;
}

export interface PostLoginErrorResponse extends CommonErrorResponse {}

export interface PostLoginController<
  P = ParamsDictionary,
  ResBody = PostLoginResponse | PostLoginErrorResponse,
  ReqBody = PostLoginRequest,
  ReqQuery = ParsedQs,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  LocalsObj extends Record<string, any> = Record<string, any>,
> {
  (
    req: Request<P, ResBody, ReqBody, ReqQuery, LocalsObj>,
    res: Response<ResBody, LocalsObj>,
    next: NextFunction
  ): void;
}
