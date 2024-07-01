// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { User } from "@/shared/types/models/User";
import { Knex } from "knex";
import Repository from "./Repository";

class UserRepository extends Repository {
  static tableName = "user";
  static createTable = async (knex: Knex) => {
    if (await knex.schema.hasTable(UserRepository.tableName)) {
      return;
    }
    await knex.schema.createTable(
      UserRepository.tableName,
      (table: Knex.CreateTableBuilder) => {
        table.increments("seq").notNullable();
        table.string("username", 10).notNullable();
        table.string("email", 20).notNullable();
        table.string("password", 20).notNullable();

        table.primary(["seq"]);
      }
    );
  };
  static dropTable = async (knex: Knex) => {
    if (await knex.schema.hasTable(UserRepository.tableName)) {
      await knex.schema.dropTable(UserRepository.tableName);
    }
  };

  constructor(knex: Knex) {
    super(knex);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.knex(UserRepository.tableName)
      .where({ username })
      .first();

    if (user) {
      return user as User;
    }
    return;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.knex(UserRepository.tableName)
      .where({ email })
      .first();

    if (user) {
      return user as User;
    }

    return;
  }
}

export default UserRepository;
