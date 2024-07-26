// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { BaseRes } from "@/shared/types/express/Response";

export const mockRes = <T extends BaseRes>() => {
  const res: T = {} as T;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res;
};
