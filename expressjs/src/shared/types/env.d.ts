// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

interface DbEnvType {
  [key: string]: string;
  DB_DRIVER: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
}

interface ServerEnvType {
  [key: string]: string;
  SERVER_PORT: number;
  NODE_ENV: string;
}

type EnvType = DbEnvType | ServerEnvType;

export default EnvType;
