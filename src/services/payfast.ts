import type { PlanTier } from '../types';
import { PLAN_CONFIGS } from './entitlementEngine';

export interface PayFastConfig {
  merchantId: string;
  merchantKey: string;
  passphrase?: string;
  environment: 'sandbox' | 'production';
}

export function getPayFastConfig(): PayFastConfig {
  return {
    merchantId: (typeof process !== 'undefined' && process.env?.PAYFAST_MERCHANT_ID) || '10000100', // Default official PayFast sandbox testing merchant
    merchantKey: (typeof process !== 'undefined' && process.env?.PAYFAST_MERCHANT_KEY) || '46f0cd694581a',
    passphrase: (typeof process !== 'undefined' && process.env?.PAYFAST_PASSPHRASE) || '',
    environment: ((typeof process !== 'undefined' && process.env?.PAYFAST_ENVIRONMENT) as any) || 'sandbox'
  };
}

export interface PayFastPaymentRequest {
  plan: PlanTier;
  userEmail: string;
  userName: string;
  userId: string;
  returnUrl: string;
  cancelUrl: string;
}

export function buildPayFastCheckoutUrl(req: PayFastPaymentRequest): {
  actionUrl: string;
  fields: Record<string, string>;
} {
  const config = getPayFastConfig();
  const planInfo = PLAN_CONFIGS[req.plan];
  const amount = planInfo.priceMonthlyZAR.toFixed(2);
  const actionUrl = config.environment === 'production' 
    ? 'https://www.payfast.co.za/eng/process'
    : 'https://sandbox.payfast.co.za/eng/process';

  const fields: Record<string, string> = {
    merchant_id: config.merchantId,
    merchant_key: config.merchantKey,
    return_url: req.returnUrl,
    cancel_url: req.cancelUrl,
    notify_url: `${req.returnUrl.replace(/(\/.*)?$/, '')}/api/payfast/webhook`,
    name_first: req.userName.split(' ')[0] || 'Parent',
    name_last: req.userName.split(' ').slice(1).join(' ') || 'Subscriber',
    email_address: req.userEmail,
    m_payment_id: `IMBEWU-${req.plan}-${Date.now()}`,
    amount: amount,
    item_name: `Imbewu ${req.plan} Membership`,
    item_description: `Monthly learning access for ${req.plan} plan on Imbewu early-learning platform`,
    subscription_type: '1',
    billing_date: new Date().toISOString().split('T')[0],
    recurring_amount: amount,
    frequency: '3', // Monthly
    cycles: '0' // Indefinite
  };

  return { actionUrl, fields };
}
