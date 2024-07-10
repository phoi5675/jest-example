// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ROUTE from "@/constant/route";
import { Router } from "express";
import { userController } from "./user/userController";
import { userValidator } from "./user/userValidator";

const router = Router();

router.get(
  ROUTE.manage.user.url,
  userValidator.getUser,
  userController.getUser
);
router.post(
  ROUTE.manage.user.url,
  userValidator.postUser,
  userController.createUser
);
router.patch(
  ROUTE.manage.user.url,
  userValidator.patchUser,
  userController.updateUser
);
router.delete(
  ROUTE.manage.user.url,
  userValidator.deleteUser,
  userController.deleteUser
);

export default router;
