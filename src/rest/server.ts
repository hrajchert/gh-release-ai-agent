import {
  HttpMiddleware,
  HttpServer,
  HttpApiBuilder,
  HttpApiSwagger,
} from "@effect/platform";
import { NodeHttpServer, NodeRuntime } from "@effect/platform-node";
import { Layer } from "effect";
import { createServer } from "node:http";
import { ApiLive } from "./handler.js";
import * as dotenv from "dotenv";
import { CompletionsLive } from "../agent/assistant-via-completions.js";
import { Registry } from "@effect/ai/AiToolkit";

dotenv.config();

// Register our API with the HTTP server
const HttpLive = HttpApiBuilder.serve(HttpMiddleware.logger).pipe(
  // Add swagger documentation
  Layer.provide(HttpApiSwagger.layer({ path: "/docs" })),
  // Add CORS middleware
  Layer.provide(HttpApiBuilder.middlewareCors()),
  // Provide the API implementation
  Layer.provide(ApiLive),
  // Log the address the server is listening on
  HttpServer.withLogAddress,
  // Provide the HTTP server implementation
  Layer.provide(NodeHttpServer.layer(createServer, { port: 3000 })),
  Layer.provide(Registry.Live),
  Layer.provide(CompletionsLive)
);

// run the server
Layer.launch(HttpLive).pipe(NodeRuntime.runMain);
