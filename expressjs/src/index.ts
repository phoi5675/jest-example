// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { dropModels, initModels } from "@/models/setupModel";
import authRouter from "@/router/auth/authRouter";
import navRouter from "@/router/navigation/navRouter";
import internalServerErrorHandler from "@/shared/handler/internalServerErrorHandler";
import notFoundHandler from "@/shared/handler/notFoundHandler";
import logger from "@/shared/utils/logger";
import express, { Request, Response } from "express";
import ENV from "./constant/env";

// TODO: 로그인 되었는지 필요한 항목에 대해, 로그인 되었는지 확인하는 공통 미들웨어 생성 및 적용
// TODO: 로그인 확인 미들웨어 완성 이후, validator에 불필요한 로그인 확인 로직 삭제
// TODO: knex에서 where 이용할 때, 타입 체크 가능하도록 타입 추가
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
app.use(notFoundHandler);

// Default error handling middleware(500)
app.use(internalServerErrorHandler);

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
