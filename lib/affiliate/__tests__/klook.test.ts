/**
 * klookLink STUB — 4-test contract (Conflict D resolution).
 *
 * 1. Calling throws NoIsraelInventoryError
 * 2. Error message documents Conflict D rationale
 * 3. Function does not crash even if env var is set (still throws — intent over silent activation)
 * 4. Error type is recoverable via instanceof for downstream catch blocks
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { klookLink } from '../klook';
import { NoIsraelInventoryError } from '../types';

beforeEach(() => {
  vi.unstubAllEnvs();
});

describe('klookLink — STUB (Conflict D)', () => {
  it('throws NoIsraelInventoryError when called', () => {
    expect(() => klookLink()).toThrow(NoIsraelInventoryError);
  });

  it('error message documents Conflict D rationale (thin Israel SKU)', () => {
    try {
      klookLink();
      throw new Error('should have thrown');
    } catch (err) {
      expect(err).toBeInstanceOf(NoIsraelInventoryError);
      expect((err as Error).message).toMatch(/Klook/i);
      expect((err as Error).message).toMatch(/Israel SKU|Conflict D/i);
      expect((err as Error).message).toMatch(/quarterly/i);
    }
  });

  it('throws even when env var is set (intent over silent activation)', () => {
    vi.stubEnv('NEXT_PUBLIC_KLOOK_AID', 'PRESENT-BUT-IGNORED');
    expect(() => klookLink()).toThrow(NoIsraelInventoryError);
  });

  it('error is instanceof Error (downstream catch blocks can recover)', () => {
    try {
      klookLink();
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect((err as Error).name).toBe('NoIsraelInventoryError');
    }
  });
});
