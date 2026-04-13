import { readFile } from 'fs/promises';
import path from 'path';
import { parseMeetingBoardMd, type MeetingBoardParsed } from './parseMeetingBoardMd';

const REL = path.join('docs', 'client-meeting-board.md');

export async function loadMeetingBoard(): Promise<MeetingBoardParsed> {
  const full = path.join(process.cwd(), REL);
  const raw = await readFile(full, 'utf8');
  return parseMeetingBoardMd(raw);
}
