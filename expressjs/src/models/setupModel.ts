// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import knex from "@/models/knexConfig";
import logger from "@/shared/utils/logger";
import NavigationRepository from "./NavigationRepository";
import UserRepository from "./UserRepository";

const initModels = async () => {
  logger.log(`[MODEL] init models`);
  await UserRepository.createTable(knex);
  await NavigationRepository.createTable(knex);
};

const dropModels = async () => {
  logger.log(`[MODEL] drop models`);
  await UserRepository.dropTable(knex);
  await NavigationRepository.dropTable(knex);
};

export { dropModels, initModels };
