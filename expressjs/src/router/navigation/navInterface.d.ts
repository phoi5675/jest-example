// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  CommonErrorResponseBody,
  CommonRequestBody,
  CommonResponseBody,
} from "@/shared/types/expressCore";

export interface GetNavRequestBody extends CommonRequestBody {
  userId: string;
}

export interface GetNavResponseBody extends CommonResponseBody {}

export interface GetNavErrResponseBody extends CommonErrorResponseBody {}

export interface PatchNavRequestBody {
  userId: string;
  navData: unknown;
}

export interface PatchNavResponseBody extends CommonResponseBody {
  userId: string;
}

export interface PatchNavErrResponseBody extends CommonErrorResponseBody {}
