// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import dotenv from "dotenv";

dotenv.config({
  path: `${process.cwd()}/env/.env.local`,
  debug: true,
});

process.env.MAX_TOKEN_VALID_MIN = parseInt(
  process.env.MAX_TOKEN_VALID_MIN as unknown as string
);

const ENV = process.env;

export default ENV;
