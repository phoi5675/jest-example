// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { Response } from "express";
import { OutgoingHttpHeaders } from "http";

export interface BaseResHeader extends OutgoingHttpHeaders {
  token: string;
  "logined-at": string;
}

export interface BaseResBody {
  message?: string;
}

export interface BaseErrorResBody {
  message?: string;
  error?: string;
}

export interface BaseRes<ResBody = BaseResBody | BaseErrorResBody>
  extends Response<ResBody> {}
