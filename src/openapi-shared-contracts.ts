import z from "zod";

export const BadRequestErrorOutputSchema = z.object({
	name: z.string(),
	message: z.string(),
	issues: z.array(
		z.object({
			code: z.string(),
			expected: z.string().optional(),
			received: z.string().optional(),
			path: z.array(z.union([z.string(), z.number()])),
			message: z.string(),
		}),
	),
});

export type BadRequestErrorOutput = z.infer<typeof BadRequestErrorOutputSchema>;
