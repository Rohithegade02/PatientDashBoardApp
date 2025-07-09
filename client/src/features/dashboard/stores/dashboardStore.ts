import { useAuthStore } from '@/features/auth/stores/authStore'
import { DashboardState } from '@/src/shared/types'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { dashboardService } from '../services/dashboard'

interface DashboardStore extends DashboardState {
    // Actions
    fetchDashboard: () => Promise<void>
    refreshDashboard: () => Promise<void>
    clearError: () => void
    setLoading: (loading: boolean) => void
}

export const useDashboardStore = create<DashboardStore>()(
    subscribeWithSelector((set, get) => ({
        // Initial state
        user: null,
        loading: false,
        error: null,
        lastUpdated: null,

        // Actions
        fetchDashboard: async () => {
            const state = get()
            if (state.loading) return

            set({ loading: true, error: null })

            try {
                const authState = useAuthStore.getState()
                if (!authState.isAuthenticated) {
                    throw new Error('User not authenticated')
                }

                const response = await dashboardService.getDashboard()

                if (!response.success || !response.data) {
                    throw new Error(
                        response.message || 'Failed to fetch dashboard data'
                    )
                }

                const dashboardData = response.data
                const transformedUser = {
                    _id: dashboardData.userId,
                    email: authState.user || '',
                    fullName: '',
                    role: 'patient' as const,
                    phone: '',
                    dateOfBirth: '',
                    createdAt: dashboardData.createdAt,
                    __v: 0,
                    patientId: dashboardData.patientId,
                    currentPlan: dashboardData.currentPlan,
                    nextDeliveryDate: dashboardData.nextDeliveryDate,
                    remainingMedication: dashboardData.remainingMedication,
                    updatedAt: dashboardData.updatedAt,
                }

                set({
                    user: transformedUser,
                    loading: false,
                    error: null,
                    lastUpdated: new Date().toISOString(),
                })
            } catch (error) {
                console.error('Dashboard fetch error:', error)
                set({
                    loading: false,
                    error:
                        error instanceof Error
                            ? error.message
                            : 'Failed to fetch dashboard data',
                })
                throw error
            }
        },

        refreshDashboard: async () => {
            await get().fetchDashboard()
        },

        clearError: () => {
            set({ error: null })
        },

        setLoading: (loading: boolean) => {
            set({ loading })
        },
    }))
)

// Subscribe to auth state changes
useAuthStore.subscribe(
    (state) => state.isAuthenticated,
    (isAuthenticated) => {
        if (isAuthenticated) {
            useDashboardStore
                .getState()
                .fetchDashboard()
                .catch(() => {
                    // Handle error silently or log
                })
        } else {
            useDashboardStore.setState({
                user: null,
                loading: false,
                error: null,
                lastUpdated: null,
            })
        }
    }
)
