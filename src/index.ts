import { swaggerUI } from "@hono/swagger-ui";
import { app } from "./app";
import { configureOpenAPI } from "./openapi";
import { TermDepositRouter } from "./term-deposit";

app
	.get("/health", (c) => {
		return c.json({ status: "Up" }, 200);
	})
  .route("/calculators", TermDepositRouter)
	.get("/openapi", configureOpenAPI(app))
	.get("/swaggerui", swaggerUI({ url: "/openapi" }));

export default app;
