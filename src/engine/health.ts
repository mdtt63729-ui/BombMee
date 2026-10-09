export interface HealthSnapshot {
  mode: 'offline';
  networkUsed: false;
  status: 'ready';
  checkedAt: number;
}

export function getLocalHealth(now = Date.now()): HealthSnapshot {
  return { mode: 'offline', networkUsed: false, status: 'ready', checkedAt: now };
}
