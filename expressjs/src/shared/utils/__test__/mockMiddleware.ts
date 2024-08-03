// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { BaseReq } from "@/shared/types/express/Request";
import { BaseRes } from "@/shared/types/express/Response";
import { response } from "express";
export const mockReq = <T extends BaseReq>(req: Partial<T>) => {
  const _req: T = {
    body: req.body || {},
    params: req.params || {},
    query: req.query || {},
  } as T;

  return _req;
};

export const mockRes = <T extends BaseRes>() => {
  const res = response as T;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.set = jest.fn().mockReturnValue(res);

  return res;
};

export const mockNext = jest.fn().mockReturnValue(undefined);
