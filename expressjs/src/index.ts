// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import fallbackApi from "@/fallbackApi";
import { dropModels, initModels } from "@/models/setupModel";
import authRouter from "@/router/auth/authRouter";
import navRouter from "@/router/navigation/navRouter";
import logger from "@/shared/utils/logger";
import express, { Request, Response } from "express";
import ENV from "./constant/env";

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

const server = app.listen(ENV.SERVER_PORT, async () => {
  await initModels();
  logger.log(`Server on!`);
});

process.on("SIGINT", async () => {
  logger.debug("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    logger.debug("HTTP server closed");
  });

  await dropModels();
});

export default app;
