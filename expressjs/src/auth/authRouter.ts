// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import loginController from "@auth/login/loginController";
import { Router } from "express";

const router = Router();

router.post("/login", loginController.postLogin);

export default router;
