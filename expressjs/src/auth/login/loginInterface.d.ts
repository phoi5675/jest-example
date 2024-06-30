// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  CommonErrorResponse,
  CommonResponse,
} from "@shared/types/resInterface";

export interface PostLoginRequest {
  username: string;
  password: string;
}

export interface PostLoginResponse extends CommonResponse {
  token: string;
}

export interface PostLoginErrorResponse extends CommonErrorResponse {}
