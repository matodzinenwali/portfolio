# Deployment setup

This repository uses a Vite/React frontend on Vercel, an Express API on Render,
and MongoDB Atlas. The current branch is `master`. Cloudinary uploads are not
implemented; the dashboard accepts existing image URLs.

## 1. Commit and enable CI

Review the local diff, commit the changes and push to
`https://github.com/matodzinenwali/portfolio`. The workflow
`.github/workflows/ci.yml` runs on pull requests, pushes to `master`/`main`,
and manual dispatch. It installs from each lockfile using `npm ci`,
runs frontend lint/build, and runs backend regression tests.

In GitHub's Actions tab, verify both jobs pass. Where available, configure a
branch ruleset requiring **Frontend lint and build** and **Backend regression
tests** before merging. Node 24 is selected in `.nvmrc`; use the same major
version locally and on the hosts. The tests use model stubs, not a live database.
The CI API URL is a build-only example; it is not a deployed API.

## 2. Prepare MongoDB Atlas

Create or choose an Atlas cluster and a database named `portfolio`. Create a
database user with read/write access to that database. Copy the driver connection
string, set the database name, and URL-encode special characters in credentials.
Add the Render service's outbound IP ranges to Atlas Network Access once Render
shows them. Permit your own IP temporarily if creating the admin from your laptop.

Keep this URI private. Store it as `MONGODB_URI` on Render, never in Vercel's
frontend variables or Git. Use separate databases for development and production.

## 3. Deploy the API on Render

In Render, create a Blueprint from this repository using the root `render.yaml`.
It specifies:

| Setting | Value |
| --- | --- |
| Root directory | `backend` |
| Branch | `master` |
| Runtime | Node 24.14.1 |
| Build command | `npm ci` |
| Start command | `npm start` |
| Health check | `/api/health` |
| Automatic deploy | After CI checks pass |

The Blueprint selects a free service; confirm availability in your account.
Provide `MONGODB_URI` and `CORS_ORIGINS` when prompted. Render generates
`JWT_SECRET`; `NODE_ENV` is set to `production`.
For the first deploy, CORS can be `http://localhost:5173`; replace it with the
actual Vercel origin after the frontend is created.

Copy the resulting public API URL. `https://<service>.onrender.com/api/health`
must return HTTP 200 and `{"status":"ok"}`. It returns 503 if MongoDB is
disconnected. Investigate database credentials/network access if startup fails.

## 4. Create the production admin

Use the existing `backend/.env` locally, temporarily pointing `MONGODB_URI` at
the production database and setting `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
From `backend`, run `npm run create-admin` once. Restore your local development
configuration afterward. Do not commit the file or share its contents.
The admin script creates a new user; rerunning with the same email will fail on
the unique index. Admin email/password are only needed by that one-time script.

## 5. Deploy the frontend on Vercel

In Vercel, choose **Add New → Project**, connect GitHub and import
`matodzinenwali/portfolio`.

| Setting | Value |
| --- | --- |
| Root directory | `frontend` |
| Framework preset | Vite |
| Node.js version | 24.x |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Production branch | `master` |
| `VITE_API_BASE_URL` | `https://<your-api-service>.onrender.com/api` |

Set the API URL for Production and any Preview environments you intend to use.
The `/api` suffix matters. Vite embeds this public value during the build;
changing it requires a new deployment. Never put MongoDB/JWT/admin credentials
in `VITE_` variables. If this setting is omitted, the current frontend falls
back to localhost, which will not work for visitors.

The committed `frontend/vercel.json` provides SPA routing so direct visits and
refreshes at `/projects`, `/about` and `/admin/login` load correctly.

After deployment, set Render's `CORS_ORIGINS` to the exact Vercel origin,
for example `https://your-project.vercel.app`, without a trailing slash or
`/api`. Comma-separate additional trusted origins, including localhost if needed.
Preview URLs are different origins; add the exact preview origin when testing
authenticated preview functionality. CORS is a browser policy, not authentication.

## 6. Verify the deployed application

1. Check `/api/health`, `/api/projects`, `/api/skills` and
   `/api/achievements` on the API.
2. Open and refresh each frontend route directly.
3. Sign in, create a skill/project/achievement, and save About content.
4. Check the credential link and reload public pages to confirm saved data.
5. Confirm unauthenticated writes receive 401.
6. Review Render logs and browser network errors if requests fail.

Resource deletion and editing (except About) are unfinished; see
[the code review](code-review.md) before treating the admin dashboard as complete.
The review also records remaining dependency advisories and login/input-validation
work to address before production.

## How deployments relate to CI

Vercel's GitHub integration creates frontend previews and production deployments;
no Vercel token is required in GitHub Actions for this setup. Vercel builds can
run independently of CI, so require passing CI before merging into `master`.
Render's Blueprint waits for CI checks on subsequent automatic deployments.
Do not also add a CLI deployment workflow unless you deliberately switch away
from the native integration.

No account connections or live deployments are created by these files.

## References

- [GitHub Node.js CI](https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs)
- [Vercel Git integration](https://vercel.com/docs/git)
- [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite)
- [Render Blueprint specification](https://render.com/docs/blueprint-spec)
- [MongoDB Atlas connection setup](https://www.mongodb.com/docs/atlas/connect-to-cluster/)
