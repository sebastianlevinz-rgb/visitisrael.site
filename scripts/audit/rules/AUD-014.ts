/**
 * AUD-014 — More than 6 external `<script>` tags.
 *
 * Detection: count `<script src="https://...">` (or `//cdn.../`) entries.
 * Threshold is generous — analytics + a few partner snippets is fine; 7+
 * indicates script bloat that will degrade LCP/INP.
 */
import type { Rule } from './types';

const rule: Rule = {
  id: 'AUD-014',
  severity: 'major',
  description: 'Page emits more than 6 external <script> tags.',
  scan(_html, $) {
    const externals: string[] = [];
    $('script[src]').each((_, el) => {
      const src = $(el).attr('src') || '';
      if (
        src.startsWith('http://') ||
        src.startsWith('https://') ||
        src.startsWith('//')
      ) {
        externals.push(src);
      }
    });
    if (externals.length > 6) {
      return [
        {
          rule: 'AUD-014',
          severity: 'major' as const,
          message: `Page emits ${externals.length} external scripts (>6). Audit third-party budget.`,
        },
      ];
    }
    return [];
  },
};

export default rule;
