// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Env } from "@/shared/types/Env";
import { initKeyPair } from "@/shared/utils/crypto";
import dotenv from "dotenv";

dotenv.config({
  path: `${process.cwd()}/env/.env.local`,
  encoding: `utf-8`,
  // debug: true,
});

const { privateKey, publicKey } = initKeyPair();

const ENV: Env = {
  ...process.env,
  DB_PORT: parseInt(process.env.DB_PORT),
  MAX_TOKEN_VALID_MIN: parseInt(process.env.MAX_TOKEN_VALID_MIN),
  PRIVATE_KEY: privateKey,
  PUBLIC_KEY: publicKey,
};

// logger.log(ENV);
export default ENV;
