// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  CommonErrorResponseBody,
  CommonRequestBody,
  CommonResponseBody,
} from "@/shared/types/ExpressCore";

export interface PostLoginRequestBody extends CommonRequestBody {
  username: string;
  password: string;
}

export interface PostLoginResponseBody extends CommonResponseBody {
  token?: string;
}

export interface PostLoginErrorResponseBody extends CommonErrorResponseBody {}
