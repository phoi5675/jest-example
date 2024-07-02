// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Response } from "express";

export interface CommonResponse extends Response {
  message: string;
}

export interface CommonErrorResponse extends Response {
  message: string;
}
