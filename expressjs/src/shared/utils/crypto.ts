// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import ENV from "@/constant/env";
import { HashedPassword } from "@/shared/types/Crypto";
import crypto, { generateKeyPairSync, RSAKeyPairOptions } from "crypto";

export const initKeyPair = () => {
  const { publicKey, privateKey } = generateKeyPairSync("rsa", {
    modulusLength: 1024,
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

export const encryptByPrivateKey = <T>(data: T): string => {
  const privateKey = ENV.PRIVATE_KEY;
  const stringified = JSON.stringify(data);

  return crypto
    .privateEncrypt(privateKey, Buffer.from(stringified))
    .toString("base64");
};

export const encryptByPublicKey = <T>(data: T): string => {
  const publicKey = ENV.PUBLIC_KEY;
  const stringified = JSON.stringify(data);

  return crypto
    .publicEncrypt(publicKey, Buffer.from(stringified))
    .toString("base64");
};

export const decryptByPrivateKey = <T>(data: string): T => {
  const privateKey = ENV.PRIVATE_KEY;
  const decrypted = crypto
    .privateDecrypt(privateKey, Buffer.from(data, "base64"))
    .toString("utf-8");

  return JSON.parse(decrypted);
};

export const decryptByPublicKey = <T>(data: string): T => {
  const publicKey = ENV.PUBLIC_KEY;
  const decrypted = crypto
    .publicDecrypt(publicKey, Buffer.from(data, "base64"))
    .toString("utf-8");

  return JSON.parse(decrypted);
};

export const encryptPassword = (password: string): HashedPassword => {
  const salt = crypto.randomBytes(32).toString("hex");
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 128, "sha256")
    .toString("hex");

  return { salt, hashedPassword };
};

export const isPasswordValid = (
  password: string,
  hashedPasswordInDb: string,
  salt: string
): boolean => {
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 128, "sha256")
    .toString("hex");
  return hashedPassword === hashedPasswordInDb;
};
