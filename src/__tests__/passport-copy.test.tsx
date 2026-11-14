/**
 * The passport system changes what CTS promises customers. These tests keep the
 * public promises in line with what the system actually does (PM 2026-11-15):
 * the "we never ask for your passport number" line is gone, and the privacy
 * policy explains photos, AI reading, encryption and the 6-month deletion.
 */
import { readFileSync } from 'fs';
import { join } from 'path';
import { render, screen } from '@testing-library/react';
import PrivacyPolicyPage from '@/app/privacy-policy/page';

describe('passport copy', () => {
  it('no longer promises we never ask for a passport number', () => {
    const src = readFileSync(join(process.cwd(), 'src/app/traveller-details/TravellerDetailsForm.tsx'), 'utf8');
    expect(src).not.toMatch(/never ask for your passport number/i);
  });

  it('privacy policy has a passport section that the upload page and email link to', () => {
    const { container } = render(<PrivacyPolicyPage />);
    const section = container.querySelector('#passport-information');
    expect(section).not.toBeNull();
    expect(section?.textContent).toMatch(/deleted 6 months after your tour returns/);
    expect(section?.textContent).toMatch(/do not\s+allow your data to be used to train/);
    expect(screen.getByText(/Last updated: 15 November 2026/)).toBeTruthy();
  });
});
