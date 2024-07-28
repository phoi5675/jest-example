// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ENV from "@/constant/env";
import knex from "@/models/knexConfig";
import logger from "@/shared/utils/logger";
import { navigationRepository } from "./NavigationRepository";
import { userRepository } from "./UserRepository";

const initModels = async () => {
  if (ENV.NODE_ENV !== `local` && ENV.NODE_ENV !== `test`) {
    return;
  }

  logger.log(`[MODEL] init models`);
  await userRepository.createTable(knex);
  await navigationRepository.createTable(knex);
};

const dropModels = async () => {
  if (
    (ENV.NODE_ENV !== `local` && ENV.NODE_ENV !== `test`) ||
    !ENV.DEL_DB_AFTER_QUIT
  ) {
    return;
  }

  logger.log(`[MODEL] drop models`);
  await userRepository.dropTable(knex);
  await navigationRepository.dropTable(knex);
};

export { dropModels, initModels };
