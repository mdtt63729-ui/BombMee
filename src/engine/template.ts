/** Formats safe local simulator messages; no phone numbers or message delivery. */
export function formatDemoMessage(round: number, total: number, providerName: string): string {
  if (!Number.isInteger(round) || !Number.isInteger(total) || round < 1 || total < round) {
    throw new Error('Round values are invalid.');
  }
  const cleanName = providerName.trim();
  if (!cleanName) throw new Error('A demo provider name is required.');
  return `[SIMULATION] ${cleanName}: event ${round}/${total}`;
}
