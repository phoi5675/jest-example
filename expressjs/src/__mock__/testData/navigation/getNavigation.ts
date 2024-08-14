// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { GetNavReq } from "@/router/navigation/types/GetNav";
import { mockReq } from "@/shared/utils/__test__/mockMiddleware";

export const getNavReq = mockReq<GetNavReq>({
  body: {
    username: "username",
  },
});
