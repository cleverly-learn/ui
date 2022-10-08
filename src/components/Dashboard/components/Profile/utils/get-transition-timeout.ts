const TIMEOUT = 150;

export function getTransitionTimeout(order: number): number {
  return (order + 1) * TIMEOUT;
}
