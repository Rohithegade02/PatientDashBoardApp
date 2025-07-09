export interface User {
    id: string
    email: string
    fullName: string
    patientId: string
    currentPlan: string
    nextDeliveryDate: string
    remainingMedication: number
    status: 'active' | 'inactive'
    billingStatus: 'ok' | 'issues' | 'pending'
    createdAt: string
    updatedAt: string
}

export interface LoginCredentials {
    success: boolean
    data: {
        token: string
        user: {
            email: string
        }
    }
}

export interface Shipment {
    id: string
    patientId: string
    date: string
    status: 'delivered' | 'shipped' | 'pending' | 'cancelled'
    quantity: number
    medication: string
    trackingNumber?: string
    deliveryAddress: string
    createdAt: string
    updatedAt: string
}

export interface ApiResponse<T> {
    success: boolean
    data?: T
    error?: string
    message?: string
}

export interface AuthState {
    isAuthenticated: boolean
    user: string | null
    loading: boolean
    error: string | null
}

export interface DashboardState {
    user: User | null
    loading: boolean
    error: string | null
    lastUpdated: string | null
}

export interface ShipmentState {
    shipments: Shipment[]
    loading: boolean
    error: string | null
    hasMore: boolean
    page: number
}

export type RootStackParamList = {
    Auth: undefined
    Main: undefined
}

export type AuthStackParamList = {
    Login: undefined
    Register?: undefined
}

export type MainTabParamList = {
    Dashboard: undefined
    History: undefined
    Settings: undefined
}

export interface NavigationProps {
    navigation: any
    route: any
}

export interface MockApiConfig {
    baseURL: string
    timeout: number
    enableMocking: boolean
}
