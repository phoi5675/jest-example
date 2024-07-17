// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import moment from "moment";
import {
  decryptByPrivateKey,
  encryptByPrivateKey,
  encryptByPublicKey,
} from "../crypto";

describe(`crypto util test`, () => {
  it(`should be able to encrypt using private key`, () => {
    const data = `some data`;
    const now = moment().toISOString();

    const encrypted = encryptByPrivateKey(data, now);

    expect(encrypted).toBeDefined();
    expect(encrypted).not.toBe(data);
  });
  it(`should be able to encrypt using public key`, () => {
    const data = `some data`;
    const now = moment().toISOString();

    const encrypted = encryptByPublicKey(data, now);

    expect(encrypted).toBeDefined();
    expect(encrypted).not.toBe(data);
  });
  it(`should be able to decrypt using private key, encrypted string using public key with date`, () => {
    const data = `some data`;
    const now = moment().toISOString();

    const expectedData = `${data}${now}`;

    const encrypted = encryptByPublicKey(data, now);
    const decrypted = decryptByPrivateKey(encrypted);

    expect(encrypted).toBeDefined();
    expect(decrypted).toBeDefined();
    expect(encrypted).not.toBe(expectedData);
    expect(decrypted).toBe(expectedData);
  });
  it(`should be able to encrypt using public key, encrypted string using private key`, () => {});
  it(`should not be able to decrypt using public key, encrypt string by public key`, () => {});
  it(`should not be able to decrypt using private key, encrypt string by private key`, () => {});
});
