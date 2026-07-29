# ADR 0003: Use JWT over server-side sessions

## Status
Accepted

## Context
The admin dashboard needs to authenticate a single admin user and
protect write endpoints (`POST`/`PUT`/`DELETE`) on the API. The
frontend (Vercel) and backend (Render) are deployed on different
origins/hosts, which affects how session state can be shared.

## Decision
Use stateless JSON Web Tokens (JWT), issued on login and sent in the
`Authorization: Bearer <token>` header on every protected request,
verified by a middleware layer before the request reaches the
controller.

## Consequences

**Positive:**
- Stateless: the API doesn't need to store session data anywhere
  (no session store, no server memory or Redis dependency), which
  keeps the Render deployment simple.
- Works cleanly across the frontend/backend origin split. cookies
  and server-side sessions are more complex to configure correctly
  across separate hosts (Vercel + Render) due to cross-origin cookie
  restrictions.
- Simple to verify: the middleware layer just checks the token
  signature and expiry, with no database lookup required per request.

**Negative:**
- Tokens can't be revoked before they expire without additional
  infrastructure (e.g. a token blocklist), acceptable here given
  there's a single admin user and short token expiry is used to
  limit exposure.
- If the JWT secret were ever leaked, an attacker could forge valid
  tokens, mitigated by keeping `JWT_SECRET` only in Render's
  environment variables, never committed to the repository.

## Alternatives considered
- **Server-side sessions (cookie + session store):** more secure
  revocation story, but adds cross-origin cookie complexity between
  Vercel and Render, plus the operational overhead of a session
  store, for a single-admin-user application that doesn't need it.
- **OAuth via a third-party provider:** unnecessary complexity for a
  single hardcoded admin account with no other users.
