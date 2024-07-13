// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import ENV from "@/constant/env";
import { HashedPassword } from "@/shared/types/Crypto";
import crypto from "crypto";

function decryptByPrivateKey(data: string, date?: Date): string {
  const privateKey = ENV.PRIVATE_KEY;
  let dataToDecrypt: string;

  if (date) {
    const dateString = date?.toISOString();
    dataToDecrypt = `${dateString}${data}`;
  } else {
    dataToDecrypt = data;
  }

  return crypto
    .privateDecrypt(privateKey, Buffer.from(dataToDecrypt))
    .toString();
}

const encryptByPrivateKey = (data: string, date: Date): string => {
  const privateKey = ENV.PRIVATE_KEY;
  const dateString = date.toISOString();

  const dataToEncrypt = `${dateString}${data}`;
  return crypto
    .privateEncrypt(privateKey, Buffer.from(dataToEncrypt))
    .toString();
};

const encryptPassword = (password: string): HashedPassword => {
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

export {
  decryptByPrivateKey,
  encryptByPrivateKey,
  encryptPassword,
  isPasswordValid,
};
