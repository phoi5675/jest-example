// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import dotenv from "dotenv";

dotenv.config({
  path: `${process.cwd()}/env/.env.local`,
  debug: true,
});

const ENV = process.env;

export default ENV;
