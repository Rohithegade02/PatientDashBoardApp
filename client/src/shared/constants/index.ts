export const API_CONFIG = {
  BASE_URL: __DEV__ ? 'http://localhost:3000' : 'https://api.patientdashboard.com',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  ENABLE_MOCKING: true,
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

export const QUERY_KEYS = {
  USER_PROFILE: 'user_profile',
  SHIPMENTS: 'shipments',
  DASHBOARD: 'dashboard',
} as const;



// export const PATIENT_STATUS = {
//   ACTIVE: 'active',
//   INACTIVE: 'inactive',
// } as const;

// export const BILLING_STATUS = {
//   OK: 'ok',
//   ISSUES: 'issues',
//   PENDING: 'pending',
// } as const;

// export const SHIPMENT_STATUS = {
//   DELIVERED: 'delivered',
//   SHIPPED: 'shipped',
//   PENDING: 'pending',
//   CANCELLED: 'cancelled',
// } as const;

// export const MEDICATION_PLANS = {
//   BASIC: 'Basic Plan',
//   STANDARD: 'Standard Plan',
//   PREMIUM: 'Premium Plan',
// } as const;

// export const ANIMATION_DURATION = {
//   FAST: 200,
//   MEDIUM: 300,
//   SLOW: 500,
// } as const;

// export const PAGINATION = {
//   PAGE_SIZE: 20,
//   INITIAL_PAGE: 1,
// } as const;

export * from '../routes';
export * from './color';
export * from './fonts';
export * from './images';

