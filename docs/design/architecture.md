# Architecture Overview

![Architecture diagram](../diagrams/architecture.png)

## Summary

The portfolio is a full-stack application with three main parts:

- **React frontend** — the public-facing site recruiters view, plus a
  protected admin dashboard for editing content.
- **Express API (backend)** — a REST API built using clean
  architecture layers, exposing endpoints for projects, skills, and
  about-me content.
- **MongoDB** — document store for all portfolio content.

## System components

| Component | Responsibility |
|---|---|
| React frontend | Renders public site; provides admin UI for CRUD operations |
| Express API | Validates requests, enforces auth, applies business logic |
| MongoDB | Persists projects, skills, about-me content, and the admin user |
| Cloudinary | Stores and serves uploaded project images |

## Request flow (high level)

1. A recruiter's browser loads the React frontend (static build).
2. The frontend calls the Express API's public `GET` endpoints to
   fetch content — no authentication required.
3. When the site owner wants to edit content, they log into the admin
   dashboard, which authenticates against the API and receives a JWT.
4. Subsequent write requests (`POST` / `PUT` / `DELETE`) include the
   JWT and are rejected by the API if it's missing or invalid.

## Backend layering (clean architecture)

The Express API is organised into layers, each depending only on the
layer directly below it:

```
routes/        → defines URL paths, delegates to controllers
controllers/   → parses requests, calls services, formats responses
services/      → business logic and validation
repositories/  → the only layer that talks to Mongoose/MongoDB
models/        → Mongoose schemas
middleware/    → JWT auth, error handling, input validation
config/        → environment variables, DB connection setup
```

**Rule:** controllers never call Mongoose directly. This means the
database layer (currently MongoDB) can be swapped later without
touching business logic — only the `repositories/` layer would need
to change.

## Related documents

- [Database design](./database-design.md)
- [Deployment model](./deployment.md)
- [Sequence diagrams](./sequence-diagrams.md)
- [Architecture Decision Records](../adr/)