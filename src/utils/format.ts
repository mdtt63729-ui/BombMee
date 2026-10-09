export function formatTime(timestamp: number): string { return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }); }
export function formatDuration(start: number, end = Date.now()): string { return `${Math.max(0, (end - start) / 1000).toFixed(1)}s`; }
