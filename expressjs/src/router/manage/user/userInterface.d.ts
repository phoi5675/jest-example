// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  CommonErrorResponseBody,
  CommonRequestBody,
  CommonResponseBody,
} from "@/shared/types/expressCore";

// TODO: queryParam도 인터페이스 생성
// GET
export interface GetUserRequestBody extends CommonRequestBody {}

export interface GetUserResponseBody extends CommonResponseBody {}

export interface GetUserErrorResponseBody extends CommonErrorResponseBody {}

// POST
export interface PostUserRequestBody extends CommonRequestBody {}

export interface PostUserResponseBody extends CommonResponseBody {}

export interface PostUserErrorResponseBody extends CommonErrorResponseBody {}

// PATCH
export interface PatchUserRequestBody extends CommonRequestBody {}

export interface PatchUserResponseBody extends CommonResponseBody {}

export interface PatchUserErrorResponseBody extends CommonErrorResponseBody {}

// DELETE
export interface DeleteUserRequestBody extends CommonRequestBody {}

export interface DeleteUserResponseBody extends CommonResponseBody {}

export interface DeleteUserErrorResponseBody extends CommonErrorResponseBody {}
