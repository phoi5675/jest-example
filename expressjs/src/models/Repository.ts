// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Singleton from "@/shared/class/singletonClass";
import { Knex } from "knex";

abstract class Repository extends Singleton {
  protected readonly knex: Knex;

  abstract createTable: (knex: Knex) => Promise<void>;
  abstract dropTable: (knex: Knex) => Promise<void>;

  constructor(knex: Knex) {
    super();
    this.knex = knex;
  }
}

export default Repository;
