// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ENV from "@/constant/env";
import knex, { Knex } from "knex";

const _knex: Knex = knex({
  client: "mysql",
  connection: {
    host: ENV.DB_HOST,
    user: ENV.DB_USER,
    password: ENV.DB_PASSWORD,
    database: ENV.DB_NAME,
  },
});

export default _knex;
