import { readJson, writeJson } from './storage';
import type { JobRecord } from '../engine/types';
const KEY = 'tbomb-mobile.history.v1';
export async function getHistory(): Promise<JobRecord[]> { return readJson<JobRecord[]>(KEY, []); }
export async function saveHistory(record: JobRecord): Promise<void> {
  const current = await getHistory();
  await writeJson(KEY, [record, ...current.filter(item => item.id !== record.id)].slice(0, 100));
}
export async function clearHistory(): Promise<void> { await writeJson(KEY, []); }
