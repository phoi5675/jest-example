// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ENV from "@/constant/env";
import { dropModels, initModels } from "@/models/setupModel";
import { authRouter } from "@/router/auth/authRouter";
import { manageRouter } from "@/router/manage/manageRouter";
import { navRouter } from "@/router/navigation/navRouter";
import internalServerErrorHandler from "@/shared/handler/internalServerErrorHandler";
import notFoundHandler from "@/shared/handler/notFoundHandler";
import tokenValidator from "@/shared/middleware/tokenValidator";
import {
  BaseReq,
  BaseReqBody,
  BaseReqParams,
} from "@/shared/types/express/Request";
import {
  BaseErrorResBody,
  BaseRes,
  BaseResBody,
} from "@/shared/types/express/Response";

import logger from "@/shared/utils/logger";
import express from "express";

const app = express();

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Token validator for all routes
// Routes that don't require authentication are defined in tokenValidator
app.use(tokenValidator);
/**
 * Routes
 */
app.use("/auth", authRouter);
app.use("/navigation", navRouter);
app.use("/manage", manageRouter);

app.get(
  "/",
  (
    req: BaseReq<BaseReqParams, BaseResBody | BaseErrorResBody, BaseReqBody>,
    res: BaseRes<BaseResBody | BaseErrorResBody>
  ) => {
    res.send({ message: "welcome!" });
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
