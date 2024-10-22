// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { navService } from "@/router/navigation/navService";
import { PutNavReq } from "@/router/navigation/types/PutNav";
import { putNavReq } from "@/testData/navigation/putNavigation";

export const addNavigation = async (req: PutNavReq = putNavReq()) => {
  await navService.putNavItemsByUserId(req);
};
