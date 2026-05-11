/**
 * Lighthouse CI configuration — `@lhci/cli` config consumed by:
 *   - `pnpm lhci` (local CLI, manual; requires Chrome to be installed)
 *   - `.github/workflows/lighthouse.yml` (GitHub Actions, ubuntu-latest)
 *
 * Locked per RESEARCH.md §1.10 + STACK.md §5.2:
 *   - 3-run-median per page (`numberOfRuns: 3`, `aggregationMethod: 'median'`)
 *   - Mobile form-factor (Moto G4-class throttling)
 *   - Hard thresholds asserted as `error`:
 *       perf ≥0.90, a11y ≥0.95, best-practices ≥0.95, SEO 1.00
 *   - `temporary-public-storage` upload (90-day LHCI server deferred to Phase 6 DEP-04)
 *
 * Phase 1 URL set: the 3 known-stable greenfield routes. Phase 2 expands to
 * /jerusalem, /en/jerusalem, /jerusalem/{sub-dest} etc. as content lands.
 *
 * NOTE on `startServerCommand`: the local `pnpm lhci` invocation boots `pnpm start`
 * automatically; in CI the workflow runs `pnpm start &` separately (background)
 * and points `lhci collect` at the already-running server via `url:`. This keeps
 * lifecycle simple on both sides — see `.github/workflows/lighthouse.yml`.
 */

module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/',                  // HE homepage (default locale, no prefix)
        'http://localhost:3000/en',                // EN homepage
        'http://localhost:3000/admin/components',  // Component playground (HE)
      ],
      numberOfRuns: 3,
      startServerCommand: 'pnpm start',
      startServerReadyPattern: 'Ready in',
      settings: {
        chromeFlags: '--no-sandbox',
        formFactor: 'mobile',
        screenEmulation: {
          mobile: true,
          width: 412,
          height: 823,
          deviceScaleFactor: 1.75,
          disabled: false,
        },
        // Moto G4-class throttling (canonical Lighthouse mobile preset).
        throttling: {
          rttMs: 150,
          throughputKbps: 1638.4,
          cpuSlowdownMultiplier: 4,
          requestLatencyMs: 562.5,
          downloadThroughputKbps: 1474.56,
          uploadThroughputKbps: 675,
        },
      },
    },
    assert: {
      assertions: {
        'categories:performance':    ['error', { minScore: 0.90, aggregationMethod: 'median' }],
        'categories:accessibility':  ['error', { minScore: 0.95, aggregationMethod: 'median' }],
        'categories:best-practices': ['error', { minScore: 0.95, aggregationMethod: 'median' }],
        'categories:seo':            ['error', { minScore: 1.00, aggregationMethod: 'median' }],
      },
    },
    upload: {
      // 90-day retention deferred to Phase 6 DEP-04 (Vercel-hosted LHCI server).
      target: 'temporary-public-storage',
    },
  },
};
