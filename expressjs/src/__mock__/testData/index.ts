// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { postLoginReq } from "@/testData/auth/login/postLogin";
import { postUserReq } from "@/testData/manage/user/postUser";
import _ from "lodash";

const testData = {
  postLoginReq,
  postUserReq,
} as const;

const getTestData = (
  key: keyof typeof testData
): (typeof testData)[typeof key] => {
  return _.cloneDeep(testData[key]);
};

export { getTestData };
