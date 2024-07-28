// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { User } from "@/shared/types/models/User";
import { Knex } from "knex";
import Repository from "./Repository";
import knex from "./knexConfig";

class UserRepository extends Repository {
  static tableName = "user" as const;

  constructor(knex: Knex) {
    super(knex);
  }

  createTable = async (knex: Knex) => {
    if (await knex.schema.hasTable(UserRepository.tableName)) {
      return;
    }
    await knex.schema.createTable(
      UserRepository.tableName,
      (table: Knex.CreateTableBuilder) => {
        table.increments("seq").notNullable().unique();
        table.string("username", 10).notNullable().unique();
        table.string("email", 20).notNullable();
        table.string("password", 256).notNullable();
        table.string("salt", 64).notNullable();

        table.primary(["seq"]);
      }
    );
  };

  dropTable = async (knex: Knex) => {
    await knex.schema.dropTableIfExists(UserRepository.tableName);
  };

  // Create
  async createUser(user: User): Promise<number | undefined> {
    const createdUserName = await this.knex(UserRepository.tableName).insert(
      user
    );

    return createdUserName.shift();
  }

  // Read
  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.knex(UserRepository.tableName)
      .where({ username })
      .first();

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.knex(UserRepository.tableName)
      .where({ email })
      .first();

    return user;
  }

  async findUserWithPassword(
    username: string,
    password: string
  ): Promise<User | undefined> {
    const user = await this.knex(UserRepository.tableName)
      .where({ username, password })
      .first();

    return user;
  }

  // Update
  async updateUserByUsername(
    username: string,
    user: Partial<User>
  ): Promise<string | undefined> {
    const updatedUser = await this.knex(UserRepository.tableName)
      .where({ username })
      .update(user, ["username"]);

    return updatedUser.shift()?.username;
  }

  // Delete
  async deleteUserByUsername(username: string): Promise<string | undefined> {
    const deletedUser = await this.knex(UserRepository.tableName)
      .where({ username })
      .delete("username", { includeTriggerModifications: true });

    return deletedUser.shift()?.username;
  }
}

const userRepository = new UserRepository(knex);

export { UserRepository, userRepository };
