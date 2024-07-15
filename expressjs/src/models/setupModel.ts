// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ENV from "@/constant/env";
import knex from "@/models/knexConfig";
import logger from "@/shared/utils/logger";
import { NavigationRepository } from "./NavigationRepository";
import { UserRepository } from "./UserRepository";

const initModels = async () => {
  if (ENV.NODE_ENV !== `local`) {
    return;
  }

  logger.log(`[MODEL] init models`);
  await UserRepository.createTable(knex);
  await NavigationRepository.createTable(knex);
};

const dropModels = async () => {
  if (ENV.NODE_ENV !== `local` || !ENV.DEL_DB_AFTER_QUIT) {
    return;
  }

  logger.log(`[MODEL] drop models`);
  await UserRepository.dropTable(knex);
  await NavigationRepository.dropTable(knex);
};

export { dropModels, initModels };
