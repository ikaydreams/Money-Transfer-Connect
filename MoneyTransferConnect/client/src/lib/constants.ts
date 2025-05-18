// Currency codes and symbols
export const CURRENCIES = {
  GH: {
    code: "GHS",
    symbol: "₵",
    name: "Ghana Cedi"
  },
  US: {
    code: "USD",
    symbol: "$",
    name: "US Dollar"
  },
  EU: {
    code: "EUR",
    symbol: "€",
    name: "Euro"
  }
};

// Mock exchange rates (realistic as of June 2023)
export const EXCHANGE_RATES = {
  'GH-US': 0.08325, // 1 GHS = 0.08325 USD
  'GH-EU': 0.07628, // 1 GHS = 0.07628 EUR
  'US-GH': 12.01205, // 1 USD = 12.01205 GHS
  'US-EU': 0.91686, // 1 USD = 0.91686 EUR
  'EU-GH': 13.10967, // 1 EUR = 13.10967 GHS
  'EU-US': 1.09068, // 1 EUR = 1.09068 USD
};

// Transfer fee structure (in source currency)
export const TRANSFER_FEES = {
  GH: 15.00, // 15 GHS fee
  US: 5.00,  // 5 USD fee
  EU: 4.50,  // 4.50 EUR fee
};

// Estimated delivery times
export const DELIVERY_TIMES = {
  'GH-US': '1-2 Business Days',
  'GH-EU': '1-3 Business Days',
  'US-GH': '1-2 Business Days',
  'US-EU': 'Same Day',
  'EU-GH': '1-3 Business Days',
  'EU-US': 'Same Day',
};

// Payment methods
export const PAYMENT_METHODS = [
  { id: 'bank-transfer', name: 'Bank Transfer' },
  { id: 'debit-card', name: 'Debit Card' },
  { id: 'mobile-money', name: 'Mobile Money' },
];

// Transfer steps
export const TRANSFER_STEPS = [
  { id: 1, name: 'Details' },
  { id: 2, name: 'Review' },
  { id: 3, name: 'Payment' },
  { id: 4, name: 'Confirmation' },
];

// Features
export const FEATURES = [
  {
    title: 'Secure Transfers',
    description: 'Bank-level encryption and security protocols to keep your money safe.',
    icon: 'ri-secure-payment-line'
  },
  {
    title: 'Competitive Rates',
    description: 'Get the best exchange rates with low, transparent fees on every transfer.',
    icon: 'ri-exchange-dollar-line'
  },
  {
    title: 'Fast Delivery',
    description: 'Money arrives within minutes to 48 hours, depending on the destination.',
    icon: 'ri-time-line'
  }
];

// Transfer corridors
export const CORRIDORS = [
  {
    from: {
      code: 'GH',
      name: 'Ghana'
    },
    to: {
      code: 'US',
      name: 'United States'
    },
    description: 'Send money from Ghana to the United States securely and quickly.'
  },
  {
    from: {
      code: 'US',
      name: 'United States'
    },
    to: {
      code: 'GH',
      name: 'Ghana'
    },
    description: 'Send remittances from the US to Ghana with competitive rates.'
  },
  {
    from: {
      code: 'GH',
      name: 'Ghana'
    },
    to: {
      code: 'EU',
      name: 'Europe'
    },
    description: 'Transfer funds from Ghana to European countries easily.'
  }
];

// Testimonials
export const TESTIMONIALS = [
  {
    text: "I've been using GlobalRemit to send money to my family in Ghana for over a year now. The rates are great and the transfers are always quick!",
    author: "David Chen",
    location: "New York, USA",
    rating: 5
  },
  {
    text: "The customer service is excellent! When I had an issue with my transfer, they resolved it within minutes. Highly recommend their service.",
    author: "Sarah Johnson",
    location: "London, UK",
    rating: 5
  },
  {
    text: "The app is very easy to use and the fees are lower than other services I've tried. My family in Ghana receives the money within hours.",
    author: "Kwame Asante",
    location: "Accra, Ghana",
    rating: 4.5
  }
];
