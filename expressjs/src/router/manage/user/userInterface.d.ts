// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  CommonErrorResponseBody,
  CommonRequestBody,
  CommonRequestQuery,
  CommonResponseBody,
} from "@/shared/types/expressCore";

// GET
export interface GetUserRequestBody extends CommonRequestBody {}

export interface GetUserRequestQuery extends CommonRequestQuery {
  username: string;
}

export interface GetUserResponseBody extends CommonResponseBody {
  username: string;
  email: string;
}

export interface GetUserErrorResponseBody extends CommonErrorResponseBody {}

// POST
export interface PostUserRequestBody extends CommonRequestBody {
  username: string;
  password: string;
  email: string;
}

export interface PostUserResponseBody extends CommonResponseBody {
  username: string;
  email: string;
}

export interface PostUserErrorResponseBody extends CommonErrorResponseBody {}

// PATCH
export interface PatchUserRequestBody extends CommonRequestBody {
  username: string;
  password: string;
  email?: string;
}

export interface PatchUserResponseBody extends CommonResponseBody {}

export interface PatchUserErrorResponseBody extends CommonErrorResponseBody {}

// DELETE
export interface DeleteUserRequestBody extends CommonRequestBody {
  username: string;
}

export interface DeleteUserResponseBody extends CommonResponseBody {
  username: string;
}

export interface DeleteUserErrorResponseBody extends CommonErrorResponseBody {}
