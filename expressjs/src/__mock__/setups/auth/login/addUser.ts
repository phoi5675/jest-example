// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { PostUserReq, PostUserRes } from "@/router/manage/user/types/PostUser";
import { userService } from "@/router/manage/user/userService";
import { mockRes } from "@/shared/utils/__test__/mockMiddleware";
import { postUserReq } from "@/testData/manage/user/postUser";

export const addUser = async (req: PostUserReq = postUserReq) => {
  const res = mockRes<PostUserRes>();
  await userService.createUser(req, res);
};
