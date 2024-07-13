// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_DRIVER: string;
      DB_HOST: string;
      DB_PORT: number;
      DB_NAME: string;
      DB_USER: string;
      DB_PASSWORD: string;

      SERVER_PORT: number;
      NODE_ENV: "local" | "development" | "production";
      DEL_DB_AFTER_QUIT?: string;
      MAX_TOKEN_VALID_MIN: number;

      PUBLIC_KEY: string;
      PRIVATE_KEY: string;
    }
  }
}

export {};
