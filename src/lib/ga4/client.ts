import { google, analyticsdata_v1beta } from 'googleapis';

/**
 * GA4 Data API client (Analytics Data API v1beta).
 *
 * Auth: service account with Viewer role on the GA4 property.
 * The service account email must be added in:
 *   GA4 Admin → Property → Property access management → Add user.
 *
 * Env vars (all required):
 *   GA4_PROPERTY_ID                       — 9-digit property ID (NOT the G-XXX measurement ID)
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL          — from JSON key `client_email`
 *   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY    — from JSON key `private_key` (keep literal `\n`)
 */
export function getGa4Client(): analyticsdata_v1beta.Analyticsdata {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKeyRaw = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

  if (!clientEmail || !privateKeyRaw) {
    throw new Error(
      'GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY must both be set'
    );
  }

  // When stored in env vars, newlines in the PEM key are typically escaped as \n.
  const privateKey = privateKeyRaw.replace(/\\n/g, '\n');

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
  });

  return google.analyticsdata({ version: 'v1beta', auth });
}

export function getGa4PropertyPath(): string {
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!propertyId) {
    throw new Error('GA4_PROPERTY_ID must be set (9-digit numeric ID from GA4 Admin → Property details)');
  }
  return `properties/${propertyId}`;
}
