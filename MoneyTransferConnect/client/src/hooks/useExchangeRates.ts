import { useState, useEffect } from 'react';
import { EXCHANGE_RATES, TRANSFER_FEES, DELIVERY_TIMES } from '@/lib/constants';

interface ExchangeRateResult {
  exchangeRate: number;
  fee: number;
  deliveryTime: string;
  convertedAmount: number;
  loading: boolean;
  error: string | null;
}

export function useExchangeRates(
  fromCountry: string, 
  toCountry: string, 
  amount: number
): ExchangeRateResult {
  const [result, setResult] = useState<ExchangeRateResult>({
    exchangeRate: 0,
    fee: 0,
    deliveryTime: '',
    convertedAmount: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    // Reset loading state
    setResult(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Create the rate key for the lookup
      const rateKey = `${fromCountry}-${toCountry}`;
      
      // Get the exchange rate, fee, and delivery time
      const rate = EXCHANGE_RATES[rateKey as keyof typeof EXCHANGE_RATES];
      const fee = TRANSFER_FEES[fromCountry as keyof typeof TRANSFER_FEES] || 0;
      const deliveryTime = DELIVERY_TIMES[rateKey as keyof typeof DELIVERY_TIMES] || '1-3 Business Days';
      
      if (!rate) {
        throw new Error(`No exchange rate found for ${rateKey}`);
      }

      // Calculate the converted amount
      const convertedAmount = amount * rate;
      
      // Update the state with the results
      setResult({
        exchangeRate: rate,
        fee,
        deliveryTime,
        convertedAmount,
        loading: false,
        error: null
      });
    } catch (error) {
      setResult({
        exchangeRate: 0,
        fee: 0,
        deliveryTime: '',
        convertedAmount: 0,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      });
    }
  }, [fromCountry, toCountry, amount]);

  return result;
}
