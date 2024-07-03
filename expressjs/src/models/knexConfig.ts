// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ENV from "@/constant/env";
import * as _knex from "knex";

const knex: _knex.Knex = _knex.knex({
  client: ENV.DB_DRIVER,
  connection: {
    host: ENV.DB_HOST,
    user: ENV.DB_USER,
    password: ENV.DB_PASSWORD,
    database: ENV.DB_NAME,
    port: Number(ENV.DB_PORT),
  },
  debug: false,
});

export default knex;
