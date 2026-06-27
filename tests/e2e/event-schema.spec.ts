import { test, expect } from '@playwright/test';

function parseJsonLd(html: string): unknown[] {
  const matches = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  return matches.map((m) => JSON.parse(m[1]));
}

test.describe('Event JSON-LD schema', () => {
  test('israel-events-festivals emits Event schema blocks', async ({ page }) => {
    const res = await page.goto('/israel-events-festivals');
    expect(res?.status()).toBe(200);

    const html = await page.content();
    const blocks = parseJsonLd(html);
    const events = blocks.filter((b: any) => b['@type'] === 'Event');

    expect(events.length).toBeGreaterThanOrEqual(3);

    const event = events[0] as any;
    expect(event['@context']).toBe('https://schema.org');
    expect(typeof event.name).toBe('string');
    expect(event.name.length).toBeGreaterThan(0);
    expect(typeof event.startDate).toBe('string');
    expect(event.eventStatus).toBe('https://schema.org/EventScheduled');
    expect(event.location?.['@type']).toBe('Place');
    expect(event.location?.address?.addressCountry).toBe('IL');
  });

  test('masada-dead-sea-day-trip emits Event schema for Sound and Light Show', async ({ page }) => {
    const res = await page.goto('/masada-dead-sea-day-trip');
    expect(res?.status()).toBe(200);

    const html = await page.content();
    const blocks = parseJsonLd(html);
    const events = blocks.filter((b: any) => b['@type'] === 'Event');

    expect(events.length).toBeGreaterThanOrEqual(1);

    const event = events[0] as any;
    expect(event.name).toMatch(/Masada/i);
    expect(event.startDate).toBe('2026-03-01');
    expect(event.endDate).toBe('2026-10-31');
    expect(event.location?.address?.addressCountry).toBe('IL');
  });

  test('events page does not emit aggregateRating (honesty gate)', async ({ page }) => {
    await page.goto('/israel-events-festivals');
    const html = await page.content();
    const blocks = parseJsonLd(html);
    const hasAggregateRating = blocks.some((b: any) => b['aggregateRating'] !== undefined);
    expect(hasAggregateRating).toBe(false);
  });
});
