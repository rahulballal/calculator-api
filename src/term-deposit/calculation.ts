import type {
	TermCalculationInput,
	TermCalculationOutput,
} from "./openapi-contracts";

export const termDepiositCalculator = ({
	principal,
	ratePerAnnum,
	term,
}: TermCalculationInput): TermCalculationOutput => {
	// Convert annual rate to decimal
	const annualRateDecimal = ratePerAnnum / 100;

	// Calculate total interest for the entire term
	const interest = principal * (annualRateDecimal / 12) * term;
	const totalAmount = principal + interest;

	// Calculate interest breakdown
	const monthlyInterestRate = annualRateDecimal / 12;
	const monthlyInterest = principal * monthlyInterestRate;
	const quarterlyInterest = monthlyInterest * 3;
	const endOfTermInterest = interest; // Total interest paid at the end

	return {
		principal,
		ratePerAnnum,
		term,
		interest,
		totalAmount,
		interestBreakdown: {
			monthlyInterest,
			quarterlyInterest,
			endOfTermInterest,
		},
	};
};
