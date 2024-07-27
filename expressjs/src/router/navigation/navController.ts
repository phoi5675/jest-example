// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  GetNaReq,
  GetNavErrorResBody,
  GetNavRes,
  GetNavResBody,
} from "@/router/navigation/types/GetNav";

import { PutNaReq, PutNavRes } from "@/router/navigation/types/PutNav";
import { BaseController } from "@/shared/class/handlerClass";
import logger from "@/shared/utils/logger";
import StatusCodes from "http-status-codes";
import { navService } from "./navService";

class NavController extends BaseController {
  getNavigation = async (req: GetNaReq, res: GetNavRes) => {
    try {
      const navItems = await navService.getNavItemsByUserId(req.body.username);

      if (!navItems) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send({ message: "Pathlist not found" });
      } else {
        const response: GetNavResBody[] = navItems;
        res.status(StatusCodes.OK).send(response);
      }
    } catch (error) {
      logger.error(error);
      const response: GetNavErrorResBody = {
        message: "Error fetching navigation items",
      };
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(response);
    }
  };

  putNavigation = async (req: PutNaReq, res: PutNavRes) => {
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
