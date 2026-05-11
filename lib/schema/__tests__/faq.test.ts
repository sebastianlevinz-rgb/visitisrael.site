/**
 * Focused FAQPage tests — mainEntity Question/Answer shape.
 */
import { describe, it, expect } from 'vitest';

import { buildFAQ } from '../faq';

describe('buildFAQ', () => {
  it('produces FAQPage with mainEntity of Questions', () => {
    const faq = buildFAQ({
      slug: 'jerusalem',
      lang: 'en',
      questions: [
        { question: 'Is Jerusalem safe?', answer: 'Yes — millions visit annually.' },
        { question: 'How many days do I need?', answer: 'Three days minimum.' },
      ],
    });
    expect(faq['@context']).toBe('https://schema.org');
    expect(faq['@type']).toBe('FAQPage');
    const entity = (faq as { mainEntity: unknown[] }).mainEntity;
    expect(entity.length).toBe(2);
  });

  it('each Question has acceptedAnswer of @type=Answer', () => {
    const faq = buildFAQ({
      slug: 'jerusalem',
      lang: 'en',
      questions: [{ question: 'Is Jerusalem safe?', answer: 'Yes.' }],
    });
    const q = (
      faq as {
        mainEntity: Array<{
          '@type': string;
          name: string;
          acceptedAnswer: { '@type': string; text: string };
        }>;
      }
    ).mainEntity[0]!;
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
    });
    expect((faq as { inLanguage: string }).inLanguage).toBe('he');
  });
});
