// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Router } from "express";
import { userController } from "./user/userController";

const router = Router();
const MANAGE_PATH = "/manage";

router.get(MANAGE_PATH, userController.getUser);
router.post(MANAGE_PATH, userController.postUser);
router.patch(MANAGE_PATH, userController.patchUser);
router.delete(MANAGE_PATH, userController.deleteUser);
