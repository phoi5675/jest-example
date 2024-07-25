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

// TODO: CommonRequest / Response처럼 headder, body, param, query 한번에 선언한 인터페이스 생성
// TODO: 해당 인터페이스를 미들웨어에 적용
