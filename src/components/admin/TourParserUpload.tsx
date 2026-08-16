'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ParsedTour } from '@/lib/tour-parser/schema';
import PromotionPlanPanel, { type PromotionResponse } from './PromotionPlanPanel';

type ParseResponse = {
  filename: string;
  sources: string[];
  elapsedMs: number;
  usage: { inputTokens: number; outputTokens: number };
  tour: ParsedTour;
};

type ChatTurn = { role: 'user' | 'assistant'; content: string };

const ACCEPT = '.pdf,.docx,.txt,.md';

/**
 * missingFields 返回的是 schema 字段名。翻译交给这张表,不交给模型 ——
 * 字段名要和 JSON 里的 key 对得上,让模型翻译会把这个对应关系弄丢。
 */
const FIELD_LABELS: Record<string, string> = {
  name: '产品名',
  title: '标题',
  shortDescription: '简介',
  duration: '时长',
  price: '价格',
  singleSupplement: '单房差',
  departures: '团期',
  tourCities: '路线城市',
  highlights: '亮点',
  sellingPoints: '卖点',
  itinerary: '行程',
  inclusions: '含项目',
  exclusions: '不含项目',
  suggestedTier: 'Tier',
  suggestedSlug: 'Slug',
  metaTitle: 'SEO 标题',
  metaDescription: 'SEO 描述',
};

function fieldLabel(field: string): string {
  const label = FIELD_LABELS[field];
  return label ? `${label}(${field})` : field;
}

/** 常用纠正,一键填进输入框 —— tier 判错是目前最常见的一类 */
const QUICK_FIXES = [
  '这是 discovery 团,不是 signature',
  '这是 signature 团,不是 discovery',
  '价格是 NZD $?,单房差 NZD $?',
  '团期是 ? 出发',
];

/** Opus 5 现价 —— 只做量级参考,不是账单 */
const USD_PER_INPUT_TOKEN = 5 / 1_000_000;
const USD_PER_OUTPUT_TOKEN = 25 / 1_000_000;

function estimateUsd(usage: ParseResponse['usage']): string {
  const usd = usage.inputTokens * USD_PER_INPUT_TOKEN + usage.outputTokens * USD_PER_OUTPUT_TOKEN;
  return `US$${usd.toFixed(3)}`;
}

function Field({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-warm-600">{label}</dt>
      <dd className={value ? 'text-accent' : 'text-warm-500 italic'}>{value || '未在文档中找到'}</dd>
    </div>
  );
}

export default function TourParserUpload() {
  const [drag, setDrag] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [spFile, setSpFile] = useState<File | null>(null);
  const [spText, setSpText] = useState('');
  const [tier, setTier] = useState('');
  const [status, setStatus] = useState<'idle' | 'parsing' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');
  const [result, setResult] = useState<ParseResponse | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [promo, setPromo] = useState<PromotionResponse | null>(null);
  const [promoStatus, setPromoStatus] = useState<'idle' | 'running' | 'error'>('idle');
  const [promoError, setPromoError] = useState('');
  const [initiative, setInitiative] = useState('');
  const [brief, setBrief] = useState({
    targetPax: '',
    budgetNzd: '',
    benchmarkCplNzd: '',
    benchmarkCloseRatePct: '',
  });

  const [chat, setChat] = useState<ChatTurn[]>([]);
  const [draft, setDraft] = useState('');
  const [refining, setRefining] = useState(false);
  const [chatError, setChatError] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat, refining]);

  // 解析要跑一两分钟,不给个计时器会让人以为卡死了
  useEffect(() => {
    if (status !== 'parsing') return;
    setSeconds(0);
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [status]);

  const onFile = useCallback((f: File | null) => {
    setFile(f);
    setStatus('idle');
    setError('');
    setResult(null);
    setChat([]);
    setChatError('');
    setPromo(null);
    setPromoError('');
  }, []);

  const submit = async () => {
    if (!file) {
      setError('先选一个文件。');
      setStatus('error');
      return;
    }
    setStatus('parsing');
    setError('');
    setResult(null);
    setChat([]);
    setChatError('');
    setPromo(null);
    setPromoError('');

    const form = new FormData();
    form.append('file', file);
    if (tier) form.append('tier', tier);
    appendSellingPoints(form);

    try {
      const res = await fetch('/api/admin/tour-parser', {
        method: 'POST',
        body: form,
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setError(data.error || '解析失败');
        return;
      }
      setResult(data as ParseResponse);
      setStatus('done');
    } catch {
      setStatus('error');
      setError('网络错误 —— 长文档也可能是请求超时,重试一次看看。');
    }
  };

  const generatePlan = async () => {
    if (!result || promoStatus === 'running') return;
    setPromoStatus('running');
    setPromoError('');
    try {
      const res = await fetch('/api/admin/tour-parser/promote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          tour: result.tour,
          initiative: initiative.trim() || undefined,
          brief,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPromoStatus('error');
        setPromoError(data.error || '方案生成失败');
        return;
      }
      setPromo(data as PromotionResponse);
      setPromoStatus('idle');
    } catch {
      setPromoStatus('error');
      setPromoError('网络错误,重试一次看看。');
    }
  };

  /** 卖点材料在初次解析和每轮修订里都要带上,两处共用 */
  const appendSellingPoints = (form: FormData) => {
    if (spFile) form.append('sellingPointsFile', spFile);
    if (spText.trim()) form.append('sellingPointsText', spText.trim());
  };

  const sendMessage = async () => {
    const text = draft.trim();
    if (!text || !file || !result || refining) return;

    const nextChat: ChatTurn[] = [...chat, { role: 'user', content: text }];
    setChat(nextChat);
    setDraft('');
    setChatError('');
    setRefining(true);

    const form = new FormData();
    form.append('file', file);
    appendSellingPoints(form);
    form.append('tour', JSON.stringify(result.tour));
    form.append('history', JSON.stringify(nextChat));

    try {
      const res = await fetch('/api/admin/tour-parser/refine', {
        method: 'POST',
        body: form,
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        setChatError(data.error || '修订失败');
        return;
      }
      setChat([...nextChat, { role: 'assistant', content: data.reply }]);
      setResult({ ...result, tour: data.tour });
    } catch {
      setChatError('网络错误,重试一次看看。');
    } finally {
      setRefining(false);
    }
  };

  const copyJson = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(JSON.stringify(result.tour, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tour = result?.tour;

  return (
    <div className="space-y-6">
      <div
        className={`rounded-xl border-2 border-dashed p-8 text-center transition ${
          drag ? 'border-primary bg-primary/5' : 'border-warm-300 bg-warm-50'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          const f = e.dataTransfer.files?.[0];
          if (f) onFile(f);
        }}
      >
        <p className="text-warm-800 mb-4">把行程文档拖进来,或选择文件(PDF / DOCX / TXT / MD,20 MB 以内)。</p>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          className="mx-auto block text-sm"
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
        />
        {file && (
          <p className="mt-4 text-sm text-warm-700">
            已选择:<span className="font-medium text-accent">{file.name}</span>{' '}
            ({(file.size / 1024).toFixed(0)} KB)
          </p>
        )}
      </div>

      <div className="rounded-xl border border-warm-200 bg-white p-5">
        <h3 className="font-serif text-lg font-semibold text-accent">客户自己的卖点(可选)</h3>
        <p className="mt-1 text-sm text-warm-600">
          客户为这个团写的卖点/推广文案。有的话,`sellingPoints` 会保留他们的角度和语气,而不是我们替他们编;
          和行程对不上的主张会单独列出来让你核实。
        </p>

        <div className="mt-4 space-y-3">
          <div>
            <label className="text-xs uppercase tracking-wide text-warm-600">上传文件</label>
            <input
              type="file"
              accept={ACCEPT}
              className="mt-1 block w-full text-sm"
              onChange={(e) => setSpFile(e.target.files?.[0] ?? null)}
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-warm-600">或直接粘贴</label>
            <textarea
              value={spText}
              onChange={(e) => setSpText(e.target.value)}
              rows={4}
              placeholder="把客户发来的卖点文字贴在这里 —— 微信消息、邮件正文都行。"
              className="mt-1 w-full resize-y rounded-md border border-warm-300 px-3 py-2 text-sm text-accent focus:border-primary focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div>
          <label className="text-xs uppercase tracking-wide text-warm-600">Tier</label>
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            className="mt-1 block rounded-md border border-warm-300 px-3 py-2 text-sm text-accent focus:border-primary focus:outline-none"
          >
            <option value="">自动判断(不可靠)</option>
            <option value="discovery">Discovery</option>
            <option value="signature">Signature</option>
            <option value="stopover">Stopover</option>
          </select>
        </div>
        <button
          type="button"
          onClick={submit}
          disabled={!file || status === 'parsing'}
          className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status === 'parsing' ? `解析中… ${seconds}s` : '解析行程'}
        </button>
        {status === 'parsing' && (
          <p className="text-sm text-warm-600">Claude 正在通读全文,一份 15 天行程通常要 1-3 分钟。</p>
        )}
        {status === 'error' && <p className="text-sm font-medium text-red-700">{error}</p>}
      </div>

      {result && tour && (
        <div className="space-y-6">
          <div className="rounded-lg border border-warm-200 bg-white p-4 text-sm text-warm-700">
            <ul className="space-y-0.5">
              {result.sources.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            <p className="mt-2 border-t border-warm-100 pt-2">
              耗时 {(result.elapsedMs / 1000).toFixed(1)}s · 输入{' '}
              {result.usage.inputTokens.toLocaleString()} / 输出{' '}
              {result.usage.outputTokens.toLocaleString()} tokens · 约 {estimateUsd(result.usage)}
            </p>
          </div>

          {tour.clientClaimsToVerify.length > 0 && (
            <div className="rounded-lg border border-red-300 bg-red-50 p-4">
              <h3 className="font-serif text-lg font-semibold text-accent">客户卖点与行程对不上</h3>
              <p className="mt-1 text-sm text-warm-700">
                这些主张行程文件没有支持。上线前要么找客户确认,要么改掉措辞 —— 不要直接发布。
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {tour.clientClaimsToVerify.map((c, i) => (
                  <li key={i} className="border-l-2 border-red-300 pl-3">
                    <p className="font-medium italic text-accent">「{c.claim}」</p>
                    <p className="mt-0.5 text-warm-700">{c.issue}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(tour.missingFields.length > 0 || tour.confidenceNotes.length > 0) && (
            <div className="rounded-lg border border-amber-300 bg-amber-50 p-4">
              <h3 className="font-serif text-lg font-semibold text-accent">需要人工确认</h3>
              {tour.missingFields.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs uppercase tracking-wide text-warm-600">文档里没有的字段</p>
                  <p className="text-accent">{tour.missingFields.map(fieldLabel).join('、')}</p>
                </div>
              )}
              {tour.confidenceNotes.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs uppercase tracking-wide text-warm-600">存疑之处</p>
                  <ul className="list-disc space-y-1 pl-5 text-accent">
                    {tour.confidenceNotes.map((note, i) => (
                      <li key={i}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="rounded-lg border border-warm-200 bg-white p-4">
            <h3 className="font-serif text-lg font-semibold text-accent">{tour.name}</h3>
            <p className="mt-1 text-warm-700">{tour.shortDescription}</p>

            <dl className="mt-4 grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
              <Field label="Tier" value={`${tour.suggestedTier} · ${tour.suggestedSlug}`} />
              <Field label="时长" value={tour.duration} />
              <Field label="价格" value={tour.price} />
              <Field label="单房差" value={tour.singleSupplement} />
            </dl>

            <p className="mt-4 rounded bg-warm-50 p-3 text-sm text-warm-700">
              <span className="font-medium text-accent">Tier 判断:</span> {tour.tierReasoning}
            </p>

            <div className="mt-4 grid gap-4 text-sm md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-warm-600">团期</p>
                {tour.departures.length === 0 ? (
                  <p className="italic text-warm-500">文档里没有团期</p>
                ) : (
                  <ul className="text-accent">
                    {tour.departures.map((d, i) => (
                      <li key={i}>
                        {d.date}
                        {d.price ? ` — ${d.price}` : ''}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-warm-600">路线</p>
                <p className="text-accent">{tour.tourCities.join(' → ') || '—'}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs uppercase tracking-wide text-warm-600">卖点</p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-accent">
                {tour.sellingPoints.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>

            {tour.blogAngles.length > 0 && (
              <div className="mt-4">
                <p className="text-xs uppercase tracking-wide text-warm-600">可写的博客选题</p>
                <ul className="mt-1 space-y-1 text-sm">
                  {tour.blogAngles.map((b, i) => (
                    <li key={i}>
                      <span className="font-medium text-accent">{b.title}</span>
                      <span className="text-warm-700"> —— {b.angle}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-4">
              <p className="text-xs uppercase tracking-wide text-warm-600">
                行程({tour.itinerary.length} 天)
              </p>
              <ol className="mt-2 space-y-2 text-sm">
                {tour.itinerary.map((day) => (
                  <li key={day.day} className="border-l-2 border-warm-200 pl-3">
                    <p className="font-medium text-accent">
                      Day {day.day} — {day.title}
                    </p>
                    <p className="text-warm-700">{day.description}</p>
                    <p className="text-xs text-warm-500">
                      {day.meals.length ? day.meals.join(' / ') : '不含餐'}
                      {day.accommodation ? ` · ${day.accommodation}` : ''}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="rounded-lg border border-warm-200 bg-white p-4">
            <h3 className="font-serif text-lg font-semibold text-accent">修订对话</h3>
            <p className="mt-1 text-sm text-warm-600">
              用大白话说哪里错了,上面的草稿会跟着改。原文每轮都会带上,所以事实类的改动它会回去核对。
            </p>

            {chat.length > 0 && (
              <div className="mt-4 max-h-80 space-y-3 overflow-y-auto pr-1">
                {chat.map((turn, i) => (
                  <div
                    key={i}
                    className={
                      turn.role === 'user'
                        ? 'ml-auto max-w-[85%] rounded-lg bg-primary px-3 py-2 text-sm text-white'
                        : 'mr-auto max-w-[85%] rounded-lg bg-warm-100 px-3 py-2 text-sm text-accent'
                    }
                  >
                    {turn.content}
                  </div>
                ))}
                {refining && (
                  <div className="mr-auto rounded-lg bg-warm-100 px-3 py-2 text-sm italic text-warm-600">
                    正在核对原文并修改草稿…
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            )}

            {chat.length === 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {QUICK_FIXES.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setDraft(q)}
                    className="rounded-full border border-warm-300 px-3 py-1 text-xs text-warm-700 transition hover:border-primary hover:text-primary"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div className="mt-4 flex gap-2">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    void sendMessage();
                  }
                }}
                rows={2}
                disabled={refining}
                placeholder="例如:这是 discovery 团,不是 signature"
                className="flex-1 resize-none rounded-md border border-warm-300 px-3 py-2 text-sm text-accent focus:border-primary focus:outline-none disabled:bg-warm-50"
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={!draft.trim() || refining}
                className="self-end rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {refining ? '修改中…' : '发送'}
              </button>
            </div>
            <p className="mt-2 text-xs text-warm-500">Enter 发送,Shift + Enter 换行。每轮约 30-60 秒。</p>
            {chatError && <p className="mt-2 text-sm font-medium text-red-700">{chatError}</p>}
          </div>

          <div className="rounded-lg border border-warm-200 bg-white p-4">
            <h3 className="font-serif text-lg font-semibold text-accent">推广方案</h3>
            <p className="mt-1 text-sm text-warm-600">
              草稿审核确认之后再生成 —— 方案里的广告文案会以上面的事实为准,草稿错了方案就跟着错。
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              {(
                [
                  ['targetPax', '目标成团人数', '如 24'],
                  ['budgetNzd', '广告预算 NZD', '如 12000'],
                  ['benchmarkCplNzd', '历史 CPL NZD', '如 45'],
                  ['benchmarkCloseRatePct', '历史成交率 %', '如 8'],
                ] as const
              ).map(([key, label, placeholder]) => (
                <div key={key}>
                  <label className="text-xs uppercase tracking-wide text-warm-600">{label}</label>
                  <input
                    type="number"
                    min="0"
                    value={brief[key]}
                    onChange={(e) => setBrief((b) => ({ ...b, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="mt-1 block w-full rounded-md border border-warm-300 px-3 py-2 text-sm text-accent focus:border-primary focus:outline-none"
                  />
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-warm-500">
              留空的项方案里会按估算处理并标注出来。CPL 和成交率以后接 GA4 / Ads
              历史数据自动带入,现在先手填。
            </p>

            <div className="mt-4 flex flex-wrap items-end gap-3">
              <div>
                <label className="text-xs uppercase tracking-wide text-warm-600">
                  活动主题 token(可选)
                </label>
                <input
                  type="text"
                  value={initiative}
                  onChange={(e) => setInitiative(e.target.value)}
                  placeholder={tour.suggestedTier}
                  className="mt-1 block w-56 rounded-md border border-warm-300 px-3 py-2 text-sm text-accent focus:border-primary focus:outline-none"
                />
                <p className="mt-1 text-xs text-warm-500">
                  进 utm_campaign 中段,如 dec_departure。留空用 tier。
                </p>
              </div>
              <button
                type="button"
                onClick={generatePlan}
                disabled={promoStatus === 'running'}
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {promoStatus === 'running' ? '生成中…' : promo ? '重新生成' : '生成推广方案'}
              </button>
              {promoStatus === 'running' && (
                <p className="text-sm text-warm-600">通常 1-2 分钟。</p>
              )}
              {promoStatus === 'error' && (
                <p className="text-sm font-medium text-red-700">{promoError}</p>
              )}
            </div>
          </div>

          {promo && <PromotionPlanPanel data={promo} />}

          <div className="rounded-lg border border-warm-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-semibold text-accent">原始 JSON</h3>
              <button
                type="button"
                onClick={copyJson}
                className="rounded-md bg-warm-100 px-3 py-1.5 text-sm font-medium text-accent transition hover:bg-warm-200"
              >
                {copied ? '已复制' : '复制'}
              </button>
            </div>
            <pre className="mt-3 max-h-96 overflow-auto rounded bg-warm-50 p-3 text-xs text-accent">
              {JSON.stringify(tour, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
