# Portfolio

## Review, CI and deployment

- [Code review and remaining improvements](docs/code-review.md)
- [Deploy the frontend to Vercel and API to Render](docs/deployment-setup.md)
- GitHub Actions checks frontend lint/build and backend regression tests on pull requests and pushes to `master` or `main`.
- Use Node 24 (`.nvmrc`). Validate locally with `npm --prefix frontend run lint`, `npm --prefix frontend run build`, and `npm --prefix backend test`.


Full-stack dynamic portfolio with a React frontend, Express/MongoDB backend, and an admin dashboard for editing content without touching code.

## Structure
- /frontend — React (Vite)
- /backend — Express REST API, clean architecture (routes → controllers → services → repositories)

## Local setup
1. `cd backend && npm install && cp .env.example .env`
2. `cd frontend && npm install`
3. Run backend: `cd backend && npm run dev`
4. Run frontend: `cd frontend && npm run dev`
