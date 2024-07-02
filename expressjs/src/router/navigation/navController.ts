// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import logger from "@/shared/utils/logger";
import StatusCodes from "http-status-codes";
import {
  GetNavController,
  GetNavErrResponse,
  GetNavRequest,
  GetNavResponse,
  PatchNavController,
  PatchNavErrResponse,
  PatchNavRequest,
  PatchNavResponse,
} from "./navInterface";

class NavController {
  getNavigation: GetNavController = (
    req: GetNavRequest,
    res: GetNavResponse | GetNavErrResponse
  ) => {
    res.status(StatusCodes.OK).send({ message: "List of navigations" });
  };

  patchNavigation: PatchNavController = async (
    req: PatchNavRequest,
    res: PatchNavResponse | PatchNavErrResponse
  ) => {
    try {
      res.status(StatusCodes.ACCEPTED).send({ message: "Navigation updated" });
    } catch (error) {
      logger.error(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: "Patch navigation error!" });
    }
  };
}

export default new NavController();
