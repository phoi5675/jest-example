// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import knex from "@/models/knexConfig";
import { UserRepository } from "@/models/UserRepository";

export const deleteUsers = async (): Promise<void> => {
  await knex(UserRepository.tableName).delete();
};
