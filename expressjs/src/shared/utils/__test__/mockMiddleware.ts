// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { CommonResponse } from "@/shared/types/ExpressCore";

export const mockResponse = <T extends CommonResponse>() => {
  const res: T = {} as T;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res;
};
