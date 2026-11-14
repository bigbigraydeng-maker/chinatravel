'use client';

import { useState } from 'react';
import { resizeForUpload } from '@/lib/passport/resize-image';
import { validateForSave, type PassportFields } from '@/lib/passport/record';

const FIELDS: { key: keyof PassportFields; label: string; type?: 'date'; required?: boolean }[] = [
  { key: 'surname', label: 'Surname', required: true },
  { key: 'givenNames', label: 'Given names' },
  { key: 'dateOfBirth', label: 'Date of birth', type: 'date', required: true },
  { key: 'passportNumber', label: 'Passport number', required: true },
  { key: 'nationality', label: 'Nationality (e.g. NZL)' },
  { key: 'issueDate', label: 'Date of issue', type: 'date' },
  { key: 'expiryDate', label: 'Date of expiry', type: 'date', required: true },
  { key: 'placeOfIssue', label: 'Place of issue / authority' },
];

type Step = 'pick' | 'reading' | 'check' | 'sending' | 'done';

export default function PassportUploadForm({ token, attemptsLeft: initialAttempts }: { token: string; attemptsLeft: number }) {
  const [step, setStep] = useState<Step>('pick');
  const [preview, setPreview] = useState<string | null>(null);
  const [scanId, setScanId] = useState('');
  const [fields, setFields] = useState<PassportFields | null>(null);
  const [readable, setReadable] = useState(true);
  const [attemptsLeft, setAttemptsLeft] = useState(initialAttempts);
  const [error, setError] = useState('');

  async function onFile(file: File | undefined) {
    if (!file) return;
    setError('');
    setStep('reading');
    try {
      const resized = await resizeForUpload(file);
      setPreview(URL.createObjectURL(resized));
      const form = new FormData();
      form.append('file', resized);
      const res = await fetch(`/api/passport-upload/${encodeURIComponent(token)}/scan`, { method: 'POST', body: form });
      const json = (await res.json().catch(() => ({}))) as { scanId?: string; fields?: PassportFields; readable?: boolean; attemptsLeft?: number; error?: string };
      if (!res.ok || !json.scanId || !json.fields) throw new Error(json.error || 'Upload failed. Please try again.');
      setScanId(json.scanId);
      setFields(json.fields);
      setReadable(Boolean(json.readable));
      setAttemptsLeft(json.attemptsLeft ?? 0);
      setStep('check');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed.');
      setStep('pick');
    }
  }

  async function submit() {
    if (!fields) return;
    setStep('sending');
    setError('');
    try {
      const res = await fetch(`/api/passport-upload/${encodeURIComponent(token)}/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scanId, fields }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error || 'Could not submit. Please try again.');
      setStep('done');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not submit.');
      setStep('check');
    }
  }

  if (step === 'done') {
    return (
      <div className="mt-8 rounded-lg border border-green-300 bg-green-50 p-6">
        <h2 className="text-xl font-semibold text-green-900">Thank you — we have your passport details.</h2>
        <p className="mt-2 text-green-900">A CTS staff member will check them. You can close this page; this link no longer works.</p>
      </div>
    );
  }

  const missing = fields ? validateForSave(fields).length > 0 : true;

  return (
    <div className="mt-8 space-y-6">
      {step === 'pick' || step === 'reading' ? (
        <div className="rounded-lg border border-gray-200 p-6">
          <h2 className="font-semibold">1. Take or choose a photo of your passport photo page</h2>
          <p className="mt-1 text-sm text-gray-600">Lay it flat, avoid glare, and make sure the two lines of letters and chevrons (&lt;&lt;&lt;) at the bottom are in the picture.</p>
          <label className="mt-4 inline-block cursor-pointer rounded bg-primary px-5 py-3 font-medium text-white">
            {step === 'reading' ? 'Reading your passport…' : 'Choose photo'}
            <input type="file" accept="image/*" capture="environment" className="sr-only" disabled={step === 'reading' || attemptsLeft <= 0} onChange={(e) => void onFile(e.target.files?.[0])} />
          </label>
          {attemptsLeft <= 0 ? <p className="mt-2 text-sm text-red-700">No uploads left on this link. Please contact CTS Tours.</p> : null}
        </div>
      ) : null}

      {fields && (step === 'check' || step === 'sending') ? (
        <div className="rounded-lg border border-gray-200 p-6">
          <h2 className="font-semibold">2. Check what we read</h2>
          {!readable ? (
            <p className="mt-2 rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
              We could not read the bottom lines clearly. Please check every field carefully, or try a sharper photo ({attemptsLeft} tries left).
            </p>
          ) : (
            <p className="mt-1 text-sm text-gray-600">Correct anything that does not match your passport exactly.</p>
          )}
          <div className="mt-4 grid gap-4 sm:grid-cols-[160px_1fr]">
            {/* eslint-disable-next-line @next/next/no-img-element -- local preview of the customer's own photo */}
            {preview ? <img src={preview} alt="Your passport photo" className="w-full rounded border" /> : <div />}
            <div className="grid gap-3 sm:grid-cols-2">
              {FIELDS.map((f) => (
                <label key={f.key} className="block text-sm">
                  <span className="font-medium">
                    {f.label}
                    {f.required ? <span className="text-red-600"> *</span> : null}
                  </span>
                  <input
                    type={f.type ?? 'text'}
                    className="mt-1 w-full rounded border border-gray-300 px-2 py-1.5"
                    value={fields[f.key]}
                    onChange={(e) => setFields({ ...fields, [f.key]: e.target.value })}
                  />
                </label>
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" disabled={missing || step === 'sending'} onClick={() => void submit()} className="rounded bg-primary px-5 py-3 font-medium text-white disabled:opacity-50">
              {step === 'sending' ? 'Sending…' : 'These details are correct — send to CTS'}
            </button>
            {attemptsLeft > 0 ? (
              <label className="cursor-pointer rounded border px-4 py-3 text-sm">
                Use a different photo
                <input type="file" accept="image/*" capture="environment" className="sr-only" onChange={(e) => void onFile(e.target.files?.[0])} />
              </label>
            ) : null}
          </div>
        </div>
      ) : null}

      {error ? (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
