// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { CommonController } from "@/shared/class/handler";
import {
  CommonRequestParams,
  CustomRequest,
  CustomResponse,
} from "@/shared/types/expressCore";
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
import { navService } from "./navService";

class NavController extends CommonController {
  getNavigation = async (
    req: CustomRequest<
      CommonRequestParams,
      GetNavResponseBody[] | GetNavErrResponseBody,
      GetNavRequestBody
    >,
    res: CustomResponse<GetNavResponseBody[] | GetNavErrResponseBody>
  ) => {
    try {
      const navItems = await navService.getNavItemsByUserId(req.body.username);

      if (!navItems) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send({ message: "Pathlist not found" });
      } else {
        const response: GetNavResponseBody[] = navItems;
        res.status(StatusCodes.OK).send(response);
      }
    } catch (error) {
      logger.error(error);
      const response: GetNavErrResponseBody = {
        message: "Error fetching navigation items",
      };
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(response);
    }
  };

  patchNavigation = async (
    req: CustomRequest<
      CommonRequestParams,
      PatchNavResponseBody[] | PatchNavErrResponseBody,
      PatchNavRequestBody
    >,
    res: CustomResponse<PatchNavResponseBody[] | PatchNavErrResponseBody>
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
