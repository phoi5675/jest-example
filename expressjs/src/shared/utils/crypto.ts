// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import ENV from "@/constant/env";
import { HashedPassword } from "@/shared/types/Crypto";
import crypto from "crypto";
import moment from "moment";

function decryptByPrivateKey(data: string, date?: string): string {
  const privateKey = ENV.PRIVATE_KEY;
  let dataToDecrypt: string;

  if (date) {
    const dateString = moment(date).toISOString();
    dataToDecrypt = `${dateString}${data}`;
  } else {
    dataToDecrypt = data;
  }

  return crypto
    .privateDecrypt(
      { key: privateKey, padding: crypto.constants.RSA_NO_PADDING },
      Buffer.from(dataToDecrypt)
    )
    .toString();
}

const encryptByPrivateKey = (data: string, date: string): string => {
  const privateKey = ENV.PRIVATE_KEY;
  const dateString = moment(date).toISOString();

  const dataToEncrypt = `${dateString}${data}`;
  return crypto
    .privateEncrypt(
      { key: privateKey, padding: crypto.constants.RSA_NO_PADDING },
      Buffer.from(dataToEncrypt)
    )
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
