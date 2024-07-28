// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import knex from "@/models/knexConfig";

afterAll(async () => {
  await knex.destroy();
});
