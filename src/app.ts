import { type Context, Hono } from "hono";
import { pinoLogger } from "hono-pino";
import type pino from "pino";

export const app = new Hono<{ Variables: { logger: pino.Logger } }>();
app.use(pinoLogger({ pino: { level: "debug" }, contextKey: "logger" }));

export type CalculatorApiType = typeof app;
export type CalculatorApiContext = Context<{
	Variables: { logger: pino.Logger };
}>;
