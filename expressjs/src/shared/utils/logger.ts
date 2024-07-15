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
    let _msg: string | unknown;
    if (typeof message === `string`) {
      _msg = message;
    } else {
      _msg = ``;
      optionalParams = [message, ...optionalParams];
    }
    console[logType](
      `[${new Date().toISOString()}][${logType.toUpperCase()}]: ${_msg}`,
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
