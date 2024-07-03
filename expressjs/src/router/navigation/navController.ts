// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { CustomRequest, CustomResponse } from "@/shared/types/expressCore";
import logger from "@/shared/utils/logger";
import StatusCodes from "http-status-codes";
import {
  GetNavErrResponseBody,
  GetNavRequestBody,
  GetNavResponseBody,
  PatchNavErrResponseBody,
  PatchNavRequestBody,
  PatchNavResponseBody,
} from "./navInterface";

class NavController {
  getNavigation = async (
    req: CustomRequest<
      GetNavResponseBody | GetNavErrResponseBody,
      GetNavRequestBody
    >,
    res: CustomResponse<GetNavResponseBody | GetNavErrResponseBody>
  ) => {
    res.status(StatusCodes.OK).send({ message: "List of navigations" });
  };

  patchNavigation = async (
    req: CustomRequest<
      PatchNavResponseBody | PatchNavErrResponseBody,
      PatchNavRequestBody
    >,
    res: CustomResponse<PatchNavResponseBody | PatchNavErrResponseBody>
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
