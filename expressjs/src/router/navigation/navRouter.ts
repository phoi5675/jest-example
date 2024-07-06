// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Router } from "express";
import navController from "./navController";
import { navValidator } from "./navValidator";

const router = Router();

router.get("/", navValidator.getNavigation, navController.getNavigation);
router.patch("/", navValidator.putNavigation, navController.putNavigation);

export default router;
