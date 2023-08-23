export const PAYMENT_STATUS = {
  verified: 'Payment Verified',
  pending: 'Payment Pending',
  unverified: 'Payment Unverified',
  cancelled: 'Payment Cancelled',
};

export type PaymentStatus = keyof typeof PAYMENT_STATUS;
