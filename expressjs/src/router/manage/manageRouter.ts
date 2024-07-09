// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Router } from "express";
import { userController } from "./user/userController";
import { userValidator } from "./user/userValidator";

const router = Router();
const MANAGE_PATH = "/manage";

router.get(MANAGE_PATH, userValidator.getUser, userController.getUser);
router.post(MANAGE_PATH, userValidator.postUser, userController.createUser);
router.patch(MANAGE_PATH, userValidator.patchUser, userController.updateUser);
router.delete(MANAGE_PATH, userValidator.deleteUser, userController.deleteUser);
