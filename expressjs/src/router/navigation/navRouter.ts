// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Router } from "express";
import navController from "./navController";
import { navValidator } from "./navValidator";

const router = Router();

// NOTE: 추후 라우터 세분화 되는 경우, ROUTE 사용
router.get("/", navValidator.getNavigation, navController.getNavigation);
router.patch("/", navValidator.putNavigation, navController.putNavigation);

export default router;
