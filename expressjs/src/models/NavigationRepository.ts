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
  static tableName = "navigation";
  static createTable = async (knex: Knex) => {
    if (await knex.schema.hasTable(NavigationRepository.tableName)) {
      return;
    }
    await knex.schema.createTable(
      NavigationRepository.tableName,
      (table: Knex.CreateTableBuilder) => {
        table.increments("seq").notNullable();
        table.string("path", 30).notNullable();
        table.integer("FK_user_seq").notNullable();

        table.primary(["seq"]);
      }
    );
  };
  static dropTable = async (knex: Knex) => {
    if (await knex.schema.hasTable(NavigationRepository.tableName)) {
      await knex.schema.dropTableIfExists(NavigationRepository.tableName);
    }
  };

  constructor(knex: Knex) {
    super(knex);
  }

  async findByPath(path: string): Promise<Navigation | undefined> {
    return this.knex(NavigationRepository.tableName).where({ path }).first();
  }

  async findByUsername(
    username: string
  ): Promise<Array<Navigation> | undefined> {
    const user = await this.knex(UserRepository.tableName)
      .where({ username })
      .first();

    if (!user) {
      return;
    }

    return this.knex(NavigationRepository.tableName).where({
      FK_user_id: user.id,
    });
  }
}

const navigationRepository = new NavigationRepository(knex);

export { NavigationRepository, navigationRepository };
