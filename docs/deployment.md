## Railway Deployment Guide

This project ships with a GitHub Actions workflow (`.github/workflows/deploy-railway.yml`) that builds the Vite front-end and deploys it to Railway.

### Prerequisites

1. Create a Railway project and service for the app.
2. Generate a Railway API token (`railway tokens create` in the Railway CLI or through the dashboard).
3. Capture your Railway project ID and service ID (`railway status` lists both when linked locally).

### Required GitHub Secrets

| Secret | Description |
| --- | --- |
| `RAILWAY_TOKEN` | Personal or project scoped Railway token with deploy permissions. |
| `RAILWAY_PROJECT_ID` | The target Railway project ID (UUID). |
| `RAILWAY_SERVICE_ID` | The Railway service ID that should receive the build. |

### Workflow Behaviour

- Triggered automatically on pushes to `main` and on manual dispatch.
- Installs dependencies with Bun and runs `bun run build`.
- Calls the Railway GitHub Action, which runs `railway up --service <SERVICE_ID> --ci`, deploying the freshly built project.

### Local Railway CLI Setup (optional)

For local deployments:

```bash
bun install
bun run build
npx @railway/cli up --service <SERVICE_ID>
```

Ensure the CLI is linked with `railway link` before running the commands above.
