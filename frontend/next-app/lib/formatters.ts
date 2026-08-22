/**
 * InsightPilot AI — Financial and Metric Formatters
 */

export function formatCurrencyMillions(val: number | null | undefined): string {
  if (val === null || val === undefined || isNaN(val)) return "$0.00M";
  const millions = val / 1_000_000;
  return `$${millions.toFixed(2)}M`;
}

export function formatCurrencyThousands(val: number | null | undefined): string {
  if (val === null || val === undefined || isNaN(val)) return "$0K";
  const thousands = val / 1_000;
  return `$${thousands.toFixed(0)}K`;
}

export function formatPercent(val: number | null | undefined, includeSign = false): string {
  if (val === null || val === undefined || isNaN(val)) return "0.0%";
  const sign = includeSign && val > 0 ? "+" : "";
  return `${sign}${val.toFixed(1)}%`;
}

export function formatPoints(val: number | null | undefined): string {
  if (val === null || val === undefined || isNaN(val)) return "0.0 pts";
  const sign = val > 0 ? "+" : "";
  return `${sign}${val.toFixed(1)} pts`;
}

export function formatNumber(val: number | null | undefined): string {
  if (val === null || val === undefined || isNaN(val)) return "0";
  return new Intl.NumberFormat("en-US").format(Math.round(val));
}

export function formatConfidence(val: number | null | undefined): string {
  if (val === null || val === undefined || isNaN(val)) return "0%";
  const normalized = val <= 1 ? val * 100 : val;
  return `${Math.round(normalized)}%`;
}
