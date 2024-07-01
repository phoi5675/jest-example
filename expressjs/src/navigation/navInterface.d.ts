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

export interface PatchNavRequest {
  userId: string;
  navData: unknown;
}

export interface PatchNavResponse extends CommonResponse {
  userId: string;
}

export interface PatchNavErrResponse extends CommonErrorResponse {}
