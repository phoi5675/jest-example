// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Singleton from "@/shared/class/singletonClass";
import { Knex } from "knex";

class Repository extends Singleton {
  protected readonly knex: Knex;

  constructor(knex: Knex) {
    super();
    this.knex = knex;
  }
}

export default Repository;
