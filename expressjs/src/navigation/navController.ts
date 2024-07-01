// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import logger from "@/shared/utils/logger";
import { Request, Response } from "express";
import StatusCodes from "http-status-codes";
import {
  PatchNavErrResponse,
  PatchNavRequest,
  PatchNavResponse,
} from "./navInterface";

class NavController {
  async getNavigation(req: Request, res: Response) {
    res.status(StatusCodes.OK).send({ message: "List of navigations" });
  }

  async patchNavigation(
    req: Request<PatchNavRequest>,
    res: Response<PatchNavResponse | PatchNavErrResponse>
  ) {
    try {
      res.status(StatusCodes.ACCEPTED).send({ message: "Navigation updated" });
    } catch (error) {
      logger.error(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: "Patch navigation error!" });
    }
  }
}

export default new NavController();
