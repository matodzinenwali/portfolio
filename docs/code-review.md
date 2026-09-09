# Code review

Reviewed the React/Vite frontend and Express/Mongoose API on 2026-09-09.
The layers and reusable resource components make the project easy to navigate.
The frontend production build passed before changes, but ESLint found seven errors.

## High priority: remaining work

- **Dependency advisories remain:** after removing unused packages, npm audit reports 4 backend advisories (1 moderate, 3 high) and 7 frontend advisories (2 moderate, 5 high), with no critical advisories. Backend packages: brace-expansion, fast-uri, js-yaml and qs. Frontend packages: baseline-browser-mapping, brace-expansion, browserslist, nanoid, postcss, react-router and react-router-dom. npm reports fixes available; update these dependencies with lockfile review and rerun the checks before production. These are dependency audit results, not proof that each issue is reachable through this application.
- **Dashboard deletion fails:** `frontend/src/components/ResourceManager.jsx` calls DELETE for projects, skills and achievements, but their backend routers only implement read/create. Implement authenticated delete endpoints through controllers, services and repositories, with 404 handling and tests. Skill deletion should also address project references. The generic API helper exposes update too, but there are no corresponding update routes or resource editing forms.
- **Login needs abuse protection:** `backend/src/routes/authRoutes.js` has no rate limit. Add per-client/account throttling using a deployment-appropriate store before exposing the admin login broadly. Validate that email/password are nonempty strings before querying MongoDB; an object email currently reaches the query unchanged. Return the same credential error for nonexistent accounts and incorrect passwords.
- **Validate and whitelist write payloads:** services mostly check presence and forward request bodies to Mongoose. Enforce lengths, URL schemes, ObjectId/date validity and permitted fields at the API boundary; cover malformed requests with API tests. About updates currently forward the whole body to `findOneAndUpdate`, including update operators.

## Medium priority: remaining work

- **Expired sessions:** AuthContext treats any nonempty token as authenticated. After two hours, writes fail while the dashboard stays open. Handle 401 responses centrally by clearing both in-memory auth stores and redirecting to login.
- **Test real database behavior:** the added regression tests stub model operations. Add isolated database integration coverage for create/read/update/delete, validation, authentication and populated skill references; never point tests at production.
- **Accessibility and assets:** the terminal introduction uses `role="img"`, which hides its child text behind a generic accessible name. Make the introduction available as text. `frontend/index.html` references a missing `/og-image.png`; add an actual social image and an absolute deployed URL.
- **Development dependency placement:** move nodemon from backend dependencies to devDependencies when refining production installs.
- **Small UI resilience improvements:** reset image failure state when an image URL changes, add a not-found route, and provide a way to associate skills with projects from the dashboard.
- **Documentation accuracy:** Cloudinary upload support is described but not implemented; the current forms accept image URLs. Keep deployment docs aligned with shipped behavior.

## Fixed in this setup

- Removed unused backend `docker` and frontend `install`/`npm` dependencies and updated both lockfiles. This reduced backend audit findings from 31 (including 5 critical) to 4, and frontend findings from 11 to 7.
- Skill creation now accepts POST, matching the frontend; single-skill lookup calls the existing repository function.
- About service errors use the correct `statusCode` property.
- Credential links use the backend's existing `credentialURL` field, preserving existing stored data.
- API validation/cast errors return 400, duplicate keys return 409, and unexpected server errors do not expose their message to clients.
- About editing treats only 404 as empty data, so connection/server failures remain visible.
- Fetch retries invalidate stale responses and clear previous errors.
- Frontend lint issues were resolved without disabling lint rules; failed deletion requests show an error.
- CI, SPA routing, production startup, a database readiness endpoint and environment examples are included.

## Deployment boundary

Validation: frontend ESLint and production build pass; all 10 backend HTTP
regression tests pass. The workflow/Render YAML and Vercel JSON parse correctly.
Clean installs were checked, and all application checks were rerun after removing
unused dependencies. Browser interaction and a real MongoDB integration were not
tested. CI has not yet run on GitHub.

Configuration files are local until committed and pushed. No hosted API or frontend
has been created or verified in this session. See `docs/deployment-setup.md` for the
account setup, environment variables and smoke checks.
