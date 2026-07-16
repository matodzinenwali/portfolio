# Portfolio

Full-stack dynamic portfolio with a React frontend, Express/MongoDB backend, and an admin dashboard for editing content without touching code.

## Structure
- /frontend — React (Vite)
- /backend — Express REST API, clean architecture (routes → controllers → services → repositories)

## Local setup
1. `cd backend && npm install && cp .env.example .env`
2. `cd frontend && npm install`
3. Run backend: `cd backend && npm run dev`
4. Run frontend: `cd frontend && npm run dev`