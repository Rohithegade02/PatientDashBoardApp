export interface User {
    __v: number
    _id: string
    createdAt: string
    dateOfBirth: string
    email: string
    fullName: string
    phone: string
    role: 'patient' | 'admin'
}

export interface LoginCredentials {
    success: boolean
    token: string
    user: User
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
