/**
 * Religious-site naming detectors — AUD-017..AUD-020 data layer.
 *
 * Plan 08 ships the regex helpers + heuristics that plan 10 (audit dashboard)
 * consumes when scanning built HTML. The actual HTML-walking happens there;
 * here we lock the data layer so the regexes are stable and well-tested.
 *
 * Source: PITFALLS §6 (audit-rule catalog) + RESEARCH §1.8 + SEO-04.
 */
import { describe, it, expect } from 'vitest';

import {
  WAILING_WALL_REGEX,
  BIASED_FRAMING_REGEX,
  detectTempleMountPaired,
  detectUnpairedReligiousNaming,
  ADMIN_STATUS_REQUIRED_SITES,
  requiresAdministrativeStatus,
} from '../naming';

describe('AUD-017 — Wailing Wall (banned phrasing)', () => {
  it('flags "Wailing Wall" usage', () => {
    expect(WAILING_WALL_REGEX.test('Visit the Wailing Wall today')).toBe(true);
  });

  it('does NOT flag "Western Wall" usage', () => {
    expect(WAILING_WALL_REGEX.test('Visit the Western Wall today')).toBe(
      false,
    );
  });

  it('is case-insensitive (catches lower-case slip-ups)', () => {
    expect(WAILING_WALL_REGEX.test('the wailing wall is famous')).toBe(true);
  });

  it('matches with surrounding punctuation', () => {
    expect(WAILING_WALL_REGEX.test('the Wailing Wall, also called Kotel')).toBe(
      true,
    );
  });
});

describe('AUD-018 — biased framing (Judea and Samaria / occupied territories)', () => {
  it('flags "Judea and Samaria"', () => {
    expect(BIASED_FRAMING_REGEX.test('explored Judea and Samaria')).toBe(true);
  });

  it('flags "occupied territories"', () => {
    expect(BIASED_FRAMING_REGEX.test('explored the occupied territories')).toBe(
      true,
    );
  });

  it('does NOT flag neutral "West Bank"', () => {
    expect(BIASED_FRAMING_REGEX.test('explored the West Bank')).toBe(false);
  });

  it('case-insensitive — catches "JUDEA AND SAMARIA" headers too', () => {
    expect(BIASED_FRAMING_REGEX.test('JUDEA AND SAMARIA TOUR')).toBe(true);
  });
});

describe('AUD-019 — Temple Mount paired-naming heuristic', () => {
  it('returns true when "Temple Mount" appears paired with "Haram al-Sharif" on first reference', () => {
    expect(
      detectTempleMountPaired(
        'The Temple Mount / Haram al-Sharif is a key religious site',
      ),
    ).toBe(true);
  });

  it('returns false when "Temple Mount" appears alone without pairing within window', () => {
    expect(
      detectTempleMountPaired('The Temple Mount is the heart of the Old City'),
    ).toBe(false);
  });

  it('returns true (vacuously paired) when "Temple Mount" is not mentioned', () => {
    expect(detectTempleMountPaired('Western Wall sits below the plaza')).toBe(
      true,
    );
  });

  it('accepts pairing within a 300-char window even if not immediately adjacent', () => {
    const text =
      'The Temple Mount sits above the Western Wall. ' +
      'It is one of the holiest spots in Judaism and the third holiest in Islam. ' +
      'Muslims know it as Haram al-Sharif (the Noble Sanctuary).';
    expect(detectTempleMountPaired(text)).toBe(true);
  });

  it('rejects pairing when "Haram al-Sharif" appears beyond the 300-char window', () => {
    const filler = 'a'.repeat(400);
    const text = `Temple Mount visible from afar. ${filler} Haram al-Sharif appears finally.`;
    expect(detectTempleMountPaired(text)).toBe(false);
  });
});

describe('AUD-020 — administrativeStatus required sites', () => {
  it('ADMIN_STATUS_REQUIRED_SITES includes bethlehem / hebron / jericho', () => {
    expect(ADMIN_STATUS_REQUIRED_SITES.has('bethlehem')).toBe(true);
    expect(ADMIN_STATUS_REQUIRED_SITES.has('hebron')).toBe(true);
    expect(ADMIN_STATUS_REQUIRED_SITES.has('jericho')).toBe(true);
  });

  it('ADMIN_STATUS_REQUIRED_SITES does NOT include jerusalem / tel-aviv', () => {
    expect(ADMIN_STATUS_REQUIRED_SITES.has('jerusalem')).toBe(false);
    expect(ADMIN_STATUS_REQUIRED_SITES.has('tel-aviv')).toBe(false);
  });

  it('requiresAdministrativeStatus is case-insensitive on slug', () => {
    expect(requiresAdministrativeStatus('Bethlehem')).toBe(true);
    expect(requiresAdministrativeStatus('BETHLEHEM')).toBe(true);
    expect(requiresAdministrativeStatus('bethlehem')).toBe(true);
  });
});

describe('detectUnpairedReligiousNaming — aggregated violation reporter (consumed by plan 10)', () => {
  it('returns empty array for clean text', () => {
    const violations = detectUnpairedReligiousNaming(
      'The Western Wall and the West Bank are popular destinations.',
    );
    expect(violations).toEqual([]);
  });

  it('reports AUD-017 violation for "Wailing Wall"', () => {
    const violations = detectUnpairedReligiousNaming(
      'Visit the Wailing Wall today',
    );
    expect(violations.length).toBeGreaterThan(0);
    expect(violations.some((v) => v.rule === 'AUD-017')).toBe(true);
  });

  it('reports AUD-018 violation for biased framing', () => {
    const violations = detectUnpairedReligiousNaming(
      'a guide to Judea and Samaria',
    );
    expect(violations.some((v) => v.rule === 'AUD-018')).toBe(true);
  });

  it('reports AUD-019 violation for unpaired Temple Mount mention', () => {
    const violations = detectUnpairedReligiousNaming(
      'The Temple Mount is the heart of the Old City',
    );
    expect(violations.some((v) => v.rule === 'AUD-019')).toBe(true);
  });

  it('does NOT report AUD-019 when paired correctly', () => {
    const violations = detectUnpairedReligiousNaming(
      'The Temple Mount / Haram al-Sharif is venerated by three faiths',
    );
    expect(violations.some((v) => v.rule === 'AUD-019')).toBe(false);
  });

  it('returns multiple violations if multiple rules fire', () => {
    const violations = detectUnpairedReligiousNaming(
      'Tour the Wailing Wall and explore Judea and Samaria.',
    );
    const rules = violations.map((v) => v.rule);
    expect(rules).toContain('AUD-017');
    expect(rules).toContain('AUD-018');
  });
});
