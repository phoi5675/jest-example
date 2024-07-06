// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

class Singleton {
  private _instance: this | undefined;

  constructor() {
    if (this._instance) {
      throw new Error("Error - already instantiated.");
    } else {
      this._instance = this;
    }
  }
}

export default Singleton;
