// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HashedPassword } from "@/shared/types/Crypto";
import Joi from "joi";
import {
  decryptByPrivateKey,
  decryptByPublicKey,
  encryptByPrivateKey,
  encryptByPublicKey,
  encryptPassword,
  isPasswordValid,
} from "../crypto";
import { isValidResponse } from "./jestUtil";

describe(`Crypto util test`, () => {
  describe(`Asymmetric crypto functions test`, () => {
    it(`should be able to encrypt using private key`, () => {
      const data = `some data`;

      const encrypted = encryptByPrivateKey(data);

      expect(encrypted).toBeDefined();
      expect(encrypted).not.toBe(data);
    });
    it(`should be able to encrypt using public key`, () => {
      const data = `some data`;

      const encrypted = encryptByPublicKey(data);

      expect(encrypted).toBeDefined();
      expect(encrypted).not.toBe(data);
    });
    it(`should be able to decrypt using private key, encrypted string using public key`, () => {
      const data = `some data`;

      const expectedData = data;

      const encrypted = encryptByPublicKey(data);
      const decrypted = decryptByPrivateKey<string>(encrypted);

      expect(encrypted).toBeDefined();
      expect(decrypted).toBeDefined();
      expect(encrypted).not.toBe(expectedData);
      expect(decrypted).toBe(expectedData);
    });
    it(`should be able to decrypt using public key, encrypted string using private key`, () => {
      const data = `some data`;

      const expectedData = data;

      const encrypted = encryptByPrivateKey(data);
      const decrypted = decryptByPublicKey<string>(encrypted);

      expect(encrypted).toBeDefined();
      expect(decrypted).toBeDefined();
      expect(encrypted).not.toBe(expectedData);
      expect(decrypted).toBe(expectedData);
    });
    it(`should not be able to decrypt using public key, encrypted string by public key`, () => {
      const data = `some data`;

      const encrypted = encryptByPublicKey(data);

      expect(encrypted).toBeDefined();
      expect(() => {
        decryptByPublicKey<string>(encrypted);
      }).toThrow();
    });
    it(`should not be able to decrypt using private key, encrypted string by private key`, () => {
      const data = `some data`;

      const encrypted = encryptByPrivateKey(data);

      expect(encrypted).toBeDefined();
      expect(() => {
        decryptByPrivateKey<string>(encrypted);
      }).toThrow();
    });
  });
  describe(`One way hashing crypto functions test`, () => {
    it(`shoud return hashed password`, () => {
      const password = `Passw0rd`;

      const hashedPassword = encryptPassword(password);

      const validator = Joi.object<HashedPassword>({
        salt: Joi.string().required(),
        hashedPassword: Joi.string().required(),
      });

      const isValid = isValidResponse<HashedPassword>(
        validator,
        hashedPassword
      );

      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toBe(password);
      expect(isValid).toBeTruthy();
    });
    it(`should return true when the hashedPassword is hashed from a plain text password`, () => {
      const password = `Passw0rd`;

      const hashedPassword = encryptPassword(password);

      const isValid = isPasswordValid(
        password,
        hashedPassword.hashedPassword,
        hashedPassword.salt
      );

      expect(isValid).toBeTruthy();
    });
    it(`should return true when the hashedPassword is hashed from a plain text password`, () => {
      const password = `Passw0rd`;
      const wrongPassword = `wr0ng passw0rd`;

      const hashedPassword = encryptPassword(password);

      const isValid = isPasswordValid(
        wrongPassword,
        hashedPassword.hashedPassword,
        hashedPassword.salt
      );

      expect(isValid).toBeFalsy();
    });
  });
});
