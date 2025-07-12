import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { z } from "zod";
import { BadRequestErrorOutputSchema } from "../openapi-shared-contracts";

export const TermCalculationInputSchema = z.object({
	principal: z.number().min(0, "Principal must be a non-negative number"),
	ratePerAnnum: z
		.number()
		.min(0, "Rate must be a non-negative number")
		.max(100),
	term: z
		.number()
		.min(3, "Term must be at least 1 month")
		.max(60, "Term must not exceed 60 months"),
});

export const TermCalculationOutputSchema = TermCalculationInputSchema.extend({
	interest: z.number().positive(),
	totalAmount: z.number().positive(),
	interestBreakdown: z.object({
		monthlyInterest: z.number().positive(),
		quarterlyInterest: z.number().positive(),
		endOfTermInterest: z.number().positive(),
	}),
});

export type TermCalculationInput = z.infer<typeof TermCalculationInputSchema>;
export type TermCalculationOutput = z.infer<typeof TermCalculationOutputSchema>;

export const RouteContract = describeRoute({
	tags: ["term-deposit"],
	summary: "Calculate term deposit",
	description: "Calculate the term deposit based on the provided parameters.",
	validateResponse: true,
	responses: {
		200: {
			description: "Successful calculation of term deposit",
			content: {
				"application/json": {
					schema: resolver(TermCalculationOutputSchema),
				},
			},
		},
		400: {
			description: "User input error. Bad Request.",
			content: {
				"application/json": {
					schema: resolver(BadRequestErrorOutputSchema),
				},
			},
		},
	},
});
