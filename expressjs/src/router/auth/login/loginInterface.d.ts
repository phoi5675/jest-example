// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  CommonErrorResponseBody,
  CommonRequestBody,
  CommonResponseBody,
  CommonResponseHeader,
} from "@/shared/types/ExpressCore";

export interface PostLoginRequestBody extends CommonRequestBody {
  username: string;
  password: string;
}

export interface PostLoginResponseHeader extends CommonResponseHeader {}

export interface PostLoginResponseBody extends CommonResponseBody {}

export interface PostLoginErrorResponseBody extends CommonErrorResponseBody {}
