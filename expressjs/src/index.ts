// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import authRouter from "@/auth/authRouter";
import fallbackApi from "@/fallbackApi";
import navRouter from "@/navigation/navRouter";
import logger from "@/shared/utils/logger";
import express, { Request, Response } from "express";

const app = express();

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

/**
 * Routes
 */
app.use("/auth", authRouter);
app.use("/navigation", navRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("welcome!");
});

// Default fallback(404) route
app.all("*", fallbackApi);

app.listen("3000", () => {
  logger.log(`Server on!`);
});

export default app;
