// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import express, { NextFunction, Request, Response } from "express";

const app = express();

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome!");
});

app.listen("3000", () => {
  console.log(`hello, world!`);
});
