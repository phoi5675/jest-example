// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ENV from "@/constant/env";
import ROUTE from "@/constant/route";
import { dropModels, initModels } from "@/models/setupModel";
import authRouter from "@/router/auth/authRouter";
import manageRouter from "@/router/manage/manageRouter";
import navRouter from "@/router/navigation/navRouter";
import internalServerErrorHandler from "@/shared/handler/internalServerErrorHandler";
import notFoundHandler from "@/shared/handler/notFoundHandler";
import tokenValidator from "@/shared/middleware/tokenValidator";
import logger from "@/shared/utils/logger";
import express from "express";
import {
  CommonErrorResponseBody,
  CommonRequest,
  CommonRequestBody,
  CommonResponse,
  CommonResponseBody,
} from "./shared/types/expressCore";

// [ ] 로그인 되었는지 필요한 항목에 대해, 로그인 되었는지 확인하는 공통 미들웨어 생성 및 적용
// [ ] 로그인 확인 미들웨어 완성 이후, validator에 불필요한 로그인 확인 로직 삭제
const app = express();

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Token validator for all routes
// Routes that don't require authentication are defined in tokenValidator
app.all("*", tokenValidator);
/**
 * Routes
 */
app.use(ROUTE.auth.url, authRouter);
app.use(ROUTE.navigation.url, navRouter);
app.use(ROUTE.manage.url, manageRouter);

app.get(
  ROUTE.url,
  (
    req: CommonRequest<CommonRequestBody>,
    res: CommonResponse<CommonResponseBody | CommonErrorResponseBody>
  ) => {
    res.send({ message: `Hello, world!` });
  }
);

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
