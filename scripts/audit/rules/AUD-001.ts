/**
 * AUD-001 — No raw hex codes in inline styles or className arbitrary values.
 *
 * Detection: scan the page HTML for `style="...#abc..."` attributes OR
 * `class="...[#abc]..."` arbitrary-value markers. Real enforcement is at
 * lint time (RULE 1/2 in eslint.config.js); this audit reports what slipped
 * through to the rendered page. False positives in inline SVG `fill="#..."`
 * are tolerated — the rule looks for `style=` / `class=` containers only.
 *
 * Excluded: occurrences inside `<style>` blocks (Tailwind v4 emits all the
 * project's hexes there) and inside `<script>` blocks (analytics snippets).
 */
import type { Rule } from './types';

const STYLE_HEX = /\bstyle="[^"]*#[0-9a-fA-F]{3,8}\b[^"]*"/;
const CLASS_HEX = /\b(?:class|className)="[^"]*\[#[0-9a-fA-F]{3,8}\][^"]*"/;

function stripStyleAndScript(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '');
}

const rule: Rule = {
  id: 'AUD-001',
  severity: 'critical',
  description: 'No raw hex codes in inline styles or className arbitrary values.',
  scan(html) {
    const cleaned = stripStyleAndScript(html);
    const issues = [];
    const m1 = STYLE_HEX.exec(cleaned);
    if (m1) {
      issues.push({
        rule: 'AUD-001',
        severity: 'critical' as const,
        message: 'Raw hex code in inline style attribute. Use design tokens (@theme).',
        match: m1[0],
      });
    }
    const m2 = CLASS_HEX.exec(cleaned);
    if (m2) {
      issues.push({
        rule: 'AUD-001',
        severity: 'critical' as const,
        message: 'Tailwind arbitrary-value hex in className. Use design tokens.',
        match: m2[0],
      });
    }
    return issues;
  },
};

export default rule;
