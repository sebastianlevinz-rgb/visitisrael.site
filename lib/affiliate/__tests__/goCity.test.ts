/**
 * goCityLink STUB — 4-test contract (Conflict D resolution).
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { goCityLink } from '../goCity';
import { NoIsraelInventoryError } from '../types';

beforeEach(() => {
  vi.unstubAllEnvs();
});

describe('goCityLink — STUB (Conflict D)', () => {
  it('throws NoIsraelInventoryError when called', () => {
    expect(() => goCityLink()).toThrow(NoIsraelInventoryError);
  });

  it('error message documents Conflict D rationale (no Israel destination)', () => {
    try {
      goCityLink();
      throw new Error('should have thrown');
    } catch (err) {
      expect(err).toBeInstanceOf(NoIsraelInventoryError);
      expect((err as Error).message).toMatch(/GoCity/i);
      expect((err as Error).message).toMatch(/Israel|Conflict D/i);
      expect((err as Error).message).toMatch(/quarterly/i);
    }
  });

  it('throws even when env var is set (intent over silent activation)', () => {
    vi.stubEnv('NEXT_PUBLIC_GOCITY_AID', 'PRESENT-BUT-IGNORED');
    expect(() => goCityLink()).toThrow(NoIsraelInventoryError);
  });

  it('error is instanceof Error (downstream catch blocks can recover)', () => {
    try {
      goCityLink();
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect((err as Error).name).toBe('NoIsraelInventoryError');
    }
  });
});
