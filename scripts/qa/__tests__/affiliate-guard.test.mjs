import { test } from 'node:test';
import assert from 'node:assert/strict';
import { analyzeHtml, buildReport } from '../affiliate-guard.mjs';

const page = (href) => `<html><body><a href="${href}" rel="sponsored">Book</a></body></html>`;

test('a placeholder ID fails in every mode', () => {
  const docs = [{ name: '/x', html: page('https://www.booking.com/searchresults.html?aid=BOOKING_AID&amp;ss=Jerusalem') }];
  assert.equal(buildReport(docs, 'pre').ok, false);
  assert.equal(buildReport(docs, 'production').ok, false);
});

test('placeholders are detected in src attributes too', () => {
  const html = '<iframe src="https://www.stay22.com/embed/gm?aid=STAY22_AID&lat=1"></iframe>';
  assert.equal(analyzeHtml(html).placeholders.length, 1);
});

test('a clean partner link passes in pre-approval mode and is counted as unmonetized', () => {
  const docs = [{ name: '/x', html: page('https://www.booking.com/searchresults.html?ss=Jerusalem') }];
  const report = buildReport(docs, 'pre');
  assert.equal(report.ok, true);
  assert.equal(report.unmonetized.length, 1);
  assert.deepEqual(report.byPartner, { booking: 1 });
});

test('a clean partner link fails in production mode', () => {
  const docs = [{ name: '/x', html: page('https://www.skyscanner.net') }];
  assert.equal(buildReport(docs, 'production').ok, false);
});

test('a real ID passes in production mode', () => {
  const docs = [
    { name: '/x', html: page('https://www.booking.com/searchresults.html?aid=1234567&amp;ss=Jerusalem') },
    { name: '/y', html: page('https://www.getyourguide.com/s/?partner_id=ABC123&amp;q=Masada') },
    { name: '/z', html: page('https://www.stay22.com/embed/abc-123') },
  ];
  const report = buildReport(docs, 'production');
  assert.equal(report.ok, true);
  assert.equal(report.unmonetized.length, 0);
  assert.equal(report.partnerLinks, 3);
});

test('an empty affiliate param counts as unmonetized', () => {
  const r = analyzeHtml(page('https://www.viator.com/searchResults/all?pid=&amp;text=Haifa'));
  assert.equal(r.links[0].monetized, false);
});

test('non-partner and relative links are ignored', () => {
  const html = page('/jerusalem') + page('https://en.wikipedia.org/wiki/Masada') + page('mailto:hello@visitisrael.site');
  assert.equal(analyzeHtml(html).links.length, 0);
});
