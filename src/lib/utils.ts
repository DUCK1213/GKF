// Utility functions for GKF Platform

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatCurrencyKsh(amount: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0,
  }).format(amount).replace('KES', 'Ksh');
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}
