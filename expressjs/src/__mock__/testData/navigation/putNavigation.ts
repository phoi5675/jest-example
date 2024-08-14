// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { PutNavReq } from "@/router/navigation/types/PutNav";
import { mockReq } from "@/shared/utils/__test__/mockMiddleware";

export const putNavReq = mockReq<PutNavReq>({
  body: {
    username: "username",
    navData: ["/", "/auth/login", "/manage/user", "/navigation"],
  },
});
