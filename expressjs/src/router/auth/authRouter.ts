// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ROUTE from "@/constant/route";
import loginController from "@/router/auth/login/loginController";
import loginValidator from "@/router/auth/login/loginValidator";
import { Router } from "express";

const router = Router();

router.post(
  ROUTE.auth.login.url,
  loginValidator.postLogin,
  loginController.postLogin
);

export default router;
