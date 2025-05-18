import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CURRENCIES } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency with appropriate symbol and decimals
export function formatCurrency(amount: number, currencyCode: keyof typeof CURRENCIES): string {
  const { symbol } = CURRENCIES[currencyCode];
  return `${symbol}${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

// Generate a random transaction ID
export function generateTransactionId(): string {
  const randomId = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `TR-${randomId}`;
}

// Format current date and time for transaction receipt
export function formatTransactionDate(): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  };
  return now.toLocaleDateString('en-US', options);
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
