// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import ENV from "@/constant/env";
import crypto from "crypto";

const decryptByPrivateKey = (
  encryptedByPubKey: string,
  privateKey: string = ENV.PRIVATE_KEY
): string => {
  return crypto
    .privateDecrypt(privateKey, Buffer.from(encryptedByPubKey))
    .toString();
};

const encryptPassword = (
  password: string
): { hashedPassword: string; salt: string } => {
  const salt = crypto.randomBytes(32).toString("hex");
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 128, "sha256")
    .toString("hex");

  return { salt, hashedPassword };
};

const isPasswordValid = (
  password: string,
  hashedPasswordInDb: string,
  salt: string
): boolean => {
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 128, "sha256")
    .toString("hex");
  return hashedPassword === hashedPasswordInDb;
};

export { decryptByPrivateKey, encryptPassword, isPasswordValid };
