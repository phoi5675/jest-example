// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Router } from "express";
import navController from "./navController";

const router = Router();

router.get("/", navController.getNavigation);
router.patch("/", navController.patchNavigation);

export default router;
