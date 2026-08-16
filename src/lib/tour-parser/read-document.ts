/**
 * 把上传的文件转成 Claude 能读的内容块。
 *
 * PDF 走 Claude 原生 document 块(保留版面和表格结构,解析质量最好);
 * DOCX 用 mammoth 抽纯文本 —— Claude API 不直接吃 .docx。
 */

import type Anthropic from '@anthropic-ai/sdk';
import mammoth from 'mammoth';

/** Claude 单次请求上限 32MB,留出 base64 膨胀(约 4/3)和 prompt 的余量 */
export const MAX_UPLOAD_BYTES = 20 * 1024 * 1024;

export const ACCEPTED_EXTENSIONS = ['.pdf', '.docx', '.txt', '.md'] as const;

export class UnsupportedDocumentError extends Error {}

function extensionOf(filename: string): string {
  const dot = filename.lastIndexOf('.');
  return dot === -1 ? '' : filename.slice(dot).toLowerCase();
}

export interface ReadDocumentResult {
  blocks: Anthropic.ContentBlockParam[];
  /** 给 UI 显示的解析方式说明 */
  method: string;
  /** 纯文本路径下抽到的字符数;PDF 走原生块时为 null */
  textLength: number | null;
}

/**
 * @throws UnsupportedDocumentError 文件类型不支持,或 .docx 内容抽不出文字
 */
export async function readDocument(file: File): Promise<ReadDocumentResult> {
  const ext = extensionOf(file.name);
  const buffer = Buffer.from(await file.arrayBuffer());

  if (ext === '.pdf') {
    return {
      blocks: [
        {
          type: 'document',
          source: { type: 'base64', media_type: 'application/pdf', data: buffer.toString('base64') },
        },
      ],
      method: 'PDF — 交给 Claude 原生解析,保留版面与表格',
      textLength: null,
    };
  }

  if (ext === '.docx') {
    const { value } = await mammoth.extractRawText({ buffer });
    const text = value.trim();
    if (!text) {
      throw new UnsupportedDocumentError(
        '这个 .docx 抽不出任何文字。如果行程是以图片形式贴在文档里的,请改用 PDF。'
      );
    }
    return {
      blocks: [{ type: 'text', text }],
      method: 'DOCX — mammoth 抽取纯文本(表格版面会丢失)',
      textLength: text.length,
    };
  }

  if (ext === '.txt' || ext === '.md') {
    const text = buffer.toString('utf8').trim();
    if (!text) {
      throw new UnsupportedDocumentError('文件是空的。');
    }
    return { blocks: [{ type: 'text', text }], method: '纯文本', textLength: text.length };
  }

  if (ext === '.doc') {
    throw new UnsupportedDocumentError(
      '旧版 .doc 格式不支持。请在 Word 里另存为 .docx 或导出 PDF。'
    );
  }

  throw new UnsupportedDocumentError(
    `不支持的文件类型 ${ext || '(无扩展名)'}。支持:${ACCEPTED_EXTENSIONS.join('、')}`
  );
}

/** 客户提供的原始素材 —— 行程是必需的,卖点材料可选 */
export interface SourceBundle {
  itineraryFile: File;
  sellingPointsFile?: File | null;
  sellingPointsText?: string | null;
}

export interface SourceBundleResult {
  blocks: Anthropic.ContentBlockParam[];
  /** 给 UI 显示:每份素材是怎么读进来的 */
  sources: string[];
}

/**
 * 把行程文件和(可选的)客户卖点材料拼成一组带标注的内容块。
 *
 * 标注是必要的 —— 两类素材的权威性不同:行程文件是事实来源,
 * 客户卖点是营销主张。不打标签模型就会把「全程豪华五星」当成酒店事实。
 *
 * @throws UnsupportedDocumentError
 */
export async function readSourceBundle(bundle: SourceBundle): Promise<SourceBundleResult> {
  const blocks: Anthropic.ContentBlockParam[] = [];
  const sources: string[] = [];

  const itinerary = await readDocument(bundle.itineraryFile);
  blocks.push({
    type: 'text',
    text: '=== SOURCE A — ITINERARY DOCUMENT (factual authority: dates, prices, days, hotels, inclusions) ===',
  });
  blocks.push(...itinerary.blocks);
  sources.push(`行程:${bundle.itineraryFile.name} —— ${itinerary.method}`);

  const hasFile = bundle.sellingPointsFile && bundle.sellingPointsFile.size > 0;
  const notes = bundle.sellingPointsText?.trim();

  if (hasFile || notes) {
    blocks.push({
      type: 'text',
      text: "=== SOURCE B — CLIENT'S OWN SELLING POINTS (marketing positioning and voice; NOT a source of itinerary facts) ===",
    });

    if (hasFile) {
      const sellingPoints = await readDocument(bundle.sellingPointsFile as File);
      blocks.push(...sellingPoints.blocks);
      sources.push(`卖点:${(bundle.sellingPointsFile as File).name} —— ${sellingPoints.method}`);
    }
    if (notes) {
      blocks.push({ type: 'text', text: notes });
      sources.push(`卖点:直接粘贴的文字(${notes.length} 字符)`);
    }
  }

  return { blocks, sources };
}
