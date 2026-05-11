/**
 * FAQPage generator — page-level FAQ blocks (REGION_CANONICAL + SUB_DESTINATION).
 *
 * `mainEntity` is a list of Question objects, each with an `acceptedAnswer` of
 * @type Answer. Per schema.org spec, FAQPage requires at least one Question.
 */
import type { FAQPage, WithContext } from 'schema-dts';

import { canonicalUrl } from '../seo/canonical';
import type { FaqInput } from './types';

export function buildFAQ(i: FaqInput): WithContext<FAQPage> {
  if (i.questions.length < 1) {
    throw new Error('buildFAQ requires at least 1 question');
  }

  const url = canonicalUrl(i.slug, i.lang);

  const mainEntity = i.questions.map((q) => ({
    '@type': 'Question' as const,
    name: q.question,
    acceptedAnswer: {
      '@type': 'Answer' as const,
      text: q.answer,
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    inLanguage: i.lang,
    mainEntity,
  } as WithContext<FAQPage>;
}
