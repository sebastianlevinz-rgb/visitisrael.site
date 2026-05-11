/**
 * Plan 11 Task 3 — Sanity tests for .lighthouserc.cjs.
 *
 * The actual 3-run-median is run by `pnpm lhci` (CI workflow); these tests
 * pin the config shape so a contributor cannot accidentally weaken thresholds
 * or drop the 3-run-median aggregation.
 */
import { describe, it, expect } from 'vitest';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);

describe('.lighthouserc.cjs', () => {
  // require() resolves the CJS module relative to this test file's CWD.
  // We rely on `process.cwd()` being the repo root (Vitest convention).
  const config = require(resolve(process.cwd(), '.lighthouserc.cjs')) as {
    ci: {
      collect: {
        url: string[];
        numberOfRuns: number;
        startServerCommand: string;
        startServerReadyPattern: string;
        settings: {
          formFactor: string;
          throttling: { rttMs: number; throughputKbps: number };
        };
      };
      assert: {
        assertions: Record<
          string,
          [string, { minScore: number; aggregationMethod: string }]
        >;
      };
      upload: { target: string };
    };
  };

  it('parses without error and exposes ci.collect/assert/upload', () => {
    expect(config.ci).toBeDefined();
    expect(config.ci.collect).toBeDefined();
    expect(config.ci.assert).toBeDefined();
    expect(config.ci.upload).toBeDefined();
  });

  it('uses 3 runs with median aggregation (AUD-03 lock)', () => {
    expect(config.ci.collect.numberOfRuns).toBe(3);
    for (const [, [severity, opts]] of Object.entries(
      config.ci.assert.assertions,
    )) {
      expect(severity).toBe('error'); // hard gate, not warn
      expect(opts.aggregationMethod).toBe('median');
    }
  });

  it('asserts mobile thresholds: perf>=0.90, a11y>=0.95, bp>=0.95, seo=1.00', () => {
    const a = config.ci.assert.assertions;
    expect(a['categories:performance']?.[1].minScore).toBe(0.9);
    expect(a['categories:accessibility']?.[1].minScore).toBe(0.95);
    expect(a['categories:best-practices']?.[1].minScore).toBe(0.95);
    expect(a['categories:seo']?.[1].minScore).toBe(1.0);
  });

  it('targets mobile form-factor with Moto G4-class throttling', () => {
    expect(config.ci.collect.settings.formFactor).toBe('mobile');
    // Canonical Moto G4 throttling: 150ms RTT, ~1.6 Mbps down.
    expect(config.ci.collect.settings.throttling.rttMs).toBe(150);
    expect(config.ci.collect.settings.throttling.throughputKbps).toBe(1638.4);
  });

  it('boots Next.js via pnpm start with "Ready in" pattern', () => {
    expect(config.ci.collect.startServerCommand).toBe('pnpm start');
    expect(config.ci.collect.startServerReadyPattern).toBe('Ready in');
  });

  it('audits 3 stable Phase-1 URLs (HE root, EN root, /admin/components)', () => {
    expect(config.ci.collect.url).toHaveLength(3);
    expect(config.ci.collect.url).toContain('http://localhost:3000/');
    expect(config.ci.collect.url).toContain('http://localhost:3000/en');
    expect(config.ci.collect.url).toContain('http://localhost:3000/admin/components');
  });

  it('uploads to temporary-public-storage (Phase 1 default)', () => {
    expect(config.ci.upload.target).toBe('temporary-public-storage');
  });
});
