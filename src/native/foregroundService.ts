/** Background service is intentionally not implemented: this offline demo runs only while open. */
export const foregroundService = {
  isSupported: false,
  async start(): Promise<void> { throw new Error('Background execution is disabled in the offline simulator.'); },
  async stop(): Promise<void> { return; },
};
