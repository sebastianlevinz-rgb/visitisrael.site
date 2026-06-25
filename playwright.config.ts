import { defineConfig, devices } from '@playwright/test';
import fs from 'fs';

// Cloud env: Playwright 1.61 expects chromium_headless_shell-1228 but the pre-installed
// binary is headless_shell-1194. Resolve to whichever headless shell exists on the host.
function resolveCloudChromium(): string | undefined {
  const candidates = [
    '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
    '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    '/opt/pw-browsers/chromium',
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return undefined;
}

const cloudBinary = resolveCloudChromium();

/**
 * E2E tests run against the built static site via `astro preview`.
 * Run `pnpm build` first (or rely on the webServer building isn't automatic —
 * keep build in CI as a separate step). Locally, an already-running preview is reused.
 */
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  expect: { timeout: 7_000 },
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
    contextOptions: { reducedMotion: 'reduce' },
  },
  webServer: {
    command: 'pnpm preview',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Use the pre-installed binary when available; fall back to Playwright's default.
        ...(cloudBinary ? { launchOptions: { executablePath: cloudBinary } } : {}),
      },
    },
  ],
});
