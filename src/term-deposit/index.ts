/** biome-ignore-all lint/suspicious/noExplicitAny: zods type are a bit odd */
import { validator } from "hono-openapi/zod";
import { makeCalculatorApiApp } from "../app";
import type { BadRequestErrorOutput } from "../openapi-shared-contracts";
import { termDepiositCalculator } from "./calculation";
import { RouteContract, TermCalculationInputSchema } from "./openapi-contracts";

export const TermDepositRouter = makeCalculatorApiApp().post(
	"/term-deposit",
	RouteContract,
	validator("json", TermCalculationInputSchema, (result, zCtx) => {
		if (!result.success) {
			const err = result.error;
			const badReq: BadRequestErrorOutput = {
				name: "Error",
				message: "Validation failed",
				issues: err.issues.map((issue) => ({
					code: issue.code,
					expected:
						typeof (issue as any).expected === "string"
							? (issue as any).expected
							: undefined,
					received:
						typeof (issue as any).received === "string"
							? (issue as any).received
							: undefined,
					path: issue.path.filter(
						(p): p is string | number =>
							typeof p === "string" || typeof p === "number",
					),
					message: issue.message,
				})),
			};
			return zCtx.json(badReq, 400);
		}
	}),
	async (ctx) => {
		const postBody = ctx.req.valid("json");
		const output = termDepiositCalculator(postBody);
		return ctx.json(output);
	},
);
