/**
 * Focused FAQPage tests — mainEntity Question/Answer shape.
 */
import { describe, it, expect } from 'vitest';

import { buildFAQ } from '../faq';

type JsonLdShape = Record<string, unknown>;

describe('buildFAQ', () => {
  it('produces FAQPage with mainEntity of Questions', () => {
    const faq = buildFAQ({
      slug: 'jerusalem',
      lang: 'en',
      questions: [
        { question: 'Is Jerusalem safe?', answer: 'Yes — millions visit annually.' },
        { question: 'How many days do I need?', answer: 'Three days minimum.' },
      ],
    }) as unknown as JsonLdShape;
    expect(faq['@context']).toBe('https://schema.org');
    expect(faq['@type']).toBe('FAQPage');
    const entity = faq['mainEntity'] as unknown[];
    expect(entity.length).toBe(2);
  });

  it('each Question has acceptedAnswer of @type=Answer', () => {
    const faq = buildFAQ({
      slug: 'jerusalem',
      lang: 'en',
      questions: [{ question: 'Is Jerusalem safe?', answer: 'Yes.' }],
    }) as unknown as JsonLdShape;
    const entity = faq['mainEntity'] as Array<{
      '@type': string;
      name: string;
      acceptedAnswer: { '@type': string; text: string };
    }>;
    const q = entity[0]!;
    expect(q['@type']).toBe('Question');
    expect(q.name).toBe('Is Jerusalem safe?');
    expect(q.acceptedAnswer['@type']).toBe('Answer');
    expect(q.acceptedAnswer.text).toBe('Yes.');
  });

  it('propagates inLanguage', () => {
    const faq = buildFAQ({
      slug: 'jerusalem',
      lang: 'he',
      questions: [{ question: 'האם ירושלים בטוחה?', answer: 'כן.' }],
    }) as unknown as JsonLdShape;
    expect(faq['inLanguage']).toBe('he');
  });
});
