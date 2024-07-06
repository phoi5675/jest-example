/* eslint-disable no-console */
// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Singleton from "../class/singletonClass";

type LogType = `log` | `error` | `debug`;

class Logger extends Singleton {
  private static _print = (
    logType: LogType,
    message: string | unknown,
    ...optionalParams: unknown[]
  ): void => {
    console[logType](
      `[${new Date().toISOString()}][${logType.toUpperCase()}]: ${message}`,
      ...optionalParams
    );
  };

  log(message: string | unknown, ...optionalParams: unknown[]) {
    Logger._print(`log`, message, ...optionalParams);
  }

  debug(message: string | unknown, ...optionalParams: unknown[]) {
    Logger._print(`debug`, message, ...optionalParams);
  }

  error(message: string | unknown, ...optionalParams: unknown[]) {
    Logger._print(`error`, message, ...optionalParams);
  }
}

const logger = new Logger();

export default logger;
