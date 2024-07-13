// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import loginController from "@/router/auth/login/loginController";
import loginValidator from "@/router/auth/login/loginValidator";
import { Router } from "express";

const router = Router();

router.post("/login", loginValidator.postLogin, loginController.postLogin);

export { router as authRouter };
