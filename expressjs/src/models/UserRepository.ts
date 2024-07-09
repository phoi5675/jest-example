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

  // Create
  async createUser(user: User): Promise<string | undefined> {
    const createdUserName = await this.knex(UserRepository.tableName).insert(
      user,
      ["username"]
    );

    return createdUserName.shift()?.username;
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
      .delete(["username"], { includeTriggerModifications: true });

    return deletedUser;
  }
}

const userRepository = new UserRepository(knex);

export { UserRepository, userRepository };
