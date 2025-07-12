# Calculator API

A TypeScript-based REST API for calculating term deposit interest using [Hono](https://hono.dev/) and [Bun](https://bun.sh/).

## Technologies

- Bun - JavaScript runtime and package manager
- Hono - Fast, lightweight web framework
- Zod - TypeScript-first schema validation
- OpenAPI/Swagger - API documentation and contracts

## Development

1. Install dependencies:
   ```bash
   bun install
   ```

2. Run the development server:
   ```bash
   bun run dev
   ```
   Then open http://localhost:3000

3. Run tests:
   ```bash
   bun test
   ```



## Features

- Calculate term deposit interest rates and breakdowns
- Input validation using Zod
- OpenAPI/Swagger documentation
- End-to-end tests

## Calculation Formula

The term deposit calculator uses the following formula:

```
Interest = Principal x ((Rate / 100) / 12 ) x Term
```

For example, with:
- Principal: $10,000
- Rate: 1.10% per annum
- Term: 36 months

The calculation would be:
```
Monthly Interest = $10,000 × ((1.10 / 100) / 12)
                = $10,000 × 0.000917
                ≈ $9.17

Quarterly Interest = $9.17 × 3 ≈ $27.50

End of Term Interest = $9.17 × 36 = $330.00

Total Amount = $10,000 + $330.00 = $10,330.00
```

## API Endpoints

### POST /calculators/term-deposit

Calculates term deposit interest and provides detailed breakdowns.

**Example Usage:**

1. Successful calculation (200 OK):
```bash
curl -X POST http://localhost:3000/calculators/term-deposit \
  -H "Content-Type: application/json" \
  -d '{
    "principal": 10000,
    "ratePerAnnum": 1.1,
    "term": 36
  }'
```

2. Invalid input (400 Bad Request):
```bash
curl -X POST http://localhost:3000/calculators/term-deposit \
  -H "Content-Type: application/json" \
  -d '{
    "principal": -10000,
    "ratePerAnnum": 1.1,
    "term": 36
  }'
```
[Success/Error Output Contracts](./src/term-deposit/openapi-contracts.ts)
[Generic Bad Request Error Contract](./src/openapi-shared-contracts.ts)