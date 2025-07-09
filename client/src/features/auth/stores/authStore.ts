import { storage } from '@/src/shared/services/storage'
import { AuthState, LoginCredentials } from '@/src/shared/types'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface AuthStore extends AuthState {
    // Actions
    login: (credentials: LoginCredentials) => Promise<void>
    logout: () => void
    checkAuthStatus: () => void
    updateUser: (user: string) => void
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
                // Store auth data
                storage.setAuthToken(credentials.data.token)
                storage.setUserData(credentials.data.user.email)

                set({
                    isAuthenticated: true,
                    user: credentials.data.user.email,
                    loading: false,
                    error: null,
                })
            } catch (error) {
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
            set({
                isAuthenticated: false,
                user: null,
                loading: false,
                error: null,
            })
        },

        checkAuthStatus: () => {
            const token = storage.getAuthToken()
            const userData = storage.get<string>('user')

            if (token && userData) {
                set({
                    isAuthenticated: true,
                    user: userData,
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

        updateUser: (user: string) => {
            storage.setUserData(user)
            set({ user })
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
