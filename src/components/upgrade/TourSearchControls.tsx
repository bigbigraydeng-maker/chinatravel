'use client';
import { useState } from 'react';
export type SearchRow = {id:string; cities:string[]; month:string; price:number|null};
export default function TourSearchControls({rows}:{rows:SearchRow[]}) {
 const [city,setCity]=useState('');const [month,setMonth]=useState('');const [budget,setBudget]=useState('');
 const count=(c=city,m=month,b=budget)=>new Set(rows.filter(r=>(!c||r.cities.includes(c))&&(!m||r.month===m)&&(!b||(r.price!==null&&r.price<=Number(b)))).map(r=>r.id)).size;
 const cities=Array.from(new Set(rows.flatMap(r=>r.cities))).sort();const months=Array.from(new Set(rows.map(r=>r.month).filter(Boolean))).sort();
 const matches=count();const field='mt-2 block w-full rounded-lg border border-warm-200 bg-surface p-3';
 return <><div className="grid gap-4 md:grid-cols-4">
  <label className="text-sm font-medium">City<select name="city" value={city} onChange={e=>setCity(e.target.value)} className={field}><option value="">Anywhere</option>{cities.map(c=><option value={c} key={c}>{c} · {count(c)} tours</option>)}</select></label>
  <label className="text-sm font-medium">Travel month<select name="month" value={month} onChange={e=>setMonth(e.target.value)} className={field}><option value="">Any time</option>{months.map(m=><option key={m} value={m}>{new Date(m+'-01T00:00:00Z').toLocaleDateString('en-NZ',{month:'long',year:'numeric',timeZone:'UTC'})} · {count(city,m)} tours</option>)}</select></label>
  <label className="text-sm font-medium">Budget per person · NZD<select name="budget" value={budget} onChange={e=>setBudget(e.target.value)} className={field}><option value="">Any budget</option>{['3000','5000','8000'].map(b=><option key={b} value={b}>Up to ${Number(b).toLocaleString('en-NZ')} · {count(city,month,b)} tours</option>)}</select></label>
  <button className="self-end rounded-lg bg-primary px-5 py-3 font-semibold text-white hover:bg-primary/90">{matches ? `See ${matches} tours →` : 'See close alternatives →'}</button>
 </div><p role="status" className="mt-4 text-sm text-primary">{matches ? `${matches} tour${matches===1?'':'s'} match your preferences. Every filter is optional.` : 'No exact match. We’ll show nearby dates or budgets, and explain the differences.'}</p></>;
}
