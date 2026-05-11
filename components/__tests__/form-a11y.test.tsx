/**
 * Form-component a11y contract — A11Y-06.
 *
 * Phase 1 does not ship a real <Form>/<Input>/<Label> component family
 * (forms land in Phase 2.5 — accessibility-statement contact form). But
 * the contract MUST be exercised: a sample form using the patterns from
 * `accessibility/SKILL.md` §3.3.1 (Error handling) must:
 *
 *   - Associate every <input> with a <label> via for/id
 *   - Set aria-required on required inputs
 *   - Set aria-invalid + aria-describedby pointing at an error region
 *   - Render error region with role="alert" so screen readers announce
 *
 * This test renders a sample form using NATIVE HTML elements (the same
 * patterns Phase 2.5 will adopt) and proves the contract holds.
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

function SampleContactForm({ error }: { error?: string }) {
  return (
    <form aria-label="Contact form">
      <label htmlFor="contact-email">Email</label>
      <input
        id="contact-email"
        type="email"
        name="email"
        required
        aria-required="true"
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? 'contact-email-error' : undefined}
      />
      {error ? (
        <p id="contact-email-error" role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit">Send</button>
    </form>
  );
}

describe('A11Y-06 — form labels + ARIA error contract', () => {
  it('input has label association via for/id', () => {
    render(<SampleContactForm />);
    const input = screen.getByLabelText('Email');
    expect(input).toBeInTheDocument();
    expect(input.getAttribute('id')).toBe('contact-email');
  });

  it('required input emits aria-required="true"', () => {
    render(<SampleContactForm />);
    const input = screen.getByLabelText('Email');
    expect(input.getAttribute('aria-required')).toBe('true');
    expect(input.hasAttribute('required')).toBe(true);
  });

  it('error state emits aria-invalid + aria-describedby + role="alert"', () => {
    render(<SampleContactForm error="Please enter a valid email" />);
    const input = screen.getByLabelText('Email');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toBe('contact-email-error');

    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Please enter a valid email');
    expect(alert.id).toBe('contact-email-error');
  });

  it('no-error state has aria-invalid="false" + no aria-describedby', () => {
    render(<SampleContactForm />);
    const input = screen.getByLabelText('Email');
    expect(input.getAttribute('aria-invalid')).toBe('false');
    expect(input.hasAttribute('aria-describedby')).toBe(false);
  });
});
