// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Router } from "express";
import { userController } from "./user/userController";
import { userValidator } from "./user/userValidator";

const router = Router();

router.get("/user", userValidator.getUser, userController.getUser);
router.post("/user", userValidator.postUser, userController.createUser);
router.patch("/user", userValidator.patchUser, userController.updateUser);
router.delete("/user", userValidator.deleteUser, userController.deleteUser);

export { router as manageRouter };
