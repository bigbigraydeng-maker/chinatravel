/**
 * @jest-environment node
 *
 * Customers decide whether an email is genuine from its subject and link —
 * keep it English, escaped, and pointing at the privacy section.
 */
import { passportUploadSubject } from '@/lib/email-subjects';
import { uploadEmailHtml, uploadUrl } from '../email';

describe('upload email', () => {
  it('is English and escapes customer names', () => {
    expect(passportUploadSubject('China Discovery', true)).toBe('Reminder: Please upload your passport photo — China Discovery');
    const html = uploadEmailHtml('<script>x</script>', 'Tour', '2027-05-13', uploadUrl('abc'), false);
    expect(html).not.toContain('<script>');
    expect(html).toContain('#passport-information');
    expect(uploadUrl('abc')).toMatch(/\/passport-upload\/abc$/);
  });
});
