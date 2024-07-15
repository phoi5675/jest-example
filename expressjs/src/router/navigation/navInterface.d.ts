// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  CommonErrorResponseBody,
  CommonRequestBody,
  CommonResponseBody,
} from "@/shared/types/ExpressCore";

export interface GetNavRequestBody extends CommonRequestBody {
  username: string;
}

export interface GetNavResponseBody extends CommonResponseBody {
  seq?: number;
  path: string;
  FK_user_seq: number;
}

export interface GetNavErrResponseBody extends CommonErrorResponseBody {}

export interface PutNavRequestBody {
  username: string;
  navData: string[];
}

export interface PutNavResponseBody extends CommonResponseBody {
  username: string;
}

export interface PutNavErrResponseBody extends CommonErrorResponseBody {}
