# Security Policy

## Reporting a vulnerability

If you discover a security vulnerability in Visit Israel, please report it privately.

**Preferred:** email **security@visitisrael.site** with:

- A description of the issue
- Steps to reproduce (or a proof-of-concept)
- The affected URL or component (if applicable)
- Your contact information (we'll acknowledge within 2 business days)

**Do not** open a public GitHub issue or pull request for security vulnerabilities. Disclose responsibly so we can fix the issue before it's exploited.

## Scope

In scope:

- `visitisrael.site` and any subdomains
- The published Next.js application code (this repository)
- Build/deployment pipeline misconfiguration affecting production

Out of scope:

- Third-party affiliate partner sites (Booking.com, Civitatis, Viator, etc.) — report directly to the partner
- Issues already disclosed in `data/post-launch-backlog.md`
- Social-engineering attacks against contributors
- Denial-of-service or rate-limiting tests against production
- Reports based on stale dependency CVE listings without a working exploit path

## Acknowledgement timeline

| Action                                             | Timeline           |
| -------------------------------------------------- | ------------------ |
| Initial acknowledgement                            | 2 business days    |
| Severity triage                                    | 5 business days    |
| Fix for critical (RCE, data exposure, auth bypass) | 7 days target      |
| Fix for high (XSS, CSRF, schema injection)         | 30 days target     |
| Fix for medium/low                                 | next minor release |

We'll credit reporters in `data/security-acknowledgements.md` (created at first valid report) unless you prefer to remain anonymous.

## What this site collects

Per `content/en/legal/privacy.mdx`:

- Privacy-friendly analytics via Plausible (no cookies, no individual session tracking)
- No user accounts, no saved trips, no personalized data
- Outbound affiliate clicks emit standard partner tracking parameters; we do not see your booking details

## Cryptographic surface

- All traffic served over HTTPS with HSTS preload (`max-age=63072000; includeSubDomains; preload`)
- `/admin/*` routes gated by HTTP basic auth (production env: `ADMIN_USER` + `ADMIN_PASS`)
- IndexNow ping uses a public key file (`/<INDEXNOW_KEY>.txt` per protocol — not a secret by design)
- Vercel Cron Jobs gated by `CRON_SECRET` bearer token on `/api/cron/affiliate-health`

## Dependency hygiene

- `dependabot.yml` opens weekly PRs for npm + GitHub Actions
- `pnpm audit` runs as part of CI (`.github/workflows/`)
- Lockfile (`pnpm-lock.yaml`) committed for reproducibility
