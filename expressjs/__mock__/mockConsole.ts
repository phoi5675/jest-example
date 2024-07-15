// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const mockConsole = () => {
  console = {
    ...console,
    log: jest.fn(),
    info: jest.fn(),
    // error: jest.fn()
  };
};

export { mockConsole };
