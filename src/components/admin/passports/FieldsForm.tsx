'use client';

import { fieldLabel, type PassportFields } from '@/lib/passport/record';

const ORDER: { key: keyof PassportFields; type?: 'date'; hint?: string; required?: boolean }[] = [
  { key: 'surname', required: true },
  { key: 'givenNames' },
  { key: 'chineseName' },
  { key: 'sex', hint: 'M / F / X' },
  { key: 'dateOfBirth', type: 'date', required: true },
  { key: 'nationality', hint: '3 位字母，如 NZL / CHN' },
  { key: 'issuingState', hint: '3 位字母' },
  { key: 'passportNumber', required: true },
  { key: 'issueDate', type: 'date', hint: '机器码里没有，要看照片' },
  { key: 'expiryDate', type: 'date', required: true },
  { key: 'placeOfIssue', hint: '机器码里没有，要看照片' },
];

export default function FieldsForm({ value, onChange, disabled }: { value: PassportFields; onChange: (v: PassportFields) => void; disabled?: boolean }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {ORDER.map(({ key, type, hint, required }) => (
        <label key={key} className="block text-sm">
          <span className="font-medium">
            {fieldLabel(key)}
            {required ? <span className="text-red-600"> *</span> : null}
          </span>
          {key === 'sex' ? (
            <select
              className="mt-1 w-full rounded border border-gray-300 px-2 py-1.5"
              value={value.sex}
              disabled={disabled}
              onChange={(e) => onChange({ ...value, sex: e.target.value as PassportFields['sex'] })}
            >
              <option value="">—</option>
              <option value="M">M</option>
              <option value="F">F</option>
              <option value="X">X</option>
            </select>
          ) : (
            <input
              type={type ?? 'text'}
              className={`mt-1 w-full rounded border border-gray-300 px-2 py-1.5 ${key === 'passportNumber' ? 'font-mono tracking-wider' : ''}`}
              value={value[key]}
              disabled={disabled}
              onChange={(e) => onChange({ ...value, [key]: e.target.value })}
            />
          )}
          {hint ? <span className="text-xs text-gray-500">{hint}</span> : null}
        </label>
      ))}
    </div>
  );
}
