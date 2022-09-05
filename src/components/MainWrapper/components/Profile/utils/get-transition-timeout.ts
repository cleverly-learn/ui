const TIMEOUT = 200;

export function getTransitionTimeout(order: number): number {
  return (order + 1) * TIMEOUT;
}
