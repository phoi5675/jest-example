// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { PostUserReq } from "@/router/manage/user/types/PostUser";
import { mockReq } from "@/shared/utils/__test__/mockMiddleware";

export const postUserReq = mockReq<PostUserReq>({
  body: {
    username: "username",
    password: "password",
    email: "user@testmail.com",
  },
});
