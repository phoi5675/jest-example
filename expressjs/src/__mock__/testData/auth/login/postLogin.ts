// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { PostLoginReq } from "@/router/auth/login/types/PostLogin";
import { mockReq } from "@/shared/utils/__test__/mockMiddleware";
import { encryptByPublicKey } from "@/shared/utils/crypto";

const encryptedPassword = encryptByPublicKey("password");

export const postLoginReq = mockReq<PostLoginReq>({
  body: {
    username: "username",
    password: encryptedPassword,
  },
});
