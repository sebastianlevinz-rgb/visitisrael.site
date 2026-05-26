---
lang: en
title: 'Accessibility Statement — Visit Israel (IS 5568 / WCAG 2.1 AA)'
description: 'Visit Israel commits to IS 5568:2020 / WCAG 2.1 AA. Read our accessibility features, known limitations, named coordinator contact and last audit date.'
slug: accessibility-statement
page: accessibility-statement
publishedAt: 2026-05-11
updatedAt: 2026-05-11
accessibility_coordinator:
  name: 'Sebastian Levin'
  phone: '+972-53-371-3838'
  email: 'accessibility@visitisrael.site'
last_audit_date: '2026-05-11'
---

## Our Commitment to Accessibility

Visit Israel is committed to providing an accessible web experience to all visitors, including people with disabilities. We follow the Israeli Standard IS 5568:2020, which aligns with the international Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA, and we comply with the Equal Rights for Persons with Disabilities Act and the Equal Rights for Persons with Disabilities (Service Accessibility Accommodations) Regulations, 2013.

This statement is the central reference for how we approach accessibility on the site, what features we have built in, what limitations we know about, and how to reach us if something is not working for you.

## Standard: IS 5568:2020 / WCAG 2.1 AA

The site is engineered, audited, and maintained against IS 5568:2020. The standard aligns with WCAG 2.1 AA — the same baseline used by most public-facing accessibility commitments worldwide. We monitor the published IS 5568 Part 1 technical updates (most recently September 2023) and incorporate clarifications as they become normative.

We do not claim WCAG 2.2 compliance. WCAG 2.2 is not yet required by Israeli law for non-government sites, and our editorial budget at v1 prioritises IS 5568 / WCAG 2.1 AA coverage with full Hebrew screen-reader testing. We expect to revisit 2.2 alignment in v2.

## Accessibility Features

The features below are built into every page on the site. They work in both Hebrew and English.

### Keyboard Navigation

The entire site is navigable using a keyboard alone — no mouse required. The first focusable element on every page is a **"Skip to main content"** link (Hebrew: **"דלג לתוכן הראשי"**) that jumps past the header and language switcher straight into the page body. Focus indicators are visible on every interactive element, with sufficient colour contrast against the surrounding background.

Tab order follows the visual reading order. On Hebrew pages with `dir="rtl"`, tab order moves from top-right to bottom-left in line with the visual layout. On English pages, tab order moves top-left to bottom-right.

### Screen Reader Support

We test against the screen readers most commonly used by Israeli visitors:

- **NVDA** with eSpeak-ng Hebrew on Windows (free; most common in Israel)
- **JAWS** with Eloquence Hebrew on Windows (commercial)
- **VoiceOver** on macOS and iOS (built-in)
- **TalkBack** on Android with Google TTS Hebrew

Every image has a meaningful `alt` attribute. Decorative images use `alt=""` so screen readers skip them. Headings follow a logical hierarchy (a single `h1` per page, nested `h2` and `h3` for sub-sections). ARIA landmarks (`role="banner"`, `role="navigation"`, `role="main"`, `role="contentinfo"`) wrap the major page regions.

### Bilingual Direction and Language Attributes

Hebrew pages declare `<html lang="he" dir="rtl">`. English pages declare `<html lang="en" dir="ltr">`. Inline-language switches (a Hebrew sentence containing an English brand name, or an LTR phone number inside Hebrew prose) use `<span dir="ltr">` or `<span lang="en">` so screen readers announce the language change correctly and bi-directional rendering does not flip Latin runs.

### Colour Contrast and Text Size

Body text meets the 4.5:1 contrast ratio required by IS 5568 / WCAG 2.1 AA. Large text (18pt+ or 14pt bold+) meets the 3:1 ratio. The site supports browser zoom up to 200% without horizontal scrolling or content loss. The viewport meta tag does **not** disable user scaling, so pinch-zoom on mobile works.

### Forms and Error Messages

Forms include associated `<label>` elements, `aria-required` for mandatory fields, and Hebrew error messages with `role="alert"` so screen readers announce them at the moment of validation. Numeric inputs (phone, ID number) carry `dir="ltr"` so the digits read in the conventional left-to-right order even on Hebrew pages.

### Skip Navigation and Focus Management

The skip-navigation link is the first body-child element on every page. When activated, it focuses the `#main-content` container, which carries `tabindex="-1"` for programmatic focus reception. Modal dialogues (when shipped) trap keyboard focus inside the dialogue while open and return focus to the trigger element on close.

## Known Limitations

We document accessibility limitations openly, as the statute requires.

### Third-Party Affiliate Widgets

Some monetised pages link out to third-party booking partners (Booking.com, Viator, Civitatis, GetYourGuide, Skyscanner, RentalCars, SafetyWing, Hostelworld, DiscoverCars). When you click an affiliate link, you navigate to the partner's website, which is **not under our accessibility control**. Each partner publishes their own accessibility statement; we do our best to surface partners whose statements meet WCAG 2.1 AA. We are working with partners whose pages do not yet meet that bar.

### MDX-Rendered Tables on Mobile

Long data tables (the partner-list table on the affiliate-disclosure page, the response-times table on the contact page) reflow on narrow viewports, but the reflow strategy is "horizontal scroll inside the table container," which is functional but not as elegant as a card-based responsive table. Future plans may swap the long tables for a card layout under 480px-wide viewports.

### No Live Region for Affiliate-Click Outbound Notifications

Affiliate links open in a new tab via `target="_blank"`. There is no `aria-live` announcement saying "opening in a new tab" — visitors using screen readers must rely on the `rel="sponsored nofollow noopener"` attribute combination + visual link styling to anticipate the new-tab behaviour. This is consistent with WCAG 2.1 AA technique H83 and conventional industry practice, but we recognise some users prefer an explicit announcement.

### Hebrew Slug for the Accessibility Statement

This page is served at `/accessibility-statement` (HE default locale) and `/en/accessibility-statement` (English). The Hebrew exonym slug `/הצהרת-נגישות/` is on the v2 roadmap; routing it cleanly through Next.js + next-intl requires a slug-rewrite layer we have not yet shipped. The current English-slug routing works for both locales and is fully accessible — only the URL appearance differs from a fully Hebrew-slug counterfactual.

### Accessibility Preferences Widget (Regulation 35)

Regulation 35 of the Service Accessibility Regulations requires Israeli sites with 25+ employees or 300,000+ NIS annual revenue to expose an accessibility preferences widget (contrast, text size, motion controls). Visit Israel does not meet either threshold at v1, so the widget is not yet required and is deferred to a future milestone. Visitors who want OS-level accessibility preferences (high contrast, reduced motion, increased text size) — the operating system controls work on this site without further configuration. We do not override `prefers-reduced-motion` or `prefers-color-scheme`.

## Accessibility Coordinator

The frontmatter for this statement carries the named coordinator's full name, phone number, and email address. They are rendered in the **Accessibility Coordinator** section below this introduction by the renderer.

The coordinator is the named human accountable for accessibility queries, complaints, and remediation timelines. Per IS 5568, the contact details are real, reachable, and monitored.

## Submit Accessibility Feedback

If you encounter an accessibility barrier on this site — a keyboard trap, a missing alt text, a Hebrew screen-reader announcement that does not read correctly, a contrast ratio that fails on your display — please contact the accessibility coordinator using the phone or email rendered below. We respond within two business days.

When you report an issue, please include:

1. **The page URL** where you encountered the problem.
2. **The assistive technology** you are using (NVDA, JAWS, VoiceOver, TalkBack, screen magnifier, switch, voice control, keyboard only, etc.) and its version.
3. **Your browser** (Chrome, Firefox, Safari, Edge) and its version.
4. **A short description** of what you expected and what actually happened.

This information lets us reproduce the issue and ship a fix faster.

You can also reach us through the general [contact page](/en/contact), but accessibility-specific feedback routed directly to the coordinator is faster — the inbox is monitored on a different SLA from general editorial mail.

## Filing a Complaint with the Commission

If we have not resolved your accessibility concern to your satisfaction within a reasonable time, you have the right to file a complaint with the Commission for Equal Rights of Persons with Disabilities (Netzivut Shivyon Zechuyot LeAnashim Im Mugbaluyot) at Israel's Ministry of Justice. Their contact details and complaint forms are published at [gov.il](https://www.gov.il/he/departments/moj_disability_rights/govil-landing-page).

## Last Audit

The most recent accessibility audit date is recorded in the frontmatter of this statement and rendered in the **Last Audit** section below. We audit the site against IS 5568:2020 / WCAG 2.1 AA at a regular cadence — combining automated testing (axe-core, Lighthouse, custom IS 5568 checks via Python), manual screen-reader walkthroughs (NVDA + VoiceOver), and live keyboard-only navigation across the canonical pages. Material changes to the site, especially those touching navigation, forms, or focus management, trigger an out-of-cycle audit.
