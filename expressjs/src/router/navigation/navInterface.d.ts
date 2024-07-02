// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  CommonErrorResponse,
  CommonResponse,
} from "@/shared/types/resInterface";

export interface GetNavRequest {
  userId: string;
}

export interface GetNavResponse extends CommonResponse {}

export interface GetNavErrResponse extends CommonErrorResponse {}

export interface GetNavController<
  P = ParamsDictionary,
  ResBody = GetNavResponse | GetNavErrorResponse,
  ReqBody = GetNavRequest,
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

export interface PatchNavRequest {
  userId: string;
  navData: unknown;
}

export interface PatchNavResponse extends CommonResponse {
  userId: string;
}

export interface PatchNavErrResponse extends CommonErrorResponse {}

export interface PatchNavController<
  P = ParamsDictionary,
  ResBody = PatchNavResponse | PatchNavErrorResponse,
  ReqBody = PatchNavRequest,
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
