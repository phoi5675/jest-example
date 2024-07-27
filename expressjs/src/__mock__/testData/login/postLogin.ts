// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { PostLogiReq } from "@/router/auth/login/types/PostLogin";
import { mockReq } from "@/shared/utils/__test__/mockMiddleware";

export const postLoginReq = mockReq<PostLogiReq>({
  body: {
    username: "username",
    password: "password",
  },
});
