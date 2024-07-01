// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import EnvType from "@/shared/types/env.d";
import dotenv from "dotenv";

dotenv.config({
  path: `${process.cwd()}/env/.env.local`,
  debug: true,
});

const ENV = { ...process.env } as EnvType;

export default ENV;
