import { API_CONFIG } from '@/src/shared/constants'
import { QueryClient } from '@tanstack/react-query'
import * as Sentry from '@sentry/react-native'

// Create a client
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Time in milliseconds (5 minutes)
            staleTime: 5 * 60 * 1000,
            // Time in milliseconds (10 minutes)
            gcTime: 10 * 60 * 1000,
            // Retry failed requests
            retry: API_CONFIG.RETRY_ATTEMPTS,
            // Retry delay
            retryDelay: (attemptIndex) =>
                Math.min(1000 * 2 ** attemptIndex, 30000),
            // Refetch on window focus
            refetchOnWindowFocus: false,
            // Refetch on reconnect
            refetchOnReconnect: true,
            // Refetch on mount
            refetchOnMount: true,
            // Log errors to Sentry
            onError: (error) => {
                console.error('Query error:', error)
                Sentry.captureException(error)
            },
            throwOnError: true,
        },
        mutations: {
            // Retry failed mutations
            retry: API_CONFIG.RETRY_ATTEMPTS,
            // Retry delay for mutations
            retryDelay: (attemptIndex) =>
                Math.min(1000 * 2 ** attemptIndex, 30000),
            // Log errors to Sentry
            onError: (error) => {
                console.error('Mutation error:', error)
                Sentry.captureException(error)
            },
        },
    },
})

// Query key factory
export const queryKeys = {
    all: ['queries'] as const,
    auth: () => [...queryKeys.all, 'auth'] as const,
    authUser: () => [...queryKeys.auth(), 'user'] as const,
    dashboard: () => [...queryKeys.all, 'dashboard'] as const,
    dashboardUser: () => [...queryKeys.dashboard(), 'user'] as const,
    shipments: () => [...queryKeys.all, 'shipments'] as const,
    shipmentsList: (filters?: Record<string, any>) =>
        [...queryKeys.shipments(), 'list', filters] as const,
    shipmentDetail: (id: string) =>
        [...queryKeys.shipments(), 'detail', id] as const,
}
