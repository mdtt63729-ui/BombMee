/** Clamp user-configurable simulation concurrency to a small safe local limit. */
export function clampConcurrency(value: number): number {
  if (!Number.isFinite(value)) return 1;
  return Math.max(1, Math.min(3, Math.floor(value)));
}
