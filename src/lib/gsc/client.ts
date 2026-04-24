import { google } from 'googleapis';

export function getGscClient() {
  const clientId     = process.env.GSC_CLIENT_ID;
  const clientSecret = process.env.GSC_CLIENT_SECRET;
  const refreshToken = process.env.GSC_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('GSC_CLIENT_ID, GSC_CLIENT_SECRET, GSC_REFRESH_TOKEN must all be set');
  }

  const oauth2 = new google.auth.OAuth2(clientId, clientSecret, 'urn:ietf:wg:oauth:2.0:oob');
  oauth2.setCredentials({ refresh_token: refreshToken });

  return google.searchconsole({ version: 'v1', auth: oauth2 });
}
