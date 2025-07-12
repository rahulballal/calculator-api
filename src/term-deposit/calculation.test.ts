import { expect, test } from "bun:test";
import { termDepiositCalculator } from "./calculation";
import type {
	TermCalculationInput,
	TermCalculationOutput,
} from "./openapi-contracts";

type Fixture = {
	name: string;
	input: TermCalculationInput;
	expected: TermCalculationOutput;
};
const fixtures: Fixture[] = [
	{
		name: "Example case from exercise spec",
		input: {
			principal: 10000,
			ratePerAnnum: 1.1, // 1.10% annual rate
			term: 36,
		},
		expected: {
			principal: 10000,
			ratePerAnnum: 1.1,
			term: 36,
			interest: 330,
			totalAmount: 10330,
			interestBreakdown: {
				monthlyInterest: 9.17, // 10000 * (1.10/100/12) ≈ 9.17
				quarterlyInterest: 27.5, // monthly * 3
				endOfTermInterest: 330,
			},
		},
	},
	{
		name: "Standard calculation - 12 months",
		input: {
			principal: 10000,
			ratePerAnnum: 5, // 5% annual rate
			term: 12,
		},
		expected: {
			principal: 10000,
			ratePerAnnum: 5,
			term: 12,
			interest: 500, // 10000 * (5/100/12) * 12 = 500
			totalAmount: 10500,
			interestBreakdown: {
				monthlyInterest: 41.67, // 10000 * (5/100/12) ≈ 41.67
				quarterlyInterest: 125, // monthly * 3
				endOfTermInterest: 500,
			},
		},
	},
	{
		name: "6 months term",
		input: {
			principal: 5000,
			ratePerAnnum: 6, // 6% annual rate
			term: 6,
		},
		expected: {
			principal: 5000,
			ratePerAnnum: 6,
			term: 6,
			interest: 150, // 5000 * (6/100/12) * 6 = 150
			totalAmount: 5150,
			interestBreakdown: {
				monthlyInterest: 25, // 5000 * (6/100/12) = 25
				quarterlyInterest: 75, // monthly * 3
				endOfTermInterest: 150,
			},
		},
	},
	{
		name: "High interest rate calculation",
		input: {
			principal: 20000,
			ratePerAnnum: 12, // 12% annual rate
			term: 24,
		},
		expected: {
			principal: 20000,
			ratePerAnnum: 12,
			term: 24,
			interest: 4800, // 20000 * (12/100/12) * 24 = 4800
			totalAmount: 24800,
			interestBreakdown: {
				monthlyInterest: 200, // 20000 * (12/100/12) = 200
				quarterlyInterest: 600, // monthly * 3
				endOfTermInterest: 4800,
			},
		},
	},
	{
		name: "Small principal amount",
		input: {
			principal: 100,
			ratePerAnnum: 3, // 3% annual rate
			term: 3,
		},
		expected: {
			principal: 100,
			ratePerAnnum: 3,
			term: 3,
			interest: 0.75, // 100 * (3/100/12) * 3 = 0.75
			totalAmount: 100.75,
			interestBreakdown: {
				monthlyInterest: 0.25, // 100 * (3/100/12) = 0.25
				quarterlyInterest: 0.75, // monthly * 3
				endOfTermInterest: 0.75,
			},
		},
	},
	{
		name: "Zero interest rate",
		input: {
			principal: 1000,
			ratePerAnnum: 0,
			term: 12,
		},
		expected: {
			principal: 1000,
			ratePerAnnum: 0,
			term: 12,
			interest: 0,
			totalAmount: 1000,
			interestBreakdown: {
				monthlyInterest: 0,
				quarterlyInterest: 0,
				endOfTermInterest: 0,
			},
		},
	},
	{
		name: "Single month term",
		input: {
			principal: 15000,
			ratePerAnnum: 4, // 4% annual rate
			term: 1,
		},
		expected: {
			principal: 15000,
			ratePerAnnum: 4,
			term: 1,
			interest: 50, // 15000 * (4/100/12) * 1 = 50
			totalAmount: 15050,
			interestBreakdown: {
				monthlyInterest: 50, // 15000 * (4/100/12) = 50
				quarterlyInterest: 150, // monthly * 3
				endOfTermInterest: 50,
			},
		},
	},
	{
		name: "Fractional interest calculation",
		input: {
			principal: 7500,
			ratePerAnnum: 7.5, // 7.5% annual rate
			term: 8,
		},
		expected: {
			principal: 7500,
			ratePerAnnum: 7.5,
			term: 8,
			interest: 375, // 7500 * (7.5/100/12) * 8 = 375
			totalAmount: 7875,
			interestBreakdown: {
				monthlyInterest: 46.875, // 7500 * (7.5/100/12) = 46.875
				quarterlyInterest: 140.625, // monthly * 3
				endOfTermInterest: 375,
			},
		},
	},
];

fixtures.forEach(({ name, input, expected }) => {
	test(name, () => {
		const actual = termDepiositCalculator(input);
		// Test each property individually for better error messages
		expect(actual.principal).toBe(expected.principal);
		expect(actual.ratePerAnnum).toBe(expected.ratePerAnnum);
		expect(actual.term).toBe(expected.term);
		expect(actual.interest).toBeCloseTo(expected.interest, 2);
		expect(actual.totalAmount).toBeCloseTo(expected.totalAmount, 2);

		// Test interest breakdown
		expect(actual.interestBreakdown.monthlyInterest).toBeCloseTo(
			expected.interestBreakdown.monthlyInterest,
			2,
		);
		expect(actual.interestBreakdown.quarterlyInterest).toBeCloseTo(
			expected.interestBreakdown.quarterlyInterest,
			2,
		);
		expect(actual.interestBreakdown.endOfTermInterest).toBeCloseTo(
			expected.interestBreakdown.endOfTermInterest,
			2,
		);
	});
});
