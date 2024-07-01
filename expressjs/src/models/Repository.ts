// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Knex } from "knex";

class Repository {
  private _instance: unknown;
  protected readonly knex: Knex;

  constructor(knex: Knex) {
    if (this._instance) {
      throw new Error("Error - already instantiated.");
    } else {
      this._instance = this;
      this.knex = knex;
    }
  }
}

export default Repository;
