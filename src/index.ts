import { Effect, Console, Config } from "effect";
import * as dotenv from "dotenv";
import { getConfig } from "./config.js";
dotenv.config();

const program = Effect.gen(function* () {
  const config = yield* getConfig;
  yield* Console.log("Hello, World!", config);
});

Effect.runSync(program);
