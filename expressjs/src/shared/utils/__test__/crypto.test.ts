// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  decryptByPrivateKey,
  decryptByPublicKey,
  encryptByPrivateKey,
  encryptByPublicKey,
} from "../crypto";

describe(`crypto util test`, () => {
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
