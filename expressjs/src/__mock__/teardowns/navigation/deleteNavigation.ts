// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import knex from "@/models/knexConfig";
import { NavigationRepository } from "@/models/NavigationRepository";

export const deleteNavigation = async (): Promise<void> => {
  await knex(NavigationRepository.tableName).delete();
};
