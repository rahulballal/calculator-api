import { validator } from "hono-openapi/zod";
import { makeCalculatorApiApp } from "../app";
import { termDepiositCalculator } from "./calculation";
import { RouteContract, TermCalculationInputSchema } from "./openapi-contracts";

export const TermDepositRouter = makeCalculatorApiApp().post(
	"/term-deposit",
	RouteContract,
	validator("json", TermCalculationInputSchema),
	async (ctx) => {
		const postBody = ctx.req.valid("json");
		const output = termDepiositCalculator(postBody);
		return ctx.json(output);
	},
);
