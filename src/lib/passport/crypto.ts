/**
 * Server-only encryption for passport data.
 *
 * One master key (PASSPORT_ENCRYPTION_KEY, 32 random bytes, base64) is split
 * with HKDF into an encryption key (AES-256-GCM) and a lookup key (HMAC), so a
 * leaked lookup hash never helps decrypt anything.
 */
import { createCipheriv, createDecipheriv, createHash, createHmac, hkdfSync, randomBytes } from 'crypto';

const IV_BYTES = 12;
const TAG_BYTES = 16;
const TEXT_PREFIX = 'v1:';

export class PassportCryptoConfigError extends Error {}

function masterKey(): Buffer {
  const raw = process.env.PASSPORT_ENCRYPTION_KEY;
  if (!raw) throw new PassportCryptoConfigError('PASSPORT_ENCRYPTION_KEY is not set');
  const key = Buffer.from(raw, 'base64');
  if (key.length !== 32) throw new PassportCryptoConfigError('PASSPORT_ENCRYPTION_KEY must be 32 bytes, base64-encoded');
  return key;
}

function derive(info: string): Buffer {
  return Buffer.from(hkdfSync('sha256', masterKey(), Buffer.alloc(0), info, 32));
}

export function isPassportCryptoConfigured(): boolean {
  try {
    masterKey();
    return true;
  } catch {
    return false;
  }
}

/** iv | tag | ciphertext */
export function encryptBytes(plain: Buffer): Buffer {
  const iv = randomBytes(IV_BYTES);
  const cipher = createCipheriv('aes-256-gcm', derive('cts-passport-encrypt-v1'), iv);
  const ct = Buffer.concat([cipher.update(plain), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), ct]);
}

export function decryptBytes(blob: Buffer): Buffer {
  const iv = blob.subarray(0, IV_BYTES);
  const tag = blob.subarray(IV_BYTES, IV_BYTES + TAG_BYTES);
  const ct = blob.subarray(IV_BYTES + TAG_BYTES);
  const decipher = createDecipheriv('aes-256-gcm', derive('cts-passport-encrypt-v1'), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(ct), decipher.final()]);
}

export function encryptText(plain: string): string {
  return TEXT_PREFIX + encryptBytes(Buffer.from(plain, 'utf8')).toString('base64');
}

export function decryptText(stored: string): string {
  if (!stored.startsWith(TEXT_PREFIX)) throw new Error('Unknown ciphertext version');
  return decryptBytes(Buffer.from(stored.slice(TEXT_PREFIX.length), 'base64')).toString('utf8');
}

/** Upper-case, no spaces or fillers — so "e 1234 5678" and "E12345678" are the same passport. */
export function normalisePassportNumber(n: string): string {
  return n.toUpperCase().replace(/[^A-Z0-9]/g, '');
}

/** Deterministic, keyed hash for dedupe. Never reversible without the key. */
export function passportLookup(passportNumber: string): string {
  return createHmac('sha256', derive('cts-passport-lookup-v1')).update(normalisePassportNumber(passportNumber)).digest('hex');
}

/** Shown by default: only the last 4 characters. */
export function maskPassportNumber(last4: string): string {
  return `•••••${last4}`;
}

export function lastFour(passportNumber: string): string {
  return normalisePassportNumber(passportNumber).slice(-4);
}

/** Upload-link tokens: 256 random bits, URL-safe. Only the SHA-256 is stored. */
export function newLinkToken(): { token: string; hash: string } {
  const token = randomBytes(32).toString('base64url');
  return { token, hash: hashLinkToken(token) };
}

export function hashLinkToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}
