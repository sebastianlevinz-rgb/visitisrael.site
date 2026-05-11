/**
 * AUD-021 — `OpeningHoursSpecification` schema without a paired
 * "subject to holidays" advisory note.
 *
 * Detection: scan inline JSON-LD for OpeningHoursSpecification; if found,
 * verify the page body contains a "Shabbat" / "holiday" / "festival" /
 * "religious holiday" advisory note (Hebrew "חג"/"שבת" too).
 */
import type { Rule } from './types';

const HOLIDAY_ADVISORY =
  /(shabbat|holiday|festival|religious holiday|חג|שבת|חגים)/i;

const rule: Rule = {
  id: 'AUD-021',
  severity: 'major',
  description:
    'OpeningHoursSpecification schema without paired "subject to holidays" note.',
  scan(_html, $) {
    let hasOpeningHours = false;
    $('script[type="application/ld+json"]').each((_, el) => {
      const json = $(el).text();
      if (/OpeningHoursSpecification/.test(json)) {
        hasOpeningHours = true;
      }
    });
    if (!hasOpeningHours) return [];
    const bodyText = $('body').text();
    if (!HOLIDAY_ADVISORY.test(bodyText)) {
      return [
        {
          rule: 'AUD-021',
          severity: 'major' as const,
          message:
            'OpeningHoursSpecification present but no Shabbat/holiday advisory in page body. Israel sites close on Shabbat + holidays.',
        },
      ];
    }
    return [];
  },
};

export default rule;
