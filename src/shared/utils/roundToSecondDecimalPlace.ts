export function roundToFirstDecimalPlace(average: number): number {
  return Math.round(average * 10) / 10
}

export function roundToSecondDecimalPlace(average: number): number {
  return Math.round(average * 100) / 100
}
