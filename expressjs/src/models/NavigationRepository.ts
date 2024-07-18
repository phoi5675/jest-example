// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Navigation } from "@/shared/types/models/Navigation";
import { Knex } from "knex";
import Repository from "./Repository";
import { UserRepository } from "./UserRepository";
import knex from "./knexConfig";

class NavigationRepository extends Repository {
  static tableName = "navigation" as const;

  constructor(knex: Knex) {
    super(knex);
  }

  createTable = async (knex: Knex) => {
    if (await knex.schema.hasTable(NavigationRepository.tableName)) {
      return;
    }
    await knex.schema.createTable(
      NavigationRepository.tableName,
      (table: Knex.CreateTableBuilder) => {
        table.increments("seq").notNullable().unique();
        table.string("path", 30).notNullable();
        table.integer("FK_user_seq").notNullable();

        table.primary(["seq"]);
      }
    );
  };

  dropTable = async (knex: Knex) => {
    await knex.schema.dropTableIfExists(NavigationRepository.tableName);
  };

  async findByPath(
    username: string,
    path: string
  ): Promise<Navigation | undefined> {
    const user = await this.knex(UserRepository.tableName)
      .where({ username })
      .first();

    if (!user) {
      return;
    }

    return this.knex(NavigationRepository.tableName)
      .where({ path: path, FK_user_seq: user.seq })
      .first();
  }

  async findPathByUsername(
    username: string
  ): Promise<Array<Navigation> | undefined> {
    const user = await this.knex(UserRepository.tableName)
      .where({ username })
      .first();

    if (!user) {
      return;
    }

    return this.knex(NavigationRepository.tableName).where({
      FK_user_seq: user.seq,
    });
  }
}

const navigationRepository = new NavigationRepository(knex);

export { NavigationRepository, navigationRepository };
