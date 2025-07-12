import { openAPISpecs } from "hono-openapi";
import type { CalculatorApiType } from "./app";

export const configureOpenAPI = (app: CalculatorApiType) =>
	openAPISpecs(app, {
		documentation: {
			info: {
				title: "Calculator API",
				version: "1.0.0",
				description: "This is the API documentation a financial calculations.",
			},
			servers: [{ url: "http://localhost:3000", description: "Local Server" }],
		},
	});
