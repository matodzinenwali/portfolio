# ADR 0001: Use clean architecture layers in the backend

## Status
Accepted

## Context
The backend needs to handle HTTP requests, apply business rules, and
persist data to MongoDB. A common shortcut for a small project like
this is to put database calls directly in route handlers. That's
faster to write initially but makes the code harder to test, harder
to reason about, and locks business logic to a specific database
library.

## Decision
Structure the backend into four layers, each depending only on the
layer directly below it:

```
routes → controllers → services → repositories → (Mongoose/MongoDB)
```

- **Routes** define URL paths and HTTP methods only.
- **Controllers** parse requests and format responses, no business
  logic, no direct database calls.
- **Services** contain business logic and validation rules.
- **Repositories** are the only layer permitted to call Mongoose.

## Consequences

**Positive:**
- Business logic (services) can be unit tested without a real
  database connection, by mocking the repository layer.
- The database library could be swapped later (e.g. MongoDB to
  PostgreSQL) by rewriting only the repository layer.
- Each file has a single, clear responsibility, which makes the
  codebase easier to navigate and reason about, useful both for
  future maintenance and for explaining design decisions in an
  interview setting.

**Negative:**
- More files and more boilerplate per feature than a "everything in
  the route handler" approach.
- Overkill for the smallest possible version of this project, but
  intentional here, since demonstrating the pattern correctly is
  itself part of the goal.

## Alternatives considered
- **MVC only (routes → controllers → models):** simpler, but
  controllers end up calling Mongoose directly, mixing HTTP concerns
  with business logic and making unit testing harder.
- **Single-file route handlers:** fastest to write, rejected because
  it doesn't demonstrate separation of concerns.
