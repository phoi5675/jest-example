// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export type Url = `/${string}`;

export type TokenValidityWaiver = `${HttpMethod} ${Url}`;
