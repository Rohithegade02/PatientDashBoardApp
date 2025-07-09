import { storage } from '@/src/shared/services/storage'
import { AuthState, LoginCredentials, User } from '@/src/shared/types'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import * as Sentry from '@sentry/react-native'

interface AuthStore extends AuthState {
    // Actions
    login: (credentials: LoginCredentials) => Promise<void>
    logout: () => void
    checkAuthStatus: () => void
    updateUser: (user: User) => void
    clearError: () => void
    setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthStore>()(
    subscribeWithSelector((set, get) => ({
        // Initial state
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,

        // Actions
        login: async (credentials: LoginCredentials) => {
            set({ loading: true, error: null })

            try {
                console.log('credentials', credentials)
                // Store auth data
                storage.setAuthToken(credentials.token)
                storage.setUserData(credentials.user)

                // Set user context for Sentry
                Sentry.setUser({
                    email: credentials.user.email,
                })

                set({
                    isAuthenticated: true,
                    user: credentials.user.email,
                    loading: false,
                    error: null,
                })
            } catch (error) {
                console.error('Login error:', error)
                Sentry.captureException(error)

                set({
                    loading: false,
                    error:
                        error instanceof Error ? error.message : 'Login failed',
                    isAuthenticated: false,
                    user: null,
                })
                throw error
            }
        },

        logout: () => {
            storage.clearAuthData()
            Sentry.setUser(null) // Clear user context
            set({
                isAuthenticated: false,
                user: null,
                loading: false,
                error: null,
            })
        },

        checkAuthStatus: () => {
            const token = storage.getAuthToken()
            const userData = storage.getUserData()

            if (token && userData) {
                // Set user context for Sentry
                Sentry.setUser({
                    email: userData.email as string,
                })

                set({
                    isAuthenticated: true,
                    user: userData.email as string,
                    loading: false,
                    error: null,
                })
            } else {
                set({
                    isAuthenticated: false,
                    user: null,
                    loading: false,
                    error: null,
                })
            }
        },

        updateUser: (user: User) => {
            storage.setUserData(user)
            set({ user: user.email as string })
        },

        clearError: () => {
            set({ error: null })
        },

        setLoading: (loading: boolean) => {
            set({ loading })
        },
    }))
)

// Subscribe to auth state changes to sync with storage
useAuthStore.subscribe(
    (state) => state.isAuthenticated,
    (isAuthenticated, previousIsAuthenticated) => {
        if (isAuthenticated !== previousIsAuthenticated) {
            console.log('Auth state changed:', isAuthenticated)
        }
    }
)
