// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { userRepository } from "@/models/UserRepository";
import { Request } from "express";

// TODO: add service logic for login here

class LoginService {
  postLogin = async (req: Request): Promise<string | undefined> => {
    // TODO: implement this method to send a request to the server with username and password.
    const { username, password } = req.body;

    const user = await userRepository.findByUsername(username);

    if (!user) {
      return;
    }

    if (user.password !== password) {
      return;
    }

    return `t0ken`;
  };
}

export default new LoginService();
