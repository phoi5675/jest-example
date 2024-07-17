// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import ENV from "@/constant/env";
import { HashedPassword } from "@/shared/types/Crypto";
import crypto, { generateKeyPairSync, RSAKeyPairOptions } from "crypto";
import moment from "moment";

const initKeyPair = () => {
  const { publicKey, privateKey } = generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  } as RSAKeyPairOptions<"pem", "pem">);

  return { publicKey, privateKey };
};

const encryptByPrivateKey = (data: string, date: string): string => {
  const privateKey = ENV.PRIVATE_KEY;
  const dateString = moment(date).toISOString();

  const dataToEncrypt = `${data}${dateString}`;
  return crypto
    .privateEncrypt(privateKey, Buffer.from(dataToEncrypt))
    .toString("base64");
};

const encryptByPublicKey = (data: string, date: string): string => {
  const publicKey = ENV.PUBLIC_KEY;
  const dateString = moment(date).toISOString();

  const dataToEncrypt = `${data}${dateString}`;

  return crypto
    .publicEncrypt(publicKey, Buffer.from(dataToEncrypt))
    .toString("base64");
};

const decryptByPrivateKey = (data: string): string => {
  const privateKey = ENV.PRIVATE_KEY;

  return crypto
    .privateDecrypt(privateKey, Buffer.from(data, "base64"))
    .toString("utf-8");
};

const decryptByPublicKey = (data: string): string => {
  const publicKey = ENV.PUBLIC_KEY;

  return crypto
    .publicDecrypt(publicKey, Buffer.from(data, "base64"))
    .toString("utf-8");
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
  decryptByPublicKey,
  encryptByPrivateKey,
  encryptByPublicKey,
  encryptPassword,
  initKeyPair,
  isPasswordValid,
};
