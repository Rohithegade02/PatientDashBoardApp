import { API_CONFIG } from '@/src/shared/constants'

export const AUTH_API = {
    LOGIN: `${API_CONFIG.BASE_URL}/api/auth/login`,
    REGISTER: `${API_CONFIG.BASE_URL}/api/auth/register`,
}

export const DASHBOARD_API = {
    GET_DASHBOARD: `${API_CONFIG.BASE_URL}/api/patient/dashboard`,
}

export const SHIPMENT_API = {
    GET_SHIPMENTS: `${API_CONFIG.BASE_URL}/api/patient/shipments`,
}
