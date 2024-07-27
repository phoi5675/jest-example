// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_DRIVER: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_NAME: string;
      DB_USER: string;
      DB_PASSWORD: string;

      SERVER_PORT: string;
      NODE_ENV: "local" | "development" | "production" | "test";
      DEL_DB_AFTER_QUIT?: string;
      MAX_TOKEN_VALID_MIN: string;

      PUBLIC_KEY: string;
      PRIVATE_KEY: string;
    }
  }
}

interface Env extends NodeJS.ProcessEnv {
  [key: string]: string | number;
  DB_PORT: number;
  MAX_TOKEN_VALID_MIN: number;
}

export { Env };
