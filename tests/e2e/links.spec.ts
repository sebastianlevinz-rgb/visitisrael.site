import { test, expect } from '@playwright/test';
import { execFileSync } from 'node:child_process';

// Runs the standalone broken-link/orphan checker against the built dist/ (the
// e2e gate runs `pnpm build` first). Fails the suite on any broken internal link.
test('no broken internal links in the built site', () => {
  let out = '';
  try {
    out = execFileSync('node', ['scripts/qa/check-links.mjs'], { encoding: 'utf8' });
  } catch (e: any) {
    throw new Error('check-links failed:\n' + (e.stdout || '') + (e.stderr || ''));
  }
  expect(out).toContain('0 broken link(s)');
});
