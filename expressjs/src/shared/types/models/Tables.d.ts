// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Knex } from "knex";
import { Navigation } from "./Navigation";
import { User } from "./User";

/**
 * Define types for the composite table types in knex instance.
 * See Knex.CompositeTableType or https://knexjs.org/guide/#typescript to define types
 */
declare module "knex/types/tables.js" {
  interface Tables {
    navigation: Knex.CompositeTableType<
      Navigation,
      Pick<Navigation, "path" | "FK_user_seq">,
      Partial<Omit<Navigation, "seq">>
    >;

    user: Knex.CompositeTableType<
      User,
      Pick<User, "username" | "email" | "password" | "salt">,
      Partial<Omit<User, "seq", "salt">>
    >;
  }
}
